const { body, validationResult } = require("express-validator");

const Message = require("../models/message");
const User = require("../models/user");

exports.message_get = (req, res, next) => {
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
        res.redirect("index", {message:message});
      });
    }
  },
];
