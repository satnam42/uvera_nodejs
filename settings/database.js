"use strict";
const dbConfig = require("config").get("db");
const mongoose = require("mongoose");

const configure = async logger => {
    const log = logger.start(`settings:database:configure`);
    let options = {
        user: "superadmin",
        pass: "SuperAdmin@2021"
    };
    try {
        await mongoose.connect(dbConfig.url + "/" + dbConfig.database + '?authSource=admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`mongoose default connection is open to ${dbConfig.url}`);
        await require("../models").configure();
        global.db = mongoose.models;
        log.end();
    } catch (err) {

        log.error(`unable to create mongo connection to ${dbConfig.url}`);
        throw new Error(err.message);
        // log.error(err);

    }
};

exports.configure = configure;