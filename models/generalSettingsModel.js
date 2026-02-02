const mongoose = require('mongoose');

const generalSettingsSchema = new mongoose.Schema({
    site_name: {
        type: String,
        required: true
    },
    logo: {
        type: String, // This could be a URL to the logo file
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    support_no: {
        type: String,
        required: true
    },
    google_api_key: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('GeneralSettings', generalSettingsSchema);
