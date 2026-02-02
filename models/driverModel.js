const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    // driver_id: {
    //     type: String, // Ensure this is stored as a plain string
    //     required: false,
    //     unique: true,
    // },
    driver_id: {
        type: String,
    },
    driver_name: {
        type: String,
        required: [true, "Please enter username"],
    },
    authorized: { type: Object },
    driver_email: {
        type: String,
        required: [true, "Please enter email"],
    },
    driver_password: {
        type: String,
        required: [true, "Please enter password"],
    },
    personal_details:
    {
        type: Object,
        required: [true, "Please enter personal details"],
    },
    status: {
        type: String,
        required: [true, "Please enter status"],
    },
    description: {
        type: String,
        required: [true, "Please enter description"],
    },
    bus_name: {
        type: String,
    },
    bus_no: {
        type: String,
    },
    route_details: {
        type: String,
    },
    start_from: {
        type: Object,
    },
    localid: { type: String },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    fcmToken: { type: String },
    serverKey: { type: String },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})
module.exports = mongoose.model('driver_list', commentSchema)