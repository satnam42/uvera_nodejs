const user = require("../models/user");


const buildNotification = async (model, context) => {
    const log = context.logger.start(`services:notifications:build${model}`);
    const notification = await new db.notification({
        title: model.title,
        message: model.message,
        user: model.userId,
        food: model.foodId
    }).save();
    log.end();
    return notification;
};

const create = async (model, context) => {
    const log = context.logger.start("services:notifications:create");
    const isNotification = await db.notification.findOne({ food: model.foodId });
    if (isNotification) {
        throw new Error("Notification already exists");
    } else {
        const notification = buildNotification(model, context);
        log.end();
        return notification;
    }

};

const notificationsListByUserId = async (userId, context) => {
    const log = context.logger.start(`services:notifications:notificationsListByUserId`);
    if (!userId) {
        throw new Error('user is required')
    }
    let notifications = await db.notification.find({ user: userId }).populate('food')
    notifications.count = await db.notification.find({ user: userId }).count();
    log.end();
    return notifications;
};

const deleteNotification = async (model, context) => {
    const log = context.logger.start(`services:notifications:deleteNotification`);
    if (!model.foodId) {
        throw new Error("food id is required");
    }
    if (!model.userId) {
        throw new Error("user id is required");
    }
    let notification = await db.notification.deleteOne({ user: model.userId, food: model.foodId });
    if (!notification) {
        throw new Error("notification not found");
    }
    return notification
};



exports.create = create;
exports.notificationsListByUserId = notificationsListByUserId;
exports.deleteNotification = deleteNotification;
