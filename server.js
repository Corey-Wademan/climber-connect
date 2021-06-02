const express = require('express');
const app = express()
const PORT = process.env.PORT || 5000;
const connectDb = require('./config/db');

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

connectDb();

app.get('/', (req, res) => res.send('API Running'));