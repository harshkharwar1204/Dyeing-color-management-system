const express = require('express');
const controller = require('../controllers/fundamentalColor');

const router = express.Router();

router.get('/', controller.listFundamentalColors);
router.get('/search', controller.searchFundamentalColors);
router.post('/', controller.createFundamentalColor);

module.exports = router;