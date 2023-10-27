import express, { Request, Response } from "express";
import { requiresAuth } from "express-openid-connect";
import { FRONTEND_URL } from "../config";

export const authRouter = express.Router();

authRouter.get("/login", requiresAuth(), async (req: Request, res: Response) => {
  res.redirect(`${FRONTEND_URL}/callback`);
});

authRouter.get("/callback", async (req: Request, res: Response) => {
  res.redirect(`${FRONTEND_URL}/callback`);
});

authRouter.get("/logout", async (req: Request, res: Response) => {
  req.session.destroy(() => {});
  res.status(401);
  res.oidc.logout({ returnTo: FRONTEND_URL });
});
