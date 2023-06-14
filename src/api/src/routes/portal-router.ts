import express, { Request, Response } from "express";
import { loadStudent, loadUser } from "../middleware";
import { PROXY_BASE_URL } from "../config";
import { ProxyService } from "../services/proxy-service";

import { createProxyMiddleware } from "http-proxy-middleware";
import { isArray } from "lodash";

export const portalRouter = express.Router();
portalRouter.use(loadUser);

const proxyService = new ProxyService();

portalRouter.get("/student", loadStudent, async (req: Request, res: Response) => {
  return res.json({ data: req.student });
});

portalRouter.post("/student", loadStudent, async (req: Request, res: Response) => {
  //console.log("CURRENT USER", req.user);
  //console.log("CURRENT STUDENT", req.student);

  return res.json({ data: req.student });
});

portalRouter.post("/application/:sub/:draftId/upload", async (req: Request, res: Response) => {
  if (req.files) {
    let file = isArray(req.files.file) ? req.files.file[0] : req.files.file;

    let f = new FormData();
    f.append("file", new Blob([file.data]), file.name);
    f.append("mimetype", file.mimetype);

    for (let b in req.body) {
      f.append(b, req.body[b]);
    }

    let response = await proxyService.fileProxy(req.originalUrl.replace("/api/portal", ""), req.method, f);

    if (response && response.data && response.data.data) {
      return res.json({ data: response.data.data });
    } else if (response && response.data) {
      return res.json({ data: response.data });
    } else if (response) {
      return res.json({});
    }
  }

  res.status(404).send();
});

portalRouter.post("*", async (req: Request, res: Response) => {
  let response = await proxyService.proxy(req.originalUrl.replace("/api/portal", ""), req.method, req.body);

  if (response && response.data && response.data.data) return res.json({ data: response.data.data });
  else if (response && response.data) return res.json({ data: response.data });
  else if (response) return res.json({});
});

portalRouter.put("*", async (req: Request, res: Response) => {
  let response = await proxyService.proxy(req.originalUrl.replace("/api/portal", ""), req.method, req.body);

  if (response && response.data && response.data.data) return res.json({ data: response.data.data });
  else if (response && response.data) return res.json({ data: response.data });
  else if (response) return res.json({});
});

function proxyLogger(proxy: any, req: Request, res: Response) {
  console.log("PROXYMIDDLEWARE", req.url, req.method);
}

portalRouter.use(
  "*",
  createProxyMiddleware({
    target: PROXY_BASE_URL.replace("/api/portal", ""),
    changeOrigin: true,
    secure: false,
    //onProxyReq: proxyLogger,
  })
);

/* 
portalRouter.use("*", async (req: Request, res: Response) => {
  //console.log("CURRENT USER", req.user);

  if (req.files) {
    let file = isArray(req.files.file) ? req.files.file[0] : req.files.file;

    let f = new FormData();
    f.append("file", new Blob([file.data]), file.name);
    f.append("mimetype", file.mimetype);

    for (let b in req.body) {
      f.append(b, req.body[b]);
    }

    let response = await proxyService.fileProxy(req.baseUrl.replace("/api/portal", ""), req.method, f);

    //console.log(response)

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
  } else {
    let response = await proxyService.proxy(req.baseUrl.replace("/api/portal", ""), req.method, req.body);

    if (
      response &&
      response.headers &&
      response.headers["content-type"] &&
      response.headers["content-type"].indexOf("application/json") == -1
    ) {
      console.log("LOOKS LIKE A FILE!", response.headers["content-type"], response.headers["content-disposition"]);

      console.log(response)

      
      res.set("Content-disposition", response.headers["content-disposition"]);
      res.set("Content-type", response.headers["content-type"]);
      return res.send(response.data);


    }

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
  }
});
 */
