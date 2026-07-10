const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

let db = null;

function getDbPath() {
  return process.env.DB_DATABASE || path.join(process.cwd(), 'database', 'database.sqlite');
}

function getDb() {
  if (!db) {
    const dbPath = getDbPath();
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    db = new Database(dbPath);
    db.pragma('foreign_keys = ON');
  }
  return db;
}

function migrate() {
  const schema = fs.readFileSync(path.join(process.cwd(), 'database', 'schema.sql'), 'utf8');
  getDb().exec(schema);
}

function resetTables() {
  getDb().exec('DELETE FROM items; DELETE FROM categories; DELETE FROM users;');
}

function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}

module.exports = { getDb, migrate, resetTables, closeDb };
