import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ProxyService } from "../services/proxy-service";

const proxyService = new ProxyService();

export async function ReturnValidationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

export function RequiresAuthentication(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.isAuthentiated()) {
    return next();
  }

  res.redirect("/api/auth/login");
}

export function loadUser(req: Request, res: Response, next: NextFunction) {
  if (req.oidc.isAuthenticated() && req.oidc.user) {
    req.user = req.oidc.user;
  }

  return next();
}

export async function loadStudent(req: Request, res: Response, next: NextFunction) {
  if (req.oidc.isAuthenticated() && req.oidc.user) {
    return proxyService
      .proxy(`/student/${req.oidc.user.sub}`, "get")
      .then((resp) => {
        //console.log("DATA", resp.data.data)
        req.student = resp.data.data;
      })
      .catch((err) => {
        console.log("IN ERROR", err.response);
      })
      .finally(() => {
        next();
      });
  }
}
