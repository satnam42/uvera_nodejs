module.exports = [
    {
        url: "/connect",
        post: {
            summary: "connect",
            description: "connect with wifi",
            parameters: [{
                in: "body",
                name: "body",
                description: "Model of wifi connection",
                required: true,
                schema: {
                    $ref: "#/definitions/wifiConnect"
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
        url: "/list",
        get: {
            summary: "list",
            description: "Just hit the api without pass any param",
            parameters: [

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