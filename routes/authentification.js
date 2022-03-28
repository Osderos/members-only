const express = require("express");
const router = express.Router();

const authentication_controller = require("../controllers/authenticationController");
const checkAuth = require("../middleware/checkAuth");

//SIGNUP

router.get(
  "/signup",
  checkAuth.checkNotAuthenticated,
  authentication_controller.signup_get
);
router.post(
  "/signup",
  checkAuth.checkNotAuthenticated,
  authentication_controller.signup_post
);

//LOGIN

router.get(
  "/login",
  checkAuth.checkNotAuthenticated,
  authentication_controller.login_get
);
router.post(
  "/login",
  checkAuth.checkNotAuthenticated,
  authentication_controller.login_post
);

module.exports = router;
