const mongoose = require('mongoose');

var skemanya = new mongoose.Schema({
    maintence: { type: String, enum: ['1', '0'] },
    ownerNumber: { type: Array }
});

module.exports = mongoose.model('setting', skemanya);