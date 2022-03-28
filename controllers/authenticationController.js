const { body, validationResult } = require("express-validator");
const passport = require("passport");
const User = require("../models/user");

exports.signup_get = (req, res) => {
  res.render("signup_form", { title: "Sign Up" });
};

exports.signup_post = [
  body("firstname", "Please enter your first name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("familyname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please enter your family name"),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please enter a user name"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Please enter a password of minimum 6 caracters"),
  body("passwordConfirm").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);

    const user = new User({
      firstname: req.body.firstname,
      familyname: req.body.familyname,
      username: req.body.username,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      res.render("signup_form", {
        title: "Sign Up",
        user: user,
        errors: errors.array(),
      });
      return;
    } else {
      User.findOne({ username: req.body.username }).exec(function (
        err,
        found_username
      ) {
        if (err) {
          return next(err);
        }
        if (found_username) {
          res.render("signup_form", {
            title: "Sign Up",
            error: "Username already taken",
          });
        } else {
          user.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect("/");
          });
        }
      });
    }
  },
];

exports.login_get = (req, res) => {
  res.render("login_form", { title: "Login" });
};

exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});
