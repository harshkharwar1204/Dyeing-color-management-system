const FundamentalColor = require('../models/FundamentalColor');

exports.listFundamentalColors = (req, res) => {
  try {
    const colors = FundamentalColor.getAll();
    res.json(colors);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.searchFundamentalColors = (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Query parameter "q" is required' });

  try {
    const colors = FundamentalColor.search(q);
    res.json(colors);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.createFundamentalColor = (req, res) => {
  const { colorName } = req.body;
  if (!colorName) return res.status(400).json({ error: 'colorName is required' });

  try {
    const color = FundamentalColor.create(colorName);
    res.status(201).json(color);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Color already exists' });
    }
    res.status(500).json({ error: 'Database error' });
  }
};