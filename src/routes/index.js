const express = require('express');
const router = express.Router();
const PageRoutes = require('./pageRoutes');
const CmsRoutes = require('./cmsRoutes');
const SectionRoutes = require('./sectionRoutes.js');
const SeoRoutes = require('./seoRoutes');

router.use('/api', PageRoutes);
router.use('/api', CmsRoutes);
router.use('/api', SectionRoutes);
router.use('/api', SeoRoutes);
module.exports = router;