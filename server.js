const express = require('express');
const app = express()
const PORT = process.env.PORT || 5000;
const connectDb = require('./config/db');

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

connectDb();

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))