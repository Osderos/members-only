const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true, minlength: 1 },
  familyname: { type: String, required: true, minlength: 1 },
  username: { type: String, required: true, minlength: 1 },
  password: { type: String, required: true, minlength: 6 },
  isMember: { type: Boolean, required: true, default: false },
  message: { type: Schema.Types.ObjectId, ref: "Message" },
});

UserSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.familyname}`;
});

UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema)
