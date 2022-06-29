
const getFav = async (recipes, favourites, isFav) => {
    let items = []
    for (var p = 0; p < recipes.length; p++) {
        for (var f = 0; f < favourites.length; f++) {
            if (favourites[f].recipe !== null && favourites[f].recipe !== undefined) {
                if (recipes[p].id === favourites[f].recipe.id) {
                    console.log('recipes[p].id', recipes[p].id)
                    console.log(' favourites[f].recipe.id', favourites[f].recipe.id)

                    if (favourites[f].isFav && favourites[f].isFav != undefined) {
                        console.log('fav', favourites[f].isFav)
                        console.log('recipe', recipes[p])
                        if (isFav) {
                            items.push(recipes[p])
                        }
                        recipes[p].isFav = true
                    }
                }
            }
        }

    }

    // only fav items 
    if (isFav) {
        return items
    }
    // mix  items 
    return recipes

}
const setRecipe = (model, recipe, context) => {
    const log = context.logger.start("services:recipes:set");

    if (model.dishName !== "string" && model.dishName !== undefined) {
        recipe.dishName = model.dishName;
    }

    if (model.ingredinents !== "string" && model.ingredinents !== undefined) {
        recipe.ingredinents = model.ingredinents;
    }

    if (model.directions !== "string" && model.directions !== undefined) {
        recipe.directions = model.directions;
    }

    if (model.prepTime !== "string" && model.prepTime !== undefined) {
        recipe.prepTime = model.prepTime;
    }

    if (model.totalTime !== "string" && model.totalTime !== undefined) {
        recipe.totalTime = model.totalTime;
    }

    if (model.foodId !== "string" && model.foodId !== undefined) {
        recipe.mainIngredinent = model.foodId;
    }

    if (model.refLink !== "string" && model.refLink !== undefined) {
        recipe.refLink = model.refLink;
    }

    if (model.status !== "string" && model.status !== undefined) {
        recipe.status = model.status;
    }

    if (model.other !== "string" && model.other !== undefined) {
        recipe.other = model.other;
    }

    log.end();
    recipe.save();
    return recipe;

};

