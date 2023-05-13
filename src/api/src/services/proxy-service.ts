import axios from "axios";
import { PROXY_BASE_URL } from "../config";

export class ProxyService {
  constructor() {}

  async proxy(path: string, method: string, data: any = undefined): Promise<any> {
    console.log("PROXY TO", `${PROXY_BASE_URL}${path}`, method);

    return axios
      .request({ url: `${PROXY_BASE_URL}${path}`, data, method })
      .then((resp) => resp)
      .catch((e) => {
        console.log("ERROR: PortalService.proxy", e);
        return undefined;
      });
  }
}
