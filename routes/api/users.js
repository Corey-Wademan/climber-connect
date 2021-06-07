const express = require('express');
const router = express.Router();

// GET api/users //access Public //Test Route
router.get('/', (req, res) => {
    res.send('User Route')
});

module.exports = router;