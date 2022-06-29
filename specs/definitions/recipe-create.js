module.exports = [

    {
        name: "recipeCreate",
        properties: {
            dishName: {
                type: "string"
            },
            directions: {
                type: "string"
            },
            prepTime: {
                type: "string"
            },
            totalTime: {
                type: "string"
            },
            foodId: {
                type: "string"
            },
            refLink: {
                type: "string"
            },

            other: {
                type: "string"
            },
            userId: {
                type: "string"
            },

            status: {
                enum: ['active', 'inactive']
            },
            expiryDate: {
                type: "date"
            },
            ingredinents: {

                type: 'array',
                items: {
                    type: 'string'
                }

            }
        }

    }

];