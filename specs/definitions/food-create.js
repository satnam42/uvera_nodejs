module.exports = [

    {
        name: "foodCreate",
        properties: {
            name: {
                type: "string"
            },
            type: {
                type: "string"
            },
            normalExp: {
                type: "string"
            },
            vacuumExp: {
                type: "string"
            },
            expiryDate: {
                type: "date"
            },
            // normalExp: {
            //     properties: {
            //         type: {
            //             type: "string"
            //             // enum: ["month", "months", "year", "yeras", "week", "weeks"]

            //         },
            //         number: {
            //             type: "number",
            //         }
            //     }
            // },
            // vacuumExp: {
            //     properties: {
            //         type: {
            //             type: "string"
            //             // enum: ["month", "months", "year", "yeras", "week", "weeks"]
            //         },
            //         number: {
            //             type: "number",
            //         }
            //     }
            // },
            qty: {
                type: "number"
            },
            category: {
                type: "string"
            },
            userId: {
                type: "string"
            },
            // ingredinents: {

            //     type: 'array',
            //     items: {
            //         type: 'string'
            //     }

            // }
        }

    }

];