const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");


const setUser = (model, user, context) => {
    const log = context.logger.start("services:users:setUser");

    if (model.name !== "string" && model.name !== undefined) {
        user.name = model.name;
    }
    if (model.surName !== "string" && model.surName !== undefined) {
        user.surName = model.surName;
    }
    if (model.phone !== "string" && model.phone !== undefined) {
        user.phone = model.phone;
    }
    if (model.country !== "string" && model.country !== undefined) {
        user.country = model.country;
    }
    if (model.address !== "string" && model.address !== undefined) {
        user.address = model.address;
    }
    if (model.postCode !== "string" && model.postCode !== undefined) {
        user.postCode = model.postCode;
    }
    if (model.province !== "string" && model.province !== undefined) {
        user.province = model.province;
    }
    if (model.status !== "string" && model.status !== undefined) {
        user.status = model.status;
    }
    if (model.role !== "string" && model.role !== undefined) {
        user.role = model.role;
    }

    log.end();
    user.save();
    return user;

};
//register user

const buildUser = async (model, context) => {

    const { name, email, password, surName, province, postCode, phone, address, country, role } = model;
    const log = context.logger.start(`services:users:build${model}`);
    const user = await new db.user({
        name: name,
        email: email,
        password: password,
        email: email,
        surName: surName,
        province: province,
        postCode: postCode,
        phone: phone,
        address: address,
        country: country,
        role: role,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return user;
};

const create = async (model, context) => {
    const log = context.logger.start("services:users:create");
    const isEmail = await db.user.findOne({ email: { $eq: model.email } });
    if (isEmail) {
        throw new Error("Email already exists");
    } else {
        model.password = encrypt.getHash(model.password, context);
        const user = buildUser(model, context);
        log.end();
        return user;
    }
};

// login 
const login = async (model, context) => {
    const log = context.logger.start("services:users:login");
    const query = {};
    query.email = model.email
    let user = await db.user.findOne(query)
    if (!user) {
        log.end();
        throw new Error("user not found");
    }
    if (user.status === 'inactive') {
        throw new Error("user Is inactive please contect with admin");
    }
    const isMatched = encrypt.compareHash(model.password, user.password, context);
    if (!isMatched) {
        log.end();
        throw new Error("password mismatch");
    }
    const token = auth.getToken(user.id, false, context);
    user.token = token;
    user.deviceToken = model.deviceToken
    user.updatedOn = new Date();
    user.save();
    log.end();
    return user;
};

// change password

const changePassword = async (id, model, context) => {
    const log = context.logger.start(`service/users/changePassword`);
    if (!id) {
        throw new Error("user id is required");
    }
    let user = await db.user.findById(id)
    if (!user) {
        log.end();
        throw new Error("user is not found");
    }
    const isMatched = encrypt.compareHash(
        model.oldPassword,
        user.password,
        context
    );
    if (isMatched) {
        const newPassword = encrypt.getHash(model.newPassword, context);
        user.password = newPassword;
        user.updatedOn = new Date();
        await user.save();
        log.end();
        return "Password Updated Successfully";
    } else {
        log.end();
        throw new Error("Old Password Not Match");
    }
};

// getUsers
const getUsers = async (query, context) => {
    const log = context.logger.start(`services:users:getUsers`);
    let allUsers = await db.user.find()
    allUsers.count = await db.user.find().count();
    log.end();
    return allUsers;
};

const currentUser = async (id, model, context) => {
    const log = context.logger.start(`services:users:currentUser`);
    if (!id) {
        throw new Error("user id is required");
    }
    let user = await db.user.findById(id)
    if (!user) {
        throw new Error("user not found");
    }
    log.end();
    return user;
};


const deleteUser = async (id, context) => {
    const log = context.logger.start(`services:users:deleteUser`);

    if (!id) {
        throw new Error("id is requried");
    }

    let user = await db.user.deleteOne({ _id: id });

    if (!user) {
        throw new Error("user not found");
    }

    return 'User Deleted Successfully'
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:users:update`);
    let entity = await db.user.findById(id)
    if (!entity) {
        throw new Error("invalid user");
    }
    const user = await setUser(model, entity, context);
    log.end();
    return user
};

const search = async (name, context) => {
    const log = context.logger.start(`services:users:search`);
    if (!name) {
        throw new Error("name is required");
    }
    const users = await db.user.find({ name: { "$regex": '.*' + name + '.*', "$options": 'i' } }).limit(5);
    return users
};

const sendPassword = async (user, context) => {
    const log = context.logger.start('services/users/sendOtp')
    // four digit otp genration logic
    var digits = '0123456789';
    let randomDigits = '';

    for (let i = 0; i < 4; i++) {
        randomDigits += digits[Math.floor(Math.random() * 10)];
    }

    let password = user.name + randomDigits
    let hashPassword = encrypt.getHash(password, context);
    user.password = hashPassword
    await user.save()
    let message = `hi ${user.name} Your Temporary Password: <br>${password}</br>`
    let = subject = "Password"
    const isEmailSent = await sendMail(user.email, message, subject)
    if (!isEmailSent) {
        throw new Error('something went wrong')
    }
    // const otpToken = auth.getOtpToken(OTP, user.id, true, context)
    // log.end()
    // let data = {
    //     token: otpToken
    // }
    log.end()
    return user

}



const otpVerifyAndChangePassword = async (model, token, context) => {
    const log = context.logger.start('services/users/otpVerified')
    const otpDetail = await auth.extractToken(token, context)

    if (otpDetail.otp !== undefined && otpDetail.otp != model.otp) {
        throw new Error("please enter valid otp");;
    }
    if (otpDetail.otp.name === "TokenExpiredError") {
        throw new Error("otp expired");
    }
    if (otpDetail.otp.name === "JsonWebTokenError") {
        throw new Error("otp is invalid");
    }
    let user = context.user
    user = await db.user.findById(user.id);
    if (!user) {
        throw new Error("user not found");
    }
    const newPassword = encrypt.getHash(model.newPassword, context);
    user.password = newPassword;
    user.updatedOn = new Date();
    await user.save();
    log.end();
    return
}

// forgetPassword
const forgotPassword = async (model, context) => {
    const log = context.logger.start('services/users/forgotPassword')
    const user = await db.user.findOne({ email: { $eq: model.email } });
    if (!user) {
        throw new Error("The email address " + model.email + " is not associated with any account. Please check your email address and try again.");
    }
    // const data = await sendOtp(user, context)
    const data = await sendPassword(user, context)
    if (!data) {
        throw new Error('something went wrong')
    }
    log.end()
    return
}


const sendMail = async (email, message, subject) => {
    var smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: `javascript.mspl@gmail.com`,
            pass: `showmydev#$!45`
        }
    });
    // email send to registered email
    var mailOptions = {
        from: 'fastfile',
        to: email,
        subject: subject,
        html: message
    };

    let mailSent = await smtpTrans.sendMail(mailOptions)
    if (mailSent) {
        console.log("Message sent: %s", mailSent.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailSent));
        return true
    } else {
        throw new Error("Unable to send email try after sometime");
    }
}

exports.login = login;
exports.create = create;
exports.search = search;
exports.currentUser = currentUser;
exports.changePassword = changePassword;
exports.forgotPassword = forgotPassword;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.update = update;
exports.sendPassword = sendPassword;
exports.otpVerifyAndChangePassword = otpVerifyAndChangePassword;
