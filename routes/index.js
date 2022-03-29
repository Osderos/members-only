var express = require("express");
var router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const message_controller = require("../controllers/messageController");

/* GET home page. */
router.get("/", message_controller.index);

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
