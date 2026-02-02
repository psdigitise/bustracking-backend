// const mongoose = require("mongoose");

// const transportChoiceSchema = new mongoose.Schema({
//   serviceName: {
//     type: String,
//     required: true,
//   },
//   school_id:{
//     type: String,
//     required: false,

//   },
//   chosenBy: {
//     type: String, // e.g., user/admin details (optional, if needed)
//     default: "school",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const TransportChoice = mongoose.model("TransportChoice", transportChoiceSchema);
// module.exports = TransportChoice;


const mongoose = require("mongoose");

const transportChoiceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  school_id: {
    type: String,
    required: true, // Make this field required
  },
  chosenBy: {
    type: String, // Optional: e.g., user/admin details
    default: "school",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TransportChoice = mongoose.model("TransportChoice", transportChoiceSchema);
module.exports = TransportChoice;
