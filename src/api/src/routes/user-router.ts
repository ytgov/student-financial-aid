import express, { Request, Response } from "express";
import _ from "lodash";
import { checkJwt, loadUser } from "../middleware/authz.middleware";

export const userRouter = express.Router();
userRouter.use(checkJwt, loadUser);

userRouter.get("/me", async (req: Request, res: Response) => {
  let person = req.user;
  //let me = await db.getByEmail(person.email);
  return res.json({ data: person });
});
