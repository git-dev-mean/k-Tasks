"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be longer than 6 characters.'],
        select: false,
    },
});
//# sourceMappingURL=user.model.js.map