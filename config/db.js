const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDb = async () => {
    try {
        await mongoose.connect(db,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });
        console.log('MongoDB connected')
    }
    catch(err) {
        console.error(err.message);
        // Exits the process with failure
        process.exit(1);
    }
}

module.exports = connectDb;