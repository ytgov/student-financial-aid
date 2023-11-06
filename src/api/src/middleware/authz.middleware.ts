import { NextFunction, Request, Response } from "express";
import { GetVerificationKey, expressjwt } from "express-jwt";
import axios from "axios";
import { expressJwtSecret } from "jwks-rsa";
import { AUTH_DOMAIN, AUTH_AUDIENCE } from "../config";
import { UserService } from "../services";

//import { sqldb } from "../data";
//const db = new UserService(sqldb);

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

export function loadUser(req: Request, res: Response, next: NextFunction) {
  /* if (req.user.isAuthentiated && req.user) {
    req.user = req.oidc.user;
  }
 */
  return next();
}

/* 

export async function loadUser(req: Request, res: Response, next: NextFunction) {
  let sub = req.user.sub;
  const token = req.headers.authorization || "";

  //let u = await db.getBySub(sub);

  /* if (u) {
    req.user = { ...req.user, ...u };
    return next();
  } *

  await axios
    .get(`${AUTH0_DOMAIN}userinfo`, { headers: { authorization: token } })
    .then(async (resp) => {
      if (resp.data && resp.data.sub) {
        req.user = { ...req.user, ...resp.data };

        //let email = resp.data.email;

        //let subUser = await db.getBySub(resp.data.sub);

        /*  if (subUser) {
          req.user = { ...req.user, ...subUser };
          next();
        } else {
          let createUser = {
            email,
            sub,
            status: "Active",
            first_name: resp.data.given_name,
            last_name: resp.data.family_name,
            create_date: new Date(),
          };

          //await db.create(createUser);

          req.user = { ...req.user, ...createUser };

          next();
        } *
        next();
      }
    })
    .catch();
}
 */
