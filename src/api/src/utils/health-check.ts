import { Request, Response } from "express";
import { DB_HOST } from "../config";

export async function doHealthCheck(req: Request, res: Response) {
  let appHealth = [];

  //database check
  appHealth.push({
    name: "Database",
    status: "lme",
    loading: false,
    helpNotes: `Check that the databases is running at: ${DB_HOST}`
  });

  res.json({ appHealth });
}
