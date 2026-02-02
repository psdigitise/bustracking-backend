const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    student_id: {
        type: String,
        required: [true, "Please enter student id"],
        trim: true,
    },
    student_name: {
        type: Number,
        required: true
    },
    route_id: { type: String, required: [true, "Please enter route id"], },
    bus_station: { type: String, required: [true, "Please enter bus station"], },
    parent_email: { type: String, required: [true, "Please enter email"], },
    parent_password: { type: String, required: [true, "Please enter parent password"], },
    student_details: { type: Object, required: [true, "Please enter student details"], },
    parent_details: { type: Object, required: [true, "Please enter parent details"], },
    status: { type: String, required: [true, "Please enter status"], },
    description: { type: String, required: [true, "Please enter route id"], },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    fcmToken: { type: String },
    serverKey: { type: String },
})
module.exports = mongoose.model('student_list', commentSchema)