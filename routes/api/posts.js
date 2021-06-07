const express = require('express');
const router = express.Router();

// GET api/posts //access Public //Test Route
router.get('/', (req, res) => {
    res.send('Posts Route')
});

module.exports = router;