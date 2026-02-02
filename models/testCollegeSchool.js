// models/testCollegeSchool.js
const mongoose = require('mongoose');

const collegeSchoolSchema = new mongoose.Schema({
    name_of_institution: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip_code: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    email_address: {
        type: String,
        required: true,
        unique: true,
    },
    website: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('CollegeSchool', collegeSchoolSchema);
