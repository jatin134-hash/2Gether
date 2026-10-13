import jwt from "jsonwebtoken";
import { AUTH_COOKIE_NAME, clearAuthCookie } from "../config/authCookie.js";

export function authenticate(req, res, next) {
  const authorization = req.get("authorization");
  const authParts = authorization?.trim().split(" ").filter(Boolean) ?? [];
  const bearerToken =
    authParts.length === 2 && authParts[0].toLowerCase() === "bearer"
      ? authParts[1]
      : null;
  const token = bearerToken || req.cookies?.[AUTH_COOKIE_NAME];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token required.",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (typeof payload === "string" || typeof payload.sub !== "string") {
      clearAuthCookie(res);
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    req.auth = { userId: payload.sub };
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      clearAuthCookie(res);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token.",
      });
    }

    console.error("Authentication middleware failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}
