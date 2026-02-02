// const mongoose = require('mongoose');

// const transportCredentialSchema = new mongoose.Schema({
//     transport_service: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('TransportCredential', transportCredentialSchema);


const mongoose = require('mongoose');

const transportCredentialSchema = new mongoose.Schema({
    transport_service: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    school_id: {
        type: String, 
        // ref: 'School', // Assuming there is a School model
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TransportCredential', transportCredentialSchema);
