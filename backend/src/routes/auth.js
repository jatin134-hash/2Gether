import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { clearAuthCookie, setAuthCookie } from "../config/authCookie.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordHashRounds = 12;

function createToken(userId) {
  return jwt.sign({}, process.env.JWT_SECRET, {
    algorithm: "HS256",
    subject: userId,
    expiresIn: "1h",
  });
}

function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

function isDuplicateKeyError(error) {
  return error?.code === 11000;
}

function isValidationError(error) {
  return error?.name === "ValidationError";
}

function sendAuthenticatedResponse(res, status, user) {
  setAuthCookie(res, createToken(user.id));
  return res.status(status).json({
    success: true,
    user: serializeUser(user),
  });
}

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body ?? {};
  const normalizedName = typeof name === "string" ? name.trim() : "";
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (
    normalizedName.length < 2 ||
    normalizedName.length > 80 ||
    normalizedEmail.length > 254 ||
    !emailPattern.test(normalizedEmail) ||
    typeof password !== "string" ||
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return res.status(400).json({
      success: false,
      message: "Provide a valid name, email, and password (8-72 bytes).",
    });
  }

  try {
    const existingUser = await User.exists({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, passwordHashRounds);
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      passwordHash,
    });

    return sendAuthenticatedResponse(res, 201, user);
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    if (isValidationError(error)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account details.",
      });
    }

    console.error("Signup failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (
    normalizedEmail.length > 254 ||
    !emailPattern.test(normalizedEmail) ||
    typeof password !== "string" ||
    password.length < 1 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return res.status(400).json({
      success: false,
      message: "Provide a valid email and password.",
    });
  }

  try {
    const user = await User.findOne({ email: normalizedEmail }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    return sendAuthenticatedResponse(res, 200, user);
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.auth.userId);
    if (!user) {
      clearAuthCookie(res);
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    return res.status(200).json({
      success: true,
      user: serializeUser(user),
    });
  } catch (error) {
    console.error("Current-user lookup failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

router.post("/logout", (_req, res) => {
  clearAuthCookie(res);
  return res.status(200).json({ success: true });
});

export default router;
