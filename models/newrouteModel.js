// const mongoose = require('mongoose');
// const commentSchema = new mongoose.Schema({
//     route_id: {
//         type: String,
//     },
//     route_name: {
//         type: String,
//         required: true
//     },
//     pickup_point: {
//         type: String,
//         // required: true
//     },
//     status: {
//         type: String,
//         //required: [true, "Please enter lattitude"]
//     },
//     description: {
//         type: String,
//         //required: [true, "Please enter longitude"]
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now()
//     },
// })
// module.exports = mongoose.model('route_details', commentSchema)


const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    route_id: {
        type: String,
    },
    route_name: {
        type: String,
        required: true
    },
    pickup_point: {
        type: String,
    },
    status: {
        type: String,
    },
    description: {
        type: String,
    },
    localid: {
        type: String, // New field to store the local ID
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('route_details', commentSchema);
