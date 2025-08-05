const express = require('express');
const router = express.Router();
const SectionController = require('../controllers/sectionController');

router.get('/list-sections', SectionController.getAllSections);
router.post('/add-section', SectionController.addSection);
router.get('/section/:id', SectionController.getSectionById);
router.put('/update-section/:id', SectionController.updateSection);
router.delete('/delete-section/:id', SectionController.deleteSection);

module.exports = router;
