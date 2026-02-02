const mongoose = require('mongoose');

const transportServiceSchema = new mongoose.Schema({
    name_of_transport_service: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    zip_code: {
        type: String,
        required: false
    },
    phone_number: {
        type: String,
        required: false
    },
    email_address: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TransportService', transportServiceSchema);
