const express = require('express');
const router = express.Router();
const  Order = require('../models/Order');  
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
router.get('/', (req, res) => {
    res.send('Dashboard route');
});

module.exports = router;