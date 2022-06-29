"use strict";

const user = require('../models/user');
const imageUrl = require('config').get('image').url

exports.toModel = entity => {

    const model = {
        id: entity._id,
        name: entity.name,
        normalExp: entity.normalExp,
        type: entity.type,
        vacuumExp: entity.vacuumExp,
        qty: entity.qty,
        category: entity.category,
        expiryDate: entity.expiryDate,
    };

    if (entity.image && entity.image !== undefined && entity.image !== "") {
        model.image = `${imageUrl}${entity.image}`
    }

    if (entity.foods && entity.foods !== undefined && entity.foods.length > 0) {
        for (let index = 0; index < entity.foods.length; index++) {
            if (entity.foods[index].image !== undefined && entity.foods[index].image !== "")
                entity.foods[index].image = `${imageUrl}${entity.foods[index].image}`;
        }
        model.category = entity.category
        model.foods = entity.foods
    }

    // if (entity.image && entity.image.gallery && entity.image.gallery.length > 0) {
    //     for (let index = 0; index < entity.image.gallery.length; index++) {
    //         entity.image.gallery[index].image = `${imageUrl}${entity.image.gallery[index].image}`;
    //     }
    //     model.gallery = entity.image.gallery
    // }

    return model;

};


exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};