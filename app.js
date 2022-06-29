"use strict";

const express = require("express");
const appConfig = require("config").get("app");
const logger = require("@open-age/logger")("server");
const Http = require("http");
const port = process.env.PORT || appConfig.port || 3000;
const app = express();
const job = require('./provider/jobSchedule')

var server = Http.createServer(app);
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
job.startjob({ logger })
const boot = () => {

    const log = logger.start("app:boot");
    log.info(`environment:  ${process.env.NODE_ENV}`);
    log.info("starting server");

    server.listen(port, () => {
        log.info(`listening on port: ${port}`);
        log.end();
    });

};

const init = async () => {
    await require("./settings/database").configure(logger);
    await require("./settings/express").configure(app, logger);
    await require("./settings/routes").configure(app, logger);
    boot();
};

init();