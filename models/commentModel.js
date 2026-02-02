const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter username"],
        trim: true,
        maxLength: [100, "Username cannot exceed 100 characters"]
    },
    userId: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: [true, "Please enter comment"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // fcmToken: { type: String },
    // serverKey: { type: String },
})
module.exports = mongoose.model('Comment', commentSchema)