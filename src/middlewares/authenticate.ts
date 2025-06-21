import { expressjwt } from "express-jwt";
import { Request } from "express";
import { AuthCookie } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "dev-super-secret";

export default expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],  // ✅ this MUST match what you used to sign the token
  getToken(req: Request) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.split(" ")[1] !== "undefined") {
      return authHeader.split(" ")[1];
    }

    const { accessToken } = req.cookies as AuthCookie;
    return accessToken;
  },
});
