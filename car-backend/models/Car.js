const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    images: [String],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
