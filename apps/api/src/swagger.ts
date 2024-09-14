import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Firewall API Documentation',
      version: '1.0.0',
      description: 'API documentation for the firewall project',
      contact: {
        name: 'Support',
        url: 'http://localhost',
        email: 'support@localhost.com',
      },
      servers: [
        {
          url: `http://localhost:3001`,
          description: 'Development server',
        },
      ],
    },
  },
  // Include both JS and TS route files
  apis: [`${__dirname}/routes/auth.route.{js,ts}`], 
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
