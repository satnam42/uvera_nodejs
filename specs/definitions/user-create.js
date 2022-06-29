module.exports = [

    {
        name: "userCreate",
        properties: {
            name: {
                type: "string"
            },
            surName: {
                type: "string"
            },
            email: {
                type: "string"
            },
            password: {
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

            // loc: {
            //     properties: {
            //         type: 'array',
            //         // items: {
            //         properties: {
            //             coordinates: { type: 'number' }
            //         },

            //     }
            // }
        },
        // roleId: {
        //     type: "string"
        // },
    }

];