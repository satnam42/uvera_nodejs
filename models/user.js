"use strict";
const mongoose = require("mongoose");

const user = mongoose.Schema({
    name: { type: String, required: true, trim: true, },
    email: { type: String, required: true, trim: true, },
    password: { type: String, required: true, trim: true, },
    surName: { type: String, default: "" },
    province: { type: String, default: "" },
    postCode: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    country: { type: String, default: "" },
    token: { type: String, default: "" }, //access token
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    deviceToken: { type: String, default: "" },
},
    { timestamps: true } //to include createdAt and updatedAt
);
mongoose.model("user", user);
module.exports = user;