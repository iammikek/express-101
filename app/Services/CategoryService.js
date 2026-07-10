const { getDb } = require('../Support/db');
const { CategoryNotFoundException } = require('../Exceptions/CategoryNotFoundException');
const { CategoryNameExistsException } = require('../Exceptions/CategoryNameExistsException');
const { CategoryInUseException } = require('../Exceptions/CategoryInUseException');

class CategoryService {
  static listCategories(skip, limit) {
    const raw = getDb();
    const total = raw.prepare('SELECT COUNT(*) as count FROM categories').get().count;
    const rows = raw.prepare('SELECT * FROM categories ORDER BY id LIMIT ? OFFSET ?').all(limit, skip);
    return [rows, total];
  }

  static getById(categoryId) {
    const category = getDb().prepare('SELECT * FROM categories WHERE id = ?').get(categoryId);
    if (!category) throw new CategoryNotFoundException(categoryId);
    return category;
  }

  static create(name, description) {
    this.ensureUniqueName(name);
    const result = getDb().prepare('INSERT INTO categories (name, description) VALUES (?, ?)').run(name, description);
    return this.getById(Number(result.lastInsertRowid));
  }

  static update(categoryId, data) {
    const category = this.getById(categoryId);

    if (Object.prototype.hasOwnProperty.call(data, 'name') && data.name != null) {
      this.ensureUniqueName(String(data.name), categoryId);
      category.name = String(data.name);
    }

    if (Object.prototype.hasOwnProperty.call(data, 'description')) {
      category.description = data.description;
    }

    getDb().prepare('UPDATE categories SET name = ?, description = ? WHERE id = ?')
      .run(category.name, category.description, categoryId);

    return this.getById(categoryId);
  }

  static delete(categoryId) {
    const category = this.getById(categoryId);
    const inUse = getDb().prepare('SELECT 1 FROM items WHERE category_id = ? LIMIT 1').get(category.id);
    if (inUse) throw new CategoryInUseException(categoryId);
    getDb().prepare('DELETE FROM categories WHERE id = ?').run(categoryId);
  }

  static ensureUniqueName(name, excludeId = null) {
    let exists;
    if (excludeId != null) {
      exists = getDb().prepare('SELECT 1 FROM categories WHERE name = ? AND id != ? LIMIT 1').get(name, excludeId);
    } else {
      exists = getDb().prepare('SELECT 1 FROM categories WHERE name = ? LIMIT 1').get(name);
    }
    if (exists) throw new CategoryNameExistsException(name);
  }
}

module.exports = { CategoryService };
