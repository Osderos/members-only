var express = require("express");
var router = express.Router();

const Message = require("../models/message");

const checkAuth = require("../middleware/checkAuth");
const message_controller = require("../controllers/messageController");

/* GET home page. */
router.get("/", function (req, res, next) {
  Message.find()
    .sort({ date: 1 })
    .populate("user")
    .exec(function (err, messages_list) {
      if (err) {
        return next(err);
      }
      res.render("index", {
        title: "Members-Only",
        user: req.user,
        messages: messages_list,
      });
    });
});

// MESSAGE ROUTES
router.get(
  "/message",
  checkAuth.checkAuthenticated,
  message_controller.message_get
);
router.post(
  "/message",
  checkAuth.checkAuthenticated,
  message_controller.message_post
);

module.exports = router;
