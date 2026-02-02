const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    // route_id: {
    //     type: String,
    //     trim: true,
    //     required: true
    // },
    title: {
        type: String,
        required: [true, "Please enter title"]
    },
    message: {
        type: String,
        required: [true, "Please enter message"]
    },
    person: {
        type: String,
        required: [true, "Please choose person"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})
module.exports = mongoose.model('push_notification', commentSchema)