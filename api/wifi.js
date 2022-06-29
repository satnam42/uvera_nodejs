"use strict";
const service = require("../services/wifi");
const response = require("../exchange/response");
//add sensor api

const makeConnection = async (req, res) => {
    const log = req.context.logger.start(`api:wifi:makeConnection`);
    try {
        const connected = await service.connect(req.body, req.context);
        const message = "connected Successfully";
        log.end();
        return response.success(res, message, connected);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const wifiList = async (req, res) => {
    const log = req.context.logger.start(`api:wifi:getSensors`);
    try {
        const wifi = await service.getWifiList(req.body, req.context);
        const message = "wifi fetched Successfully";
        log.end();
        return response.success(res, message, wifi);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.wifiList = wifiList;
exports.makeConnection = makeConnection;

