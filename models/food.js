"use strict";
const mongoose = require("mongoose");

const food = mongoose.Schema({
    name: { type: String, required: [true, "name is required"], trim: true, },
    image: { type: String },
    type: { type: String },
    normalExp: { type: String },
    vacuumExp: { type: String },
    // normalExp: {
    //     type: {
    //         type: String,
    //         enum: {
    //             values: ["month", "months", "year", "yeras", "week", "weeks"],
    //             message: '{VALUE} is not supported'
    //         }
    //     },
    //     number: { type: Number, default: 0 }
    // },
    // vacuumExp: {
    //     type: {
    //         type: String,
    //         enum: {
    //             values: ["month", "months", "year", "yeras", "week", "weeks"],
    //             message: '{VALUE} is not supported'
    //         }
    //     },
    //     number: { type: Number, default: 0 }
    // },
    qty: { type: String, default: 0 },
    // expireIn: { type: Date, },
    expiryDate: { type: Date, required: true },
    category: {
        type: String,
        enum: ["REFRIGERATOR", "PANTRY", "FREEZER"],
    },
    status: {
        type: String,
        default: "not-consumed",
        enum: ["not-consumed", "consumed"]
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
// food.save(function (error) {
//     assert.equal(error.errors['name'].message,
//         '`name` is required.');
//     error = cat.validateSync();

// });

mongoose.model("food", food);
module.exports = food;