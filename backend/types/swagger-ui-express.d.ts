// filepath: c:\Users\Ahmed\Documents\GitHub\BachelorTBS\backend\types\swagger-ui-express.d.ts
declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express';

  interface SwaggerUiOptions {
    customCss?: string;
    customJs?: string;
    customfavIcon?: string;
    customSiteTitle?: string;
  }

  export const serve: RequestHandler;
  export function setup(
    swaggerDoc: Record<string, unknown>, // Use `unknown` instead of `any`
    options?: SwaggerUiOptions
  ): RequestHandler;
}