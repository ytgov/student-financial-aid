import { Request, Response } from "express";

export async function doHealthCheck(req: Request, res: Response) {
  let appHealth = [];

  //database check
  appHealth.push({
    name: "Database",
    status: "lme",
    loading: false,
  });

  res.json({ appHealth });
}
