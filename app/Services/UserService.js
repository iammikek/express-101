const bcrypt = require('bcryptjs');
const { getDb } = require('../Support/db');
const { UserEmailExistsException } = require('../Exceptions/UserEmailExistsException');

class UserService {
  static getByEmail(email) {
    return getDb().prepare('SELECT * FROM users WHERE email = ?').get(email) || null;
  }

  static getById(id) {
    return getDb().prepare('SELECT * FROM users WHERE id = ?').get(id) || null;
  }

  static async create(email, password) {
    if (this.getByEmail(email)) {
      throw new UserEmailExistsException(email);
    }

    const hash = await bcrypt.hash(password, 10);
    const result = getDb().prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, hash);

    return {
      id: Number(result.lastInsertRowid),
      email,
      password: hash,
    };
  }

  static async authenticate(email, password) {
    const user = this.getByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.password);
    return ok ? user : null;
  }
}

module.exports = { UserService };
