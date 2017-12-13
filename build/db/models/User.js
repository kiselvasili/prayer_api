"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    facebook_id: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});
UserSchema.index({ facebook_id: 1, email: 1 }, { unique: true });
exports["default"] = mongoose.model('User', UserSchema);
