const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");


const setSensor = (model, sensor, context) => {
    const log = context.logger.start("services:sensors:set");
    if (model.foodId !== "string" && model.foodId !== undefined) {
        sensor.foodId = model.foodId;
    }

    log.end();
    sensor.save();
    return sensor;

};
//buildSensor 

const buildSensor = async (model, context) => {
    const log = context.logger.start(`services:sensors:build${model}`);
    const sensor = await new db.sensor({
        sensorId: model.sensorId,
        foodId: model.foodId,
    }).save();
    log.end();
    return sensor;
};

const create = async (model, context) => {
    const log = context.logger.start("services:sensors:create");
    const isSensor = await db.sensor.findOne({ sensorId: model.sensorId });
    if (isSensor) {
        throw new Error("Sensor already exists");
    } else {
        const sensor = buildSensor(model, context);
        log.end();
        return sensor;
    }

};


// getSensors
const getSensors = async (query, context) => {
    const log = context.logger.start(`services:sensors:getSensors`);
    let allSensors = await db.sensor.find()
    allSensors.count = await db.sensor.find().count();
    log.end();
    return allSensors;
};

const deleteSensor = async (id, context) => {
    const log = context.logger.start(`services:sensors:deleteSensor`);

    if (!id) {
        throw new Error("id is requried");
    }

    let sensor = await db.sensor.deleteOne({ _id: id });

    if (!sensor) {
        throw new Error("sensor not found");
    }

    return 'Sensor Deleted Successfully'
};
const update = async (id, model, context) => {
    const log = context.logger.start(`services:sensors:update`);
    let entity = await db.sensor.findById(id)
    if (!entity) {
        throw new Error("invalid sensor");
    }
    const sensor = await setSensor(model, entity, context);
    log.end();
    return sensor
};


exports.create = create;
exports.getSensors = getSensors;
exports.deleteSensor = deleteSensor;
exports.update = update;
