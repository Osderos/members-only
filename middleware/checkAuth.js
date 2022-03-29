exports.checkNotAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  next();
};

//if guest then redirect home if trying to acces not related routes , i.e /member
exports.checkAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect("/");
};

// if member than redirect to home if member route is accesed
exports.checkMember = function (req, res, next) {
  if (res.locals.currentUser.isMember) {
    res.redirect("/");
  }
  next();
};

exports.checkNotMember = function (req, res, next) {
  if (req.isAuthenticated() && res.locals.currentUser.isMember) {
    next();
  }
  res.redirect("/");
};
