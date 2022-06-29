"use strict";
const mongoose = require("mongoose");

const sensor = mongoose.Schema({
    sensorId: { type: String, required: true, trim: true, },
    foodId: { type: String, required: true, trim: true, },
},
    { timestamps: true } //to include createdAt and updatedAt
);
mongoose.model("sensor", sensor);
module.exports = sensor;