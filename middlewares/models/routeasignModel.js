const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    route_id: {
        type: Number,
        //required: true
    },
    driver_id: {
        type: Number,
        //required: true
    },
    asign_type: {
        type: String,
        //required: [true, "Please enter pickup/drop"]
    },
    nof_stations: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('asigned_route', commentSchema)