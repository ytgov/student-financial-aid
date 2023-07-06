import axios from "axios";
import { PROXY_BASE_URL } from "../config";
import * as Sentry from "@sentry/node";

export class ProxyService {
  constructor() {}

  async proxy(path: string, method: string, data: any = undefined): Promise<any> {
    //console.log("PROXY TO", `${PROXY_BASE_URL}${path}`, method);

    return axios
      .request({ url: `${PROXY_BASE_URL}${path}`, data, method })
      .then((resp) => resp)
      .catch((e) => {
        Sentry.captureException(e);
        return undefined;
      });
  }

  async fileProxy(path: string, method: string, data: any = undefined): Promise<any> {
    //console.log("FILE PROXY TO", `${PROXY_BASE_URL}${path}`, method, data);

    return axios
      .request({ url: `${PROXY_BASE_URL}${path}`, data, method, headers: { "Content-Type": "multipart/form-data" } })
      .then((resp) => resp)
      .catch((e) => {
        Sentry.captureException(e);
        return undefined;
      });
  }
}
