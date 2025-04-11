import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../config/jwt";
import { JwtPayload } from "../types/jwt";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header is missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyJwt(token) as JwtPayload;

    (req as Request & { user?: JwtPayload }).user = decoded;

    next();
  } catch (error: any) {
    console.warn("JWT verification failed:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
