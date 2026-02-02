const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    route_id: { type: String, required: [true, "Please enter route id"], },
    bus_station: { type: String, required: [true, "Please enter student details"], },
    bus_details: { type: Object, required: [true, "Please enter bus details"], },
    student_id: { type: String, required: [true, "Please enter student id"], },
    student_name: { type: String, required: [true, "Please enter student name"], },
    student_attendance: { type: String, required: [true, "Please enter student attendance details"], },
    attendance_time: { type: String, required: [true, "Please enter attendance time"], },
    driver_details: { type: Object, required: [true, "Please enter driver details"], },
    status: { type: String, required: [true, "Please enter status"], },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('student_attendance', attendanceSchema)