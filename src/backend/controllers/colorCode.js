const ColorCode = require('../models/ColorCode');

exports.listColorCodes = (req, res) => {
  try {
    const colorCodes = ColorCode.getAll();
    res.json(colorCodes);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getColorCode = (req, res) => {
  const { id } = req.params;
  
  try {
    const colorCode = ColorCode.getById(id);
    if (!colorCode) return res.status(404).json({ error: 'Color code not found' });

    const parts = ColorCode.getParts(id);
    const result = {
      ...colorCode,
      parts: parts.map(part => ({
        ...part,
        items: ColorCode.getPartItems(part.id)
      }))
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.createColorCode = (req, res) => {
  const { code, parts } = req.body;
  if (!code) return res.status(400).json({ error: 'code is required' });

  try {
    const colorCode = ColorCode.create(code);
    
    parts.forEach((part, index) => {
      const colorPart = ColorCode.addPart(colorCode.id, index + 1, part.totalKg);
      part.items.forEach(item => {
        ColorCode.addPartItem(colorPart.id, item.id, item.quantity);
      });
    });

    res.status(201).json(colorCode);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Color code already exists' });
    }
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateColorCode = (req, res) => {
  const { id } = req.params;
  const { code, parts } = req.body;
  if (!code) return res.status(400).json({ error: 'code is required' });

  try {
    ColorCode.update(id, code);
    ColorCode.deleteParts(id);
    
    parts.forEach((part, index) => {
      const colorPart = ColorCode.addPart(id, index + 1, part.totalKg);
      part.items.forEach(item => {
        ColorCode.addPartItem(colorPart.id, item.id, item.quantity);
      });
    });

    res.json({ id, code });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteColorCode = (req, res) => {
  const { id } = req.params;

  try {
    ColorCode.delete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};