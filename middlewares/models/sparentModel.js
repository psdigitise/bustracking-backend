const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    student_id: {
        type: String,
        required: [true, "Please enter student id"],
        trim: true,
    },
    // student_name: {
    //     type: Number,
    //     required: true
    // },
    // bus_station: {
    //     type: String,
    //     required: [true, "bus station"]
    // },
    father_name: {
        type: Number,
        required: true
    },
    mother_name: {
        type: Number,
        required: true
    },
    father_mobile: {
        type: Number,
        required: true
    },
    parent_password: {
        type: String, // Add the parent password field as a string
        required: [true, "Please enter parent password"],
    },
    status: {
        type: String, // Add the parent password field as a string
        required: [true, "Please enter parent password"],
    },
    mother_mobile: {
        type: Number,
        required: true
    },
    parent_email: {
        type: String,
        required: [true, "Please enter parent email"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('parent_list', commentSchema)