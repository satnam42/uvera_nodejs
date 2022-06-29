const ObjectId = require('mongodb').ObjectID
const setFood = (model, food, context) => {
    const log = context.logger.start("services:foods:setFood");

    if (model.name !== "string" && model.name !== undefined) {
        food.name = model.name;
    }

    if (model.normalExp.type !== "string" && model.normalExp !== undefined) {
        food.normalExp = model.normalExp;
    }

    if (model.type !== "string" && model.type !== undefined) {
        food.type = model.type;
    }

    if (model.vacuumExp.type !== "string" && model.vacuumExp !== undefined) {
        food.vacuumExp = model.vacuumExp;
    }

    if (model.qty !== undefined) {
        food.qty = model.qty;
    }

    if (model.category !== "string" && model.category !== undefined) {
        food.category = model.category;
    }
    if (model.status !== "string" && model.status !== undefined) {
        food.status = model.status;
    }

    log.end();
    food.save();
    return food;

};

const buildFood = async (model, context) => {

    const log = context.logger.start(`services:foods:buildFood${model}`);
    const food = await new db.food({
        name: model.name,
        userId: model.userId,
        normalExp: model.normalExp,
        vacuumExp: model.vacuumExp,
        expiryDate: model.expiryDate,
        type: model.type,
        qty: model.qty,
        image: model.image,
        // expireIn: model.expireIn,
        category: model.category,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return food;

};

const addFood = async (files, model, context) => {
    const log = context.logger.start("services:foods:addFood");
    if (files !== undefined && files.length > 1) {
        let fileName = files[0].filename.replace(/ /g, '') // remove space from string
        model.image = fileName
    }

    let user = await db.user.findById(model.userId)

    if (!user) {
        throw new Error(`this ${model.userId} user id not associate any user`);
    }

    const food = buildFood(model, context);
    log.end();
    return food;

};

const allFoods = async (query, context) => {
    const log = context.logger.start(`services:foods:allFoods`);

    let allFoods = await db.food.find({ userId: context.user.id, status: 'not-consumed' }).sort({ $natural: -1 })

    // allFoods.count = await db.food.find().count();
    log.end();
    return allFoods;
};

const foodById = async (id, context) => {
    const log = context.logger.start(`services:foods:foodById`);
    if (!id) {
        throw new Error("food id is required");
    }
    let food = await db.food.findById(id)
    if (!food) {
        throw new Error("food not found");
    }
    log.end();
    return food;
};

const foodsByUserId = async (id, context) => {
    const log = context.logger.start(`services:foods:foodsByUserId`);
    if (!id) {
        throw new Error("food id is required");
    }
    let food = await db.food.find({ userId: id, status: 'not-consumed' })
    if (!food) {
        throw new Error("food not found");
    }
    log.end();
    return food;
};

const deleteFood = async (id, context) => {
    const log = context.logger.start(`services:foods:deleteFood`);

    if (!id) {
        throw new Error("id is requried");
    }

    let food = await db.food.deleteOne({ _id: id });

    if (!food) {
        throw new Error("food not found");
    }
    log.end();
    return 'Food Deleted Successfully'
};

const updateFood = async (id, model, context) => {
    const log = context.logger.start(`services:foods:updateFood`);
    let entity = await db.food.findById(id)
    if (!entity) {
        throw new Error("invalid food");
    }
    const food = await setFood(model, entity, context);
    log.end();
    return food
};

const imageUpload = async (files, id, context) => {
    const log = context.logger.start(`services:foods:imageUpload`);

    let fileName  // remove space from string
    let file = files[0]

    if (files == undefined && files.length < 0) {
        throw new Error("image is required");
    }

    if (!id) {
        throw new Error(" food is required");
    }

    let food = await db.food.findById(id)

    if (!food) {
        throw new Error("food not found");
    }

    if (food.image !== undefined) {
        let path = file.destination + '/' + food.image
        try {
            await fs.unlinkSync(path);
            log.info(`image successfully removed from ${path}`);
        } catch (error) {
            log.error('there was an error to remove image:', error.message);
        }
    }

    else {
        fileName = files[0].filename.replace(/ /g, '')
        food.image = fileName
        await food.save()
    }

    log.end();
    return 'image uploaded successfully'
};

const searchFood = async (name, context) => {
    const log = context.logger.start(`services:foods:search`);
    if (!name) {
        throw new Error("name is required");
    }
    const foods = await db.food.find({ name: { "$regex": '.*' + name + '.*', "$options": 'i' }, userId: context.user.id, status: 'not-consumed' }).limit(5);
    log.end();
    return foods
};

const foodsByCategory = async (query, context) => {
    const log = context.logger.start(`services:recipes:foodsByCategory`);

    let allFoods = await db.food.aggregate(
        [{
            $match: { userId: ObjectId(context.user.id), status: 'not-consumed' }
        },

        { $group: { _id: "$category", foods: { $push: "$$ROOT" } } },
        {
            $project: {
                "_id": 0,
                "category": "$_id",
                "foods": "$foods"
            }
        }]
    );

    log.end();
    return allFoods;
};

const consumeFood = async (id, context) => {
    const log = context.logger.start(`services:foods:consumeFood`);
    let food = await db.food.findById(id)
    if (!food) {
        throw new Error("food not found");
    }
    food.status = "consumed"
    food = await food.save()
    log.end();
    return food
};


exports.addFood = addFood;
exports.foodById = foodById;
exports.searchFood = searchFood;
exports.foodsByUserId = foodsByUserId;
exports.allFoods = allFoods;
exports.deleteFood = deleteFood;
exports.updateFood = updateFood;
exports.imageUpload = imageUpload;
exports.foodsByCategory = foodsByCategory;
exports.consumeFood = consumeFood;

