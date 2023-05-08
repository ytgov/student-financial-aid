import express, { Request, Response } from "express";
import _ from "lodash";
import { loadStudent, loadUser } from "../middleware";
import { ProxyService } from "../services/proxy-service";
//import { checkJwt, loadUser } from "../middleware/authz.middleware.ts-old";

export const portalRouter = express.Router();
portalRouter.use(loadUser);

const proxyService = new ProxyService();

portalRouter.get("/student", loadStudent, async (req: Request, res: Response) => {
  return res.json({ data: req.student });
});

portalRouter.post("/student", loadStudent, async (req: Request, res: Response) => {
  //console.log("CURRENT USER", req.user);
  console.log("CURRENT STUDENT", req.student);

  return res.json({ data: req.student });
});

portalRouter.use("*", async (req: Request, res: Response) => {
  //console.log("CURRENT USER", req.user);

  let response = await proxyService.proxy(req.baseUrl.replace("/api/portal", ""), req.method, req.body);

  if (response && response.data && response.data.data) {
    //console.log("PORT RESP", response.data.data);
    return res.json({ data: response.data.data });
  } else if (response && response.data) {
    //console.log("PORT RESP", response.data);
    return res.json({ data: response.data });
  } else if (response) {
    //console.log("PORT RESP", response);
    return res.json({});
  }
});
