"use strict";
const service = require("../services/sensors");
const response = require("../exchange/response");

//add sensor api
const create = async (req, res) => {
    const log = req.context.logger.start(`api:sensors:create`);
    try {
        const sensor = await service.create(req.body, req.context);
        const message = "sensor added Successfully";
        log.end();
        return response.success(res, message, sensor);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//getSensors
const getSensors = async (req, res) => {
    const log = req.context.logger.start(`api:sensors:getSensors`);
    try {
        const sensor = await service.getSensors(req.body, req.context);
        const message = "sensors get Successfully";
        log.end();
        return response.success(res, message, sensor);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//delete Sensor
const deleteSensor = async (req, res) => {
    const log = req.context.logger.start(`api:sensors:deleteSensor`);
    try {
        const sensor = await service.deleteSensor(req.params.id, req.context);
        log.end();
        return response.data(res, sensor);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//update sensor
const update = async (req, res) => {
    const log = req.context.logger.start(`api:sensors:update`);
    try {
        const sensor = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, sensor);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.create = create;
exports.getSensors = getSensors;
exports.deleteSensor = deleteSensor;
exports.update = update;

