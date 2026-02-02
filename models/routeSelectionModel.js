const mongoose = require("mongoose");

const routeSelectionSchema = new mongoose.Schema({
  name_of_route: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate entries
  },
});

module.exports = mongoose.model("RouteSelection", routeSelectionSchema);
