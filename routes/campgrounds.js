var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    middleware = require("../middleware"),
    multer = require('multer');

var storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter});

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'b-l-i-n-d',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get("/", function(req, res) {
    var noMatch = null;
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), "gi");
        Campground.find({name: regex}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
                if(allCampgrounds.length < 1) {
                    noMatch = "No campgrounds match that query, please try again.";
                }
                res.render("campgrounds/index",{campgrounds:allCampgrounds, noMatch: noMatch});
            }
        });
    } else {
        Campground.find({}, function (err, allCampgrounds) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user, noMatch: noMatch});
            }
        });
    }
});

router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res){
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
        if(err) {
            req.flash('error', err.message);
            return res.redirect('back');
        }
        // add cloudinary url for the image to the campground object under image property
        req.body.campground.image = result.secure_url;
        // add image's public_id to campground object
        req.body.campground.imageId = result.public_id;
        // add author to campground
        req.body.campground.author = {
            id: req.user._id,
            username: req.user.username
        };
        Campground.create(req.body.campground, function(err, campground) {
            if (err) {
                req.flash('error', err.message);
                return res.redirect('back');
            }
            res.redirect('/campgrounds/' + campground.id);
        });
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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;