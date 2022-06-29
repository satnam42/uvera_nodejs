var wifi = require('node-wifi');

// Initialize wifi module
// Absolutely necessary even to set interface to null
wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null
});



const getWifiList = async (query, context) => {
    const log = context.logger.start(`services:wifi:getWifiList`);
    // Scan networks
    const networks = await wifi.scan()
    log.end();
    return networks


};

const connect = async (model, context) => {
    console.log('model', model)
    const log = context.logger.start("services:sensors:create");
    if (!model.ssid) {
        throw new Error("ssid Is required");
    }
    if (!model.password) {
        throw new Error("password Is required");
    }
    const isConnected = await wifi.connect({ ssid: model.ssid, password: model.password })
    log.end();
    return isConnected;

}






exports.getWifiList = getWifiList;
exports.connect = connect;
