const express = require('express');
const router = express.Router();
const cmsController = require('../controllers/cmsController');

router.get('/cms', cmsController.getAllPagesWithSections);

module.exports = router;