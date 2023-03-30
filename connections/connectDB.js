const mongoose = require("mongoose");

const main = async () => {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = main;