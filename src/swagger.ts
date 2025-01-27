import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import "dotenv/config";
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for requests",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/commands/*.ts", "./src/queries/*.ts", "./src/swagger/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * Use swagger-ui-express to serve the API documentation
 * @param {Application} app
 */
export const setupSwagger = (app: Application) => {
  app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
