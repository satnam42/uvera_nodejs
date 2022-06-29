"use strict";
const service = require("../services/recipes");
const response = require("../exchange/response");
const recipeMapper = require("../mappers/recipe");

//create api

const create = async (req, res) => {
    const log = req.context.logger.start(`api:recipes:create`);
    try {
        const recipe = await service.addRecipe(req.body, req.context);
        const message = "Recipe added Successfully";
        log.end();
        return response.success(res, message, recipe);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};




// get recipe By Id  api

const getById = async (req, res) => {
    const log = req.context.logger.start(`api:recipes:getById`);
    try {
        const recipe = await service.recipeById(req.params.id, req.context);
        log.end();
        return response.data(res, recipeMapper.toModel(recipe));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


// get recipe by user id 

const getByUserId = async (req, res) => {
    const log = req.context.logger.start(`api:recipes:getByUserId`);
    try {
        const recipes = await service.recipesByUserId(req.params.id, req.query, req.context);
        log.end();
        return response.data(res, recipeMapper.toSearchModel(recipes));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getRecipesByFoodId = async (req, res) => {
    const log = req.context.logger.start(`api:recipes:getRecipeByFoodId`);
    try {
        const recipes = await service.recipesByFoodId(req.params.id, req.context);
        log.end();
        return response.data(res, recipeMapper.toSearchModel(recipes));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//get all recipes api

const getAll = async (req, res) => {
    const log = req.context.logger.start(`api:recipes:getAll`);
    try {
        const recipes = await service.allRecipes(req.query, req.context);
        const message = "Recipe get Successfully";
        log.end();
        return response.success(res, message, recipeMapper.toSearchModel(recipes));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


//deleteRecipe api

const deleteRecipe = async (req, res) => {
    const log = req.context.logger.start(`api:recipes:deleteRecipe`);
    try {
        const recipe = await service.deleteRecipe(req.params.id, req.context);
        log.end();
        return response.data(res, recipe);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//update recipe api

const update = async (req, res) => {
    const log = req.context.logger.start(`api:recipes:update`);
    try {
        const recipe = await service.updateRecipe(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, recipe);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//search recipe api

const search = async (req, res) => {
    const log = req.context.logger.start(`api:recipes:search:${req.query.name}`);
    try {
        const recipes = await service.searchRecipe(req.query.name, req.context);
        log.end();
        return response.data(res, recipeMapper.toSearchModel(recipes));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
//upload image api
const upload = async (req, res) => {
    const log = req.context.logger.start(`api:recipes:upload`);
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

const favOrUnFav = async (req, res) => {
    const log = req.context.logger.start(`api:recipes:favOrUnFav`);
    try {
        const recipe = await service.makeFavOrUnFav(req.body, req.context);
        log.end();
        return response.data(res, recipe);
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
exports.deleteRecipe = deleteRecipe;
exports.getByUserId = getByUserId;
exports.upload = upload;
exports.getRecipesByFoodId = getRecipesByFoodId;
exports.favOrUnFav = favOrUnFav;
