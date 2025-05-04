const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(process.cwd(), 'color-database.db'));

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS fundamental_colors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    color_name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS color_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS color_parts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    color_code_id INTEGER NOT NULL,
    part_number INTEGER NOT NULL,
    total_kg REAL,
    FOREIGN KEY (color_code_id) REFERENCES color_codes(id) ON DELETE CASCADE
  );
  
  CREATE TABLE IF NOT EXISTS color_part_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    color_part_id INTEGER NOT NULL,
    fundamental_color_id INTEGER NOT NULL,
    quantity REAL NOT NULL,
    FOREIGN KEY (color_part_id) REFERENCES color_parts(id) ON DELETE CASCADE,
    FOREIGN KEY (fundamental_color_id) REFERENCES fundamental_colors(id)
  );
`);

module.exports = db;