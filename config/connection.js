const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/socialNetwork');

module.exports = mongoose.connection;