"use strict";
const service = require("../services/foods");
const response = require("../exchange/response");
const foodMapper = require("../mappers/food");

//create api
const create = async (req, res) => {
    const log = req.context.logger.start(`api:foods:create`);
    try {
        const food = await service.addFood(req.files, req.body, req.context);
        const message = "Food added Successfully";
        log.end();
        return response.success(res, message, foodMapper.toModel(food));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

// get food By Id  api

const getById = async (req, res) => {
    const log = req.context.logger.start(`api:foods:getById`);
    try {
        const food = await service.foodById(req.params.id, req.context);
        log.end();
        return response.data(res, foodMapper.toModel(food));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


// get food by user id 
const getByUserId = async (req, res) => {
    const log = req.context.logger.start(`api:foods:getByUserId`);
    try {
        const food = await service.foodsByUserId(req.params.id, req.context);
        log.end();
        return response.data(res, foodMapper.toModel(food));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


//get all foods api
const getAll = async (req, res) => {
    const log = req.context.logger.start(`api:foods:getAll`);
    try {
        const food = await service.allFoods(req.query, req.context);
        const message = "Food get Successfully";
        log.end();
        return response.success(res, message, foodMapper.toSearchModel(food));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//deleteFood api
const deleteFood = async (req, res) => {
    const log = req.context.logger.start(`api:foods:deleteFood`);
    try {
        const food = await service.deleteFood(req.params.id, req.context);
        log.end();
        return response.data(res, food);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//update food api
const update = async (req, res) => {
    const log = req.context.logger.start(`api:foods:update`);
    try {
        const food = await service.updateFood(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, food);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};



const upload = async (req, res) => {
    const log = req.context.logger.start(`api:foods:upload`);
    try {
        const food = await service.imageUpload(req.files, req.params.id, req.context);
        log.end();
        return response.data(res, food);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//search food api
const search = async (req, res) => {
    const log = req.context.logger.start(`api:foods:search:${req.query.name}`);
    try {
        const foods = await service.searchFood(req.query.name, req.context);
        log.end();
        return response.data(res, foodMapper.toSearchModel(foods));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

// get food group by category
const getFoodsByCategory = async (req, res) => {
    const log = req.context.logger.start(`api:recipes:getFoodByCategory`);
    try {
        const foods = await service.foodsByCategory(req.query, req.context);
        const message = "Foods get Successfully";
        log.end();
        return response.success(res, message, foodMapper.toSearchModel(foods));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//  food consume 
const consume = async (req, res) => {
    const log = req.context.logger.start(`api:foods:consume`);
    try {
        const food = await service.consumeFood(req.params.id, req.context);
        log.end();
        return response.data(res, food);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.getById = getById;
exports.create = create;
exports.search = search;
exports.update = update;
exports.getAll = getAll;
exports.deleteFood = deleteFood;
exports.getByUserId = getByUserId;
exports.upload = upload;
exports.getFoodsByCategory = getFoodsByCategory;
exports.consume = consume;
