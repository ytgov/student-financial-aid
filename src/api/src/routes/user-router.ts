import express, { NextFunction, Request, Response } from "express";
import { requiresAuth } from "express-openid-connect";
import _ from "lodash";
//import { checkJwt, loadUser } from "../middleware/authz.middleware.ts-old";

export const userRouter = express.Router();
//userRouter.use(checkJwt, loadUser);

function test(req: Request, res: Response, next: NextFunction) {
  if (!req.oidc.isAuthenticated()) return res.status(401).send("You are not authenticated");

  //console.log("IS AUTH", req.oidc.isAuthenticated());
  next();
}

userRouter.get("/me", test, async (req: Request, res: Response) => {
  let person = req.oidc.user;
  //(person as any).student_id = 1233;

  return res.json({ data: { ...person, student: req.student } });
});
