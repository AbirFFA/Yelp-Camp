var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User = require("../models/users"),
    Campground = require("../models/campground");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/register", function (req, res) {
    res.render("register2");
});

router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar
    });

    if (req.body.adminCode === "itsacode") {
        newUser.isAdmin = true;
    }

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

router.get("/user/:id", function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }

        Campground.find().where("author.id").equals(foundUser._id).exec(function (err, campgrounds) {
            if (err) {
                console.log(err);
                req.flash("error", "Something went wrong");
                res.redirect("back");
            }
            res.render("users/user", {user: foundUser, campgrounds: campgrounds});
        });
    });
});

module.exports = router;