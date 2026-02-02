// const mongoose = require('mongoose');
// const busSchema = new mongoose.Schema({
//     bus_id: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     bus_name: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         required: false,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now()
//     },
// })
// module.exports = mongoose.model('bus_detail', busSchema)

const mongoose = require('mongoose');
const busSchema = new mongoose.Schema({
    bus_id: {
        type: String,
        required: true,
        trim: true
    },
    bus_name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false,
    },
    localid: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});
module.exports = mongoose.model('bus_detail', busSchema);
