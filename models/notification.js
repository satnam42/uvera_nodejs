"use strict";
const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true, },
    message: { type: String, required: true, trim: true, },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'food', required: true },
},
    { timestamps: true } //to include createdAt and updatedAt
);
mongoose.model("notification", notificationSchema);
module.exports = notificationSchema;