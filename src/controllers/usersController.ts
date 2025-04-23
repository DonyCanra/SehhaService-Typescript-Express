import { Request, Response } from "express";
import { pool } from "../config/db";

// ✅ GET All Users
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT id, email, username FROM users");
    const users = result.rows;

    if (users.length === 0) {
      res.status(404).json({
        status: "error",
        message: "No users found",
        data: [],
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching users",
      error: (err as Error).message,
    });
  }
};

// ✅ GET Users by Facility
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
      SELECT 
        u.id AS user_id,
        u.username,
        u.email,
        u.status,
        u.role_id,
        r.name AS role_name,
        uf.facility_id
      FROM user_facilities uf
      JOIN users u ON uf.user_id = u.id
      JOIN roles r ON u.role_id = r.id
      WHERE uf.facility_id = $1
    `;

    const result = await pool.query(query, [facilityId]);
    const users = result.rows;

    if (users.length === 0) {
      res.status(404).json({
        status: "error",
        message: "No users found for this facility",
        data: [],
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Users fetched successfully for the facility",
      data: users,
    });
  } catch (err) {
    console.error("Error fetching users by facility:", err);

    res.status(500).json({
      status: "error",
      message: "Server error while fetching users by facility",
      error: (err as Error).message,
    });
  }
};
