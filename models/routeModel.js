const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    route_id: {
        type: String,
        required: true,
        trim: true,
    },
    bustop_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: function() { return this._id; } // Default to the _id of the document
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
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})
module.exports = mongoose.model('pickupdrop_station', commentSchema)