const express = require('express');
const router = express.Router();
const SeoDataController = require('../controllers/seoDataController.js');

router.get('/list-seo', SeoDataController.getAllSeoData);

router.post('/add-seo', SeoDataController.addSeoData);

router.get('/seo/:id', SeoDataController.getSeoDataById);

router.put('/update-seo/:id', SeoDataController.updateSeoData);

router.delete('/delete-seo/:id', SeoDataController.deleteSeoData);

module.exports = router;
