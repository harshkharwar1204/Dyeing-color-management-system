const db = require('../config/db');

class ColorCode {
  static getAll() {
    return db.prepare('SELECT * FROM color_codes ORDER BY code').all();
  }

  static getById(id) {
    return db.prepare('SELECT * FROM color_codes WHERE id = ?').get(id);
  }

  static create(code) {
    const result = db.prepare('INSERT INTO color_codes (code) VALUES (?)').run(code);
    return { id: result.lastInsertRowid, code };
  }

  static update(id, code) {
    db.prepare('UPDATE color_codes SET code = ? WHERE id = ?').run(code, id);
    return { id, code };
  }

  static delete(id) {
    db.prepare('DELETE FROM color_codes WHERE id = ?').run(id);
  }

  static getParts(colorCodeId) {
    return db.prepare(`
      SELECT * FROM color_parts 
      WHERE color_code_id = ? 
      ORDER BY part_number
    `).all(colorCodeId);
  }

  static getPartItems(colorPartId) {
    return db.prepare(`
      SELECT f.id, f.color_name, cpi.quantity 
      FROM color_part_items cpi
      JOIN fundamental_colors f ON cpi.fundamental_color_id = f.id
      WHERE cpi.color_part_id = ?
    `).all(colorPartId);
  }

  static addPart(colorCodeId, partNumber, totalKg) {
    const result = db.prepare(`
      INSERT INTO color_parts (color_code_id, part_number, total_kg) 
      VALUES (?, ?, ?)
    `).run(colorCodeId, partNumber, totalKg);
    return { id: result.lastInsertRowid, color_code_id: colorCodeId, part_number: partNumber, total_kg: totalKg };
  }

  static addPartItem(colorPartId, fundamentalColorId, quantity) {
    db.prepare(`
      INSERT INTO color_part_items (color_part_id, fundamental_color_id, quantity) 
      VALUES (?, ?, ?)
    `).run(colorPartId, fundamentalColorId, quantity);
  }

  static deleteParts(colorCodeId) {
    db.prepare('DELETE FROM color_parts WHERE color_code_id = ?').run(colorCodeId);
  }
}

module.exports = ColorCode;