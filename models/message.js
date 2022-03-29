const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const format = require("date-fns/format");

const MessageSchema = new Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 50 },
  text: { type: String, required: true, minlength: 3, maxlength: 50 },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

MessageSchema.virtual("date_formated").get(function () {
  return format(this.date, "dd-MMMM");
});

module.exports = mongoose.model("Message", MessageSchema);
