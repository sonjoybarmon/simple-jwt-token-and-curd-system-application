const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "pending",
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = todoSchema;
