const mongoose = require('mongoose');

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

const mongoURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

function dbConnect() {
    mongoose.connect(mongoURI, options)
        .then(() => console.log(`Mongodb connecting to ${DB_NAME}...`))
        .catch(err => console.log(err));
}

module.exports = dbConnect;