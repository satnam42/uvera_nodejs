"use strict";
const mongoose = require("mongoose");

const recipe = mongoose.Schema({
    dishName: { type: String, required: true, trim: true, },
    ingredinents: [{ type: String, required: true, trim: true, }],
    directions: { type: String, required: true, },
    prepTime: { type: String, default: "" },
    image: { type: String },
    totalTime: { type: String, default: "" },
    mainIngredinent: { type: mongoose.Schema.Types.ObjectId, ref: 'food', required: [true, "food id is required"] },
    refLink: { type: String, default: "" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    other: { type: String, default: "" },
    isFav: { type: Boolean, default: false },
    status: {
        type: String,
        default: "not-consumed",
        enum: ["not-consumed", "consumed"]
    },
    expiryDate: { type: Date, required: true },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});

mongoose.model("recipe", recipe);
module.exports = recipe;