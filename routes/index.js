var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User = require("../models/users");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/register", function (req, res) {
    res.render("register2");
});

router.post("/register", function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", function (req, res) {
    res.render("login2");
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {

});

router.get("/logout", function (req, res) {
    req.logout();
    req.flash('success', 'You are signed out.');
    res.redirect("/");
});

module.exports = router;