const { body, validationResult } = require("express-validator");

const Message = require("../models/message");
const User = require("../models/user");

exports.index = async (req, res, next) => {
  try {
    const messages = await Message.find({}).sort({ date: 1 }).populate("user");
    if (!messages) {
      return next("No messages found");
    }
    res.render("index", {
      title: "MembersOnly",
      user: req.user,
      messages: messages,
    });
  } catch (err) {
    return next(err);
  }
};

exports.message_get = function (req, res, next) {
  res.render("message_form", { title: "New Message" });
};

exports.message_post = [
  body("userMessageTitle")
    .isLength({ min: 3 })
    .withMessage("Title should be at least 3 caracters long")
    .trim(),
  body("userMessage")
    .isLength({ min: 3 })
    .withMessage("Message should be at least 3 caracters long")
    .isLength({ max: 50 })
    .withMessage("Message must be shorter than 50 caracters")
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.userMessageTitle,
      text: req.body.userMessage,
      user: req.user._id,
      date: req.body.date,
    });

    if (!errors.isEmpty()) {
      res.render("message_form", {
        title: "New Message",
        message: message,
        errors: errors.array(),
      });
    } else {
      message.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    }
  },
];

exports.message_delete_post = [
  body("id").trim(),
  (req, res, next) => {
    console.log(req.body);
    Message.findByIdAndRemove(req.body.id, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
];
