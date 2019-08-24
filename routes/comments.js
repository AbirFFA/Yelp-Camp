var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middleware = require('../middleware');

// app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
//     Campground.findById(req.params.id, function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("comments/new", {campground: campground});
//         }
//     });
// });

router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(req.body.comment);
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// router.get("/:comment_id/edit", function (req, res) {
//     res.render("comments/edit");
// });

router.put("/:comment_id", middleware.isLoggedIn, middleware.checkCommentOwnership, function (req, res) {
    Comment.findOneAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            console.log(updatedComment);
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:comment_id", middleware.isLoggedIn, middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;