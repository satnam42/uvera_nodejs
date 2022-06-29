
const admin = require("firebase-admin");

const serviceAccount = require('../uvera-firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const send = async (deviceToken, title, body) => {
    const message = {
        notification: {
            title: title,
            body: body,
            sound: "default"
        }
    };
    try {
        let res = await admin.messaging().sendToDevice(deviceToken, message)
        // Response is a message ID string.
        console.log('Successfully sent message:', res);
    } catch (error) {
        console.log('Error sending message:', error);
    }

}

exports.send = send