const buildRecipe = async (model, context) => {

    const log = context.logger.start(`services:recipes:build${model}`);
    const recipe = await new db.recipe({
        dishName: model.dishName,
        ingredinents: model.ingredinents,
        userId: model.userId,
        directions: model.directions,
        prepTime: model.prepTime,
        totalTime: model.totalTime,
        mainIngredinent: model.foodId,
        refLink: model.refLink,
        other: model.other,
        expiryDate: model.expiryDate,
        status: model.status,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return recipe;

};

const buildFav = async (model, context) => {
    const { userId, recipeId, isFav } = model;
    const log = context.logger.start(`services:recipes:buildFav${model}`);
    const favourite = await new db.favourite({
        user: userId,
        recipe: recipeId,
        isFav: isFav,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return favourite;
};

const makeFavOrUnFav = async (model, context) => {
    const log = context.logger.start("services:recipes:makeFavOrUnFav");
    let favourite = await db.favourite.findOne({ $and: [{ user: model.userId }, { recipe: model.recipeId }] })

    if (favourite) {
        favourite.isFav = model.isFav
        await favourite.save()
    } else {
        favourite = buildFav(model, context);
    }
    log.end();
    return favourite;
};

const addRecipe = async (model, context) => {
    const log = context.logger.start("services:recipes:create");
    let user = await db.user.findById(model.userId)

    if (!user) {
        throw new Error("this user id not associate any user");
    }

    const recipe = buildRecipe(model, context);
    log.end();
    return recipe;

};

const allRecipes = async (query, context) => {
    const log = context.logger.start(`services:recipes:allRecipes`);
    const favourites = await db.favourite
        .find({ user: context.user.id })
        .populate('recipe')

    let recipes = await db.recipe.find().sort({ $natural: -1 })

    if (favourites.length > 0) {
        // add fav in recipe
        recipes = await getFav(recipes, favourites, false)
    }

    // allRecipes.count = await db.recipe.find().count();
    log.end();
    return recipes;
};


const recipeById = async (id, context) => {
    const log = context.logger.start(`services:recipes:recipeById`);
    if (!id) {
        throw new Error("recipe id is required");
    }
    let recipes = []
    let recipe = await db.recipe.findById(id)
    if (!recipe) {
        throw new Error("recipe not found");
    }
    const favourites = await db.favourite
        .find({ user: context.user.id, })
        .populate('recipe')
    if (favourites.length > 0) {
        recipes.push(recipe)
        // add fav in recipe
        recipes = getFav(recipes, favourites, false)
    }

    log.end();
    return recipes[0];
};

const recipesByFoodId = async (id, context) => {
    const log = context.logger.start(`services:recipes:recipeByFoodId`);
    if (!id) {
        throw new Error("food id is required");
    }
    let recipes = await db.recipe.find({ mainIngredinent: id }).populate('mainIngredinent', 'name')
    if (!recipes) {
        throw new Error("recipes not found");
    }
    const favourites = await db.favourite
        .find({ user: context.user.id })
        .populate('recipe')
    if (favourites.length > 0) {
        // add fav in recipe
        recipes = await getFav(recipes, favourites, false)
    }
    log.end();
    return recipes;
};

const recipesByUserId = async (id, query, context) => {
    const log = context.logger.start(`services:recipes:recipesByUserId`);
    if (!id) {
        throw new Error("recipe id is required");
    }
    let recipes = await db.recipe.find({ 'userId': id }).populate('mainIngredinent', 'name')
    if (!recipes) {
        throw new Error("recipes not found");
    }
    if (query.fav === 'fav') {
        const favourites = await db.favourite
            .find({ user: context.user.id })
            .populate('recipe')
        if (favourites.length > 0) {
            // add fav in recipe
            recipes = await getFav(recipes, favourites, true)
        }
    }
    log.end();
    return recipes;
};


const deleteRecipe = async (id, context) => {
    const log = context.logger.start(`services:recipes:deleteRecipe`);

    if (!id) {
        throw new Error("id is requried");
    }

    let recipe = await db.recipe.deleteOne({ _id: id });

    if (!recipe) {
        throw new Error("recipe not found");
    }
    log.end();
    return 'Recipe Deleted Successfully'
};

const updateRecipe = async (id, model, context) => {
    const log = context.logger.start(`services:recipes:updateRecipe`);
    let entity = await db.recipe.findById(id)
    if (!entity) {
        throw new Error("invalid recipe");
    }
    const recipe = await setRecipe(model, entity, context);
    log.end();
    return recipe
};

const searchRecipe = async (name, context) => {
    const log = context.logger.start(`services:recipes:search`);
    if (!name) {
        throw new Error("name is required");
    }
    const recipes = await db.recipe.find({ dishName: { "$regex": '.*' + name + '.*', "$options": 'i' } }).limit(5);
    log.end();
    return recipes
};

const imageUpload = async (files, id, context) => {
    const log = context.logger.start(`services:recipes:imageUpload`);

    let fileName  // remove space from string
    let file = files[0]
    // let query = { id: id }

    if (files == undefined && files.length < 0) {
        throw new Error("image is required");
    }

    if (!id) {
        throw new Error("recipe id is required");
    }

    let recipe = await db.recipe.findById(id)

    if (!recipe) {
        throw new Error("recipe not found");
    }

    if (recipe.image !== undefined) {
        let path = file.destination + '/' + recipe.image
        try {
            await fs.unlinkSync(path);
            log.info(`image successfully removed from ${path}`);
        } catch (error) {
            log.error('there was an error to remove image:', error.message);
        }
    }

    else {
        fileName = files[0].filename.replace(/ /g, '')
        recipe.image = fileName
        await recipe.save()
    }

    log.end();
    return 'image uploaded successfully'
};

exports.addRecipe = addRecipe;
exports.recipeById = recipeById;
exports.searchRecipe = searchRecipe;
exports.recipesByUserId = recipesByUserId;
exports.allRecipes = allRecipes;
exports.deleteRecipe = deleteRecipe;
exports.updateRecipe = updateRecipe;
exports.recipesByFoodId = recipesByFoodId;
exports.imageUpload = imageUpload;
exports.makeFavOrUnFav = makeFavOrUnFav;

