const cron = require('node-cron');
const moment = require('moment')
const pushNotification = require('../services/pushNotification')
const notification = require('../services/notifications');
const user = require('../models/user');



const startjob = (context) => {
    let startDate = new Date() // current date 
    const numberOfDaysToAdd = 2;
    let endDate = startDate
    endDate.setDate(endDate.getDate() + numberOfDaysToAdd);

    const dat = {
        $gte: moment(startDate, 'DD-MM-YYYY').startOf('day').toDate(),
        $lt: moment(endDate, 'DD-MM-YYYY').endOf('day').toDate(),
    }

    // job start on every morning 9 am 
    cron.schedule('01 09 * * * ', async () => {
        console.log('Running Cron Job');
        const foods = await db.food.find({ expiryDate: dat, }).populate('userId')
        for (const food of foods) {
            if (food && food.user.deviceToken && food.user.deviceToken !== undefined) {
                console.log(`your food  ${food.name} is expire on ${moment(food.expiryDate).format('MM/DD/YYYY')}`)
                try {
                    notification.create({
                        title: food.name,
                        message: `your food  ${food.name} is expire on ${moment(food.expiryDate).format('MM/DD/YYYY')}`,
                        foodId: food.id,
                        userId: food.userId
                    }, context)
                    pushNotification.send(food.user.deviceToken, food.name, `your food  ${food.name} is expire on ${moment(food.expiryDate).format("MMM Do YY")}`)
                } catch (error) {
                    console.log("Notification Error", error)
                }
            }
        }
    });
}




exports.startjob = startjob