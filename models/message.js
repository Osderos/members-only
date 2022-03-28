const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 50 },
  text: { type: String, required: true, minlength: 3, maxlength: 50 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
