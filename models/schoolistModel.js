const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({


    school_id: {
        type: String,
    },
    school_name: {
        type: String,
    },
    school_lat: { type: String, },
    school_long: { type: String, },
    school_desc: { type: String, },
})
module.exports = mongoose.model('school_list', commentSchema)