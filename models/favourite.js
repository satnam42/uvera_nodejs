"use strict";
const mongoose = require("mongoose");
const favourite = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipe',
        required: true
    },
    isFav: {
        type: Boolean, default: false,

    },

},
    { timestamps: true } //to include createdAt and updatedAt
);

mongoose.model("favourite", favourite);
module.exports = favourite;