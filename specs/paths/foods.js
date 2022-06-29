module.exports = [{
    url: "/create",
    post: {
        summary: "create",
        description: "create",
        parameters: [{
            in: "body",
            name: "body",
            description: "Model of food creation. Note category is Enum ,so enum value is  enum: ['REFRIGERATOR', 'PANTRY', 'FREEZER']",
            required: true,
            schema: {
                $ref: "#/definitions/foodCreate"
            }
        }],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},

{
    url: "/getById/{id}",
    get: {
        summary: "food By Id",
        description: " get food detail id ",
        parameters: [
            //     {
            //     in: "header",
            //     name: "x-access-token",
            //     description: "token to access api",
            //     required: true,
            //     type: "string"
            // },
            {
                in: "path",
                name: "id",
                description: "food id",
                required: true,
                type: "string"
            },
        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},
{
    url: "/update/{id}",
    put: {
        summary: "update",
        description: " update food by id ",
        parameters: [{
            in: "header",
            name: "x-access-token",
            description: "token to access api",
            required: true,
            type: "string"
        },
        {
            in: "path",
            name: "id",
            description: "food id",
            required: true,
            type: "string"
        },
        {
            in: "body",
            name: "body",
            description: "Model of updete  food",
            required: true,
            schema: {
                $ref: "#/definitions/foodUpdate"
            }
        }
        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},
{
    url: "/list",
    get: {
        summary: "list",
        description: "get all foods list",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },
        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},
{
    url: "/search",
    get: {
        summary: "search",
        description: "search food by dishName ",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },
            {
                in: "query",
                name: "name",
                description: "name",
                required: true,
                type: "string"
            },
        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},
{
    url: "/remove/{id}",
    delete: {
        summary: "delete",
        description: "delete food by id",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },
            {
                in: "path",
                type: "string",
                name: "id",
                description: "food id",
                required: true
            },],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},
{
    url: "/uploadImage/{id}",
    put: {
        summary: "upload image ",
        description: "upload food image using food id ",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },
            {
                in: "formData",
                name: "image",
                type: "file",
                description: "The file to upload.",
                required: true,
            },
            {
                in: "path",
                type: "string",
                name: "id",
                description: "food id",
                required: true
            }
        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},
{
    url: "/byCategory",
    get: {
        summary: "list",
        description: "get all foods according to category",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },
        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},
{
    url: "/consume/{id}",
    put: {
        summary: "consume",
        description: " consume food by id ",
        parameters: [{
            in: "header",
            name: "x-access-token",
            description: "token to access api",
            required: true,
            type: "string"
        },
        {
            in: "path",
            name: "id",
            description: "food id",
            required: true,
            type: "string"
        },

        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},

];