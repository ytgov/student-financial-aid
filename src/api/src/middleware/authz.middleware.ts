import { Request } from "express";
import { GetVerificationKey, expressjwt } from "express-jwt";
import axios from "axios";
import { expressJwtSecret } from "jwks-rsa";
import { AUTH_DOMAIN, AUTH_AUDIENCE } from "../config";

export const checkJwt = expressjwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${AUTH_DOMAIN}.well-known/jwks.json`,
  }) as GetVerificationKey,
  //secret: "secret value",
  // Validate the audience and the issuer.
  audience: AUTH_AUDIENCE,
  issuer: [AUTH_DOMAIN],
  algorithms: ["RS256"],
  requestProperty: "user",
});

export async function loadAuth0User(req: Request) {
  const token = req.headers.authorization || "";

  return axios
    .get(`${AUTH_DOMAIN.replace(/\/$/, "")}/userinfo`, { headers: { authorization: token } })
    .then((resp) => {
      return resp.data;
    })
    .catch(() => {
      return {};
    });
}
