import swaggerJSDoc from "swagger-jsdoc"
import { config } from "./envConfig.js";
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ImageGram API Docs',
      version: '1.0.0',
      description: 'API documentation for Node.js application',
    },
    servers: [
      {
        url: `${config.server.host}/api/v1`,
        description: "dev server"
      },
      {
        url: `${config.server.host}`,
        description: "root server"
      }
    ],
    paths:{
      
    }
  },
  apis: ['./src/routers/v1/*.js'], // Path to the API routes
};
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;