"use strict";
const service = require("../services/notifications");
const response = require("../exchange/response");

//add notification api
const create = async (req, res) => {
    const log = req.context.logger.start(`api:notifications:create`);
    try {
        const notification = await service.create(req.body, req.context);
        const message = "Notification added Successfully";
        log.end();
        return response.success(res, message, notification);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//get Notifications
const getNotificationsByUserId = async (req, res) => {
    const log = req.context.logger.start(`api:notifications:getNotifications`);
    try {
        const notification = await service.notificationsListByUserId(req.params.id, req.context);
        const message = "notifications fetched Successfully";
        log.end();
        return response.success(res, message, notification);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//delete Notification
const deleteNotification = async (req, res) => {
    const log = req.context.logger.start(`api:notifications:deleteUser`);
    try {
        const notification = await service.deleteNotification(req.body, req.context);
        log.end();
        return response.data(res, notification);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};



exports.create = create;
exports.getNotificationsByUserId = getNotificationsByUserId;
exports.deleteNotification = deleteNotification;

