import { Express } from "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
    student?: any;
  }
}

/* 
namespace Express {
  export interface Request {
    user?: any;
    //store?: Storage;
  }
}
 */
