const express = require('express');
const router = express.Router();
const PageController = require('../controllers/pageController');

router.get('/list-pages', PageController.getAllPages);
router.post('/add-page', PageController.addPage);
router.get('/page/:id', PageController.getPageById);
router.put('/update-page/:id', PageController.updatePage);
router.delete('/delete-page/:id', PageController.deletePage);

module.exports = router;
