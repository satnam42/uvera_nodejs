"use strict";
const mongoose = require("mongoose");
const address = mongoose.Schema({
    fullAddres: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    state: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    street: { type: String, default: "" },
    code: { type: String, default: "" },
    lat: { type: String, default: "" },
    lng: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
mongoose.model("address", address);
module.exports = address;