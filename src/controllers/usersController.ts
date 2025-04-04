import { Request, Response } from "express";
// import * as bcrypt from "bcryptjs";
// import * as jwt from "jsonwebtoken";
import { pool } from "../config/db";

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT id, email, username FROM users");
    const users = result.rows;

    if (users.length === 0) {
      res.status(404).json({
        status: "error",
        message: "No roles found for this facility",
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      data: { users },
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

export const getUsersByFacility = async (req: Request, res: Response): Promise<void> => {
  const facilityId = parseInt(req.params.facilityId, 10);

  if (isNaN(facilityId)) {
    res.status(400).json({
      status: "error",
      message: "Invalid facility ID",
      error: "facilityId must be a number",
    });
    return;
  }

  try {
    const query = `
      SELECT u.id, u.username, u.email, uf.facility_id
      FROM user_facilities uf
      JOIN users u ON uf.user_id = u.id
      WHERE uf.facility_id = $1
    `;

    const result = await pool.query(query, [facilityId]);
    const users = result.rows;

    if (users.length === 0) {
      res.status(404).json({
        status: "error",
        message: "No users found for this facility",
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      data: { users },
    });
  } catch (err) {
    console.error("Error fetching users:", err);

    res.status(500).json({
      status: "error",
      message: "Server error",
      error: (err as Error).message,
    });
  }
};
