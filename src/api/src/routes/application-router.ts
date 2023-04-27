import express, { Request, Response } from "express";
import { RequiresData } from "../middleware";
import _ from "lodash";
import { checkJwt, loadUser } from "../middleware/authz.middleware";

export const applicationRouter = express.Router();
applicationRouter.use(RequiresData);
applicationRouter.use(checkJwt, loadUser);

applicationRouter.get("/me", async (req: Request, res: Response) => {
  let person = req.user;
  return res.json({ data: person });
});
