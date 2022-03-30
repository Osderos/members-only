exports.checkIsMember = function (req, res, next) {
  if (req.user.isMember) {
    next()
  }
  res.redirect('/')
};

exports.checkIsNotMember = function (req, res, next) {
  if (req.user.isMember) {
    res.redirect('/')
  }
  next()
};


exports.checkIsLoggedIn = function (req, res, next) {
  if (req.user) {
    next();
  }
  res.redirect("/login");
};
