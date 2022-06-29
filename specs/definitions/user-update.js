module.exports = [{
    name: "updateUser",
    properties: {
        name: {
            type: "string"
        },
        surName: {
            type: "string"
        },
        address: {
            type: "string"
        },
        status: {
            type: "string"
        },
        phone: {
            type: "string"
        },
        province: {
            type: "string"
        },
        postCode: {
            type: "string"
        },
        country: {
            type: "string"
        },
        status: {
            enum: ['active', 'inactive']
        },
        role: {
            enum: ['user', 'admin']
        },
    }
}];