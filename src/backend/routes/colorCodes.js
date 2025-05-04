const express = require('express');
const controller = require('../controllers/colorCode');

const router = express.Router();

router.get('/', controller.listColorCodes);
router.post('/', controller.createColorCode);
router.get('/:id', controller.getColorCode);
router.put('/:id', controller.updateColorCode);
router.delete('/:id', controller.deleteColorCode);

module.exports = router;