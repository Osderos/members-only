exports.checkNotAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  next();
};
