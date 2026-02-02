const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    route_id: {
        type: String,
        //required: true
        required: [true, "Route ID is required"]
    },
    driver_id: {
        type: String,
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