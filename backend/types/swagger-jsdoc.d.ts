// filepath: c:\Users\Ahmed\Documents\GitHub\BachelorTBS\backend\types\swagger-jsdoc.d.ts
declare module 'swagger-jsdoc' {
  interface SwaggerDefinition {
    openapi: string;
    info: {
      title: string;
      version: string;
      description: string;
    };
    servers: Array<{
      url: string;
    }>;
  }

  interface SwaggerOptions {
    definition: SwaggerDefinition;
    apis: string[];
  }

  interface SwaggerSpec {
    paths: Record<string, unknown>;
    components?: Record<string, unknown>;
    [key: string]: unknown; // Use `unknown` for additional properties
  }

  const swaggerJSDoc: (options: SwaggerOptions) => SwaggerSpec;
  export default swaggerJSDoc;
}