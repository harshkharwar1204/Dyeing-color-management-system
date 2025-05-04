const db = require('../config/db');

class FundamentalColor {
  static getAll() {
    return db.prepare('SELECT * FROM fundamental_colors ORDER BY color_name').all();
  }

  static search(query) {
    return db.prepare('SELECT * FROM fundamental_colors WHERE color_name LIKE ? ORDER BY color_name')
      .all(`%${query}%`);
  }

  static create(colorName) {
    const result = db.prepare('INSERT INTO fundamental_colors (color_name) VALUES (?)').run(colorName);
    return { id: result.lastInsertRowid, color_name: colorName };
  }
}

module.exports = FundamentalColor;