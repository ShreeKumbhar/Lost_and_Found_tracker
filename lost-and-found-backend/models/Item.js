const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true
    },
    type: { // "Lost" or "Found"
        type: String,
        required: true,
        enum: ['Lost', 'Found']
    },
    isReturned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Item', itemSchema);