import express, { Request, Response } from "express";
import _ from "lodash";
//import { checkJwt, loadUser } from "../middleware/authz.middleware.ts-old";

export const applicationRouter = express.Router();
//applicationRouter.use(checkJwt, loadUser);

applicationRouter.get("/me", async (req: Request, res: Response) => {
  let person = req.user;
  return res.json({ data: person });
});
