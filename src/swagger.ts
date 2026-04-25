import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prisma Template API",
      version: "1.0.0",
      description: "REST API documentation for the Prisma Template project",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              nullable: true,
              example: "Alice",
            },
            email: {
              type: "string",
              format: "email",
              example: "alice@example.com",
            },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              example: "USER",
            },
          },
          required: ["id", "email", "role"],
        },
        CreateUserInput: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "alice@example.com",
            },
            name: {
              type: "string",
              nullable: true,
              example: "Alice",
            },
          },
          required: ["email"],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "User not found",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
