var mongoose                = require("mongoose"),
    passportLocalMngoose    = require("passport-local-mongoose");

var UserSchema = mongoose.Schema ({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMngoose);
module.exports = mongoose.model("User", UserSchema);