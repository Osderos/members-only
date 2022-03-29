exports.checkNotAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  next();
};

// if member than redirect to home if member route is accesed
exports.checkMember= function (req,res,next){
  if(res.locals.currentUser.isMember){
    res.redirect('/')
  }
  next()
}