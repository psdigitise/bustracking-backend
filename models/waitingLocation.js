// // const mongoose = require('mongoose');

// // const waitingLocationSchema = new mongoose.Schema({
// //     driver_id: {
// //         type: String,
// //         required: true
// //     },
// //     route_id: {
// //         type: String,
// //         required: false // Optional field if not always available
// //     },
// //     latitudeDelta: {
// //         type: Number,
// //         required: true
// //     },
// //     longitudeDelta: {
// //         type: Number,
// //         required: true
// //     },
// //     start_time: {
// //         type: Date,
// //         required: true
// //     },
// //     end_time: {
// //         type: Date,
// //         required: true
// //     },
// //     date: {
// //         type: String,
// //         required: true
// //     },
// //     createdAt: {
// //         type: Date,
// //         default: Date.now
// //     }
// // });

// // module.exports = mongoose.model('WaitingLocation', waitingLocationSchema);


// const mongoose = require('mongoose');

// const waitingLocationSchema = new mongoose.Schema({
//     driver_id: {
//         type: String,
//         required: true
//     },
//     route_id: {
//         type: String,
//         required: false // Optional field if not always available
//     },
//     latitudeDelta: {
//         type: Number,
//         required: true
//     },
//     longitudeDelta: {
//         type: Number,
//         required: true
//     },
//     start_time: {
//         type: Date,
//         required: true
//     },
//     end_time: {
//         type: Date,
//         required: true
//     },
//     date: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('WaitingLocation', waitingLocationSchema);

const mongoose = require("mongoose");

const WaitingLocationSchema = new mongoose.Schema(
  {
    driver_id: { type: String, required: true },
    route_id: { type: String, required: true },
    latitudeDelta: { type: Number, required: true },
    longitudeDelta: { type: Number, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("waiting_locations", WaitingLocationSchema);
