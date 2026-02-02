const mongoose = require('mongoose');

const SuperAdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email_address: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false  // Avoid returning password by default
    }
});

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);
