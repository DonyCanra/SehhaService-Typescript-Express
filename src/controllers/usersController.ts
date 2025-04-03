import { Request, Response } from "express";
// import * as bcrypt from "bcryptjs";
// import * as jwt from "jsonwebtoken";
import { pool } from "../config/db";

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT id, email, username FROM users");
    const users = result.rows;

    if (users.length === 0) {
      res.status(404).json({ message: "No users found" });
      return;
    }

    res.json({ users });
    return;
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
    return;
  }
};
