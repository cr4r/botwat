const mongoose = require('mongoose');

var skemanya = new mongoose.Schema({
    nomor: { type: String },
});

module.exports = mongoose.model('welcome', skemanya);