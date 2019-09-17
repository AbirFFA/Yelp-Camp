var mongoose                = require("mongoose"),
    passportLocalMngoose    = require("passport-local-mongoose");

var UserSchema = mongoose.Schema ({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    avatar: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

UserSchema.plugin(passportLocalMngoose);
module.exports = mongoose.model("User", UserSchema);