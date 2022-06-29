module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "create",
            parameters: [{
                in: "body",
                name: "body",
                description: "Model of recipe creation",
                required: true,
                schema: {
                    $ref: "#/definitions/recipeCreate"
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
            summary: "recipe By Id",
            description: " get recipe detail id ",
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
                    description: "recipe id",
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
            description: " update recipe by id ",
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
                description: "recipe id",
                required: true,
                type: "string"
            },
            {
                in: "body",
                name: "body",
                description: "Model of updete  recipe",
                required: true,
                schema: {
                    $ref: "#/definitions/recipeCreate"
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
            description: "get all recipes list",
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
            description: "search recipe by dishName ",
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
        url: "/delete/{id}",
        delete: {
            summary: "delete",
            description: "delete recipe by id",
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
                    description: "recipe id",
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
        url: "/byFood/{id}",
        get: {
            summary: "recipe By food Id",
            description: " get recipe detail by food id ",
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
        url: "/myRecipe/{id}",
        get: {
            summary: "My Recipe",
            description: " get recipes by user id ",
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
                    name: "id",
                    description: "user id",
                    required: true,
                    type: "string"
                },
                {
                    in: "query",
                    name: "fav",
                    description: "fav",
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
        url: "/uploadImage/{id}",
        put: {
            summary: "upload image ",
            description: "upload recipe image using recipe id ",
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
                    description: "recipe id",
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
        url: "/favOrUnFav",
        post: {
            summary: "favOrUnFav",
            description: " fav or unfav recipe",
            parameters: [{
                in: "body",
                name: "body",
                description: "Model of fav creation",
                required: true,
                schema: {
                    $ref: "#/definitions/addFav"
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


];