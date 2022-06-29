"use strict";

const fs = require("fs");
const api = require("../api");
const specs = require("../specs");
const permit = require("../permit")
const validator = require("../validators");

const configure = (app, logger) => {
    const log = logger.start("settings:routes:configure");
    app.get("/specs", function (req, res) {
        fs.readFile("./public/specs.html", function (err, data) {
            if (err) {
                return res.json({
                    isSuccess: false,
                    error: err.toString()
                });
            }
            res.contentType("text/html");
            res.send(data);
        });
    });

    app.get('/wifi', function (req, res) {
        fs.readFile('./templetes/index.html', function (err, data) {
            if (err) {
                return res.json({
                    isSuccess: false,
                    error: err.toString()
                });
            }
            res.contentType("text/html");
            res.send(data);
        });
    });
    app.get("/api/specs", function (req, res) {
        res.contentType("application/json");
        res.send(specs.get());
    });

    //user api's //
    app.post(
        "/api/users/create",
        permit.context.builder,
        validator.users.create,
        api.users.create
    );

    app.post(
        "/api/users/login",
        permit.context.builder,
        validator.users.login,
        api.users.login
    );

    app.get(
        "/api/users/currentUser/:id",
        permit.context.validateToken,
        api.users.currentUser
    );

    app.put(
        "/api/users/changePassword/:id",
        permit.context.validateToken,
        api.users.changePassword,
        validator.users.changePassword,
    );
    app.get(
        "/api/users/search",
        permit.context.validateToken,
        api.users.search
    );

    app.post(
        "/api/users/forgotPassword",
        permit.context.builder,
        api.users.forgotPassword
    );
    app.put(
        "/api/users/update/:id",
        permit.context.validateToken,
        api.users.update
    );


    app.get(
        "/api/users/getUsers",
        permit.context.validateToken,
        api.users.getUsers
    );

    app.post(
        "/api/users/otpVerifyAndChangePassword",
        permit.context.validateToken,
        api.users.otpVerifyAndChangePassword
    );

    //recipe api's //

    app.post(
        "/api/recipes/create",
        permit.context.builder,
        api.recipes.create
    );

    app.get(
        "/api/recipes/getById/:id",
        permit.context.builder,
        api.recipes.getById
    );

    app.get(
        "/api/recipes/myRecipe/:id",
        permit.context.validateToken,
        api.recipes.getByUserId
    );
    app.get(
        "/api/recipes/byFood/:id",
        permit.context.validateToken,
        api.recipes.getRecipesByFoodId
    );

    app.put(
        "/api/recipes/update/:id",
        permit.context.validateToken,
        api.recipes.update,
    );
    app.get(
        "/api/recipes/list",
        permit.context.validateToken,
        api.recipes.getAll
    );

    app.get(
        "/api/recipes/search",
        permit.context.validateToken,
        api.recipes.search
    );

    app.delete(
        "/api/recipes/remove/:id",
        permit.context.validateToken,
        api.recipes.deleteRecipe
    );

    app.put(
        "/api/recipes/uploadImage/:id",
        permit.context.validateToken,
        api.recipes.upload,
    );

    app.post(
        "/api/recipes/favOrUnFav",
        permit.context.builder,
        api.recipes.favOrUnFav
    );
    // food' api's //

    app.post(
        "/api/foods/create",
        permit.context.builder,
        api.foods.create
    );

    app.get(
        "/api/foods/getById/:id",
        permit.context.builder,
        api.foods.getById
    );

    app.put(
        "/api/foods/update/:id",
        permit.context.validateToken,
        api.foods.update,
    );

    app.put(
        "/api/foods/uploadImage/:id",
        permit.context.validateToken,
        api.foods.upload,
    );

    app.get(
        "/api/foods/list",
        permit.context.validateToken,
        api.foods.getAll
    );

    app.get(
        "/api/foods/search",
        permit.context.validateToken,
        api.foods.search
    );

    app.delete(
        "/api/foods/remove/:id",
        permit.context.validateToken,
        api.foods.deleteFood
    );

    app.get(
        "/api/foods/byCategory",
        permit.context.validateToken,
        api.foods.getFoodsByCategory
    );
    app.put(
        "/api/foods/consume/:id",
        permit.context.validateToken,
        api.foods.consume,
    );
    //sensor api's //

    app.post(
        "/api/sensors/create",
        permit.context.builder,
        api.sensors.create
    );

    app.put(
        "/api/sensors/update/:id",
        permit.context.validateToken,
        api.sensors.update,
    );

    app.get(
        "/api/sensors/list",
        permit.context.validateToken,
        api.sensors.getSensors
    );

    app.delete(
        "/api/sensors/remove/:id",
        permit.context.validateToken,
        api.sensors.deleteSensor
    );

    app.post(
        "/api/wifi/connect",
        permit.context.builder,
        api.wifi.makeConnection
    );
    app.get(
        "/api/wifi/list",
        permit.context.builder,
        api.wifi.wifiList
    );

    app.get(
        "/api/notifications/byUserId/:id",
        permit.context.validateToken,
        api.notifications.getNotificationsByUserId
    );
    log.end();
};

exports.configure = configure;