"use strict";
const imageUrl = require('config').get('image').url

exports.toModel = entity => {
    const model = {
        id: entity._id,
        dishName: entity.dishName,
        ingredinents: entity.ingredinents,
        isFav: entity.isFav,
        directions: entity.directions,
        prepTime: entity.prepTime,
        image: entity.image,
        totalTime: entity.totalTime,
        mainIngredinent: entity.mainIngredinent.name,
        category: entity.category,
        refLink: entity.refLink,
        other: entity.other,
        status: entity.status,
        expiryDate: entity.expiryDate,
        createdOn: entity.createdOn,
    };
    if (entity.image && entity.image !== undefined && entity.image !== "") {
        model.image = `${imageUrl}${entity.image}`
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