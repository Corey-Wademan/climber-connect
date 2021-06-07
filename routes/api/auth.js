const express = require('express');
const router = express.Router();

// GET api/auth //access Public //Test Route
router.get('/', (req, res) => {
    res.send('Auth Route')
});

module.exports = router;