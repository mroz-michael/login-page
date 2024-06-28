const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, minlength: 2, maxlength: 20, required: true},
    passwordHash: {type: String, required: true}
})

module.exports = mongoose.model("User", userSchema);