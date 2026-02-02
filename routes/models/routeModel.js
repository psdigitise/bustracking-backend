const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    route_id: {
        type: String,
        required: true,
        trim: true,
    },
    bus_stopname: {
        type: String,
        required: true
    },
    lattitude: {
        type: String,
        required: [true, "Please enter lattitude"]
    },
    longitude: {
        type: String,
        required: [true, "Please enter longitude"]
    },
    latitudeDelta: {
        type: String,
        required: [false, "Please enter latitudeDelta"]
    },
    longitudeDelta: {
        type: String,
        required: [false, "Please enter longitudeDelta"]
    },
    status: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    }
})
module.exports = mongoose.model('pickupdrop_station', commentSchema)