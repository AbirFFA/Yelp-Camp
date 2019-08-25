var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

router.get("/", function(req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, price: price, description: desc, author: author};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong.");
            res.redirect("back");
        } else {
            req.flash("success", "Campground created");
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new2");
});

router.get("/:id", function(req, res) {
    Campground.findById (req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
            req.flash("error", "Something went wrong.");
            res.redirect("back");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

router.get("/:id/edit", middleware.isLoggedIn, middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit2", {campground: foundCampground});
    });
});

router.put("/:id", middleware.isLoggedIn, middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong.");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Updated successfully.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:id", middleware.isLoggedIn, middleware.checkCampgroundOwnership, function (req, res) {
    if (req.isAuthenticated()) {
        Campground.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                console.log(err);
                req.flash("error", "Something went wrong.");
                res.redirect("/campgrounds/" + req.params.id);
            } else {
                req.flash("success", "Deleted successfully.");
                res.redirect("/campgrounds");
            }
        });
    }
});

module.exports = router;