const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');

router.use('/api', authRoutes);
router.use('/api/product', require('./productRoutes'));
router.use('/api/file', require('./fileRoutes'));

module.exports = router;