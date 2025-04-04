import { Request, Response } from "express";
// import * as bcrypt from "bcryptjs";
// import * as jwt from "jsonwebtoken";
import { pool } from "../config/db";

export const getAllRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM roles");
    console.log("Roles fetched successfully:", result.rows);
    const roles = result.rows;

    if (roles.length === 0) {
      res.status(404).json({ message: "No roles found" });
      return;
    }

    res.json({ roles });
    return;
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

export const getRolesByFacility = async (req: Request, res: Response): Promise<void> => {
  try {
    const facilityId = parseInt(req.params.facilityId, 10);
    if (isNaN(facilityId)) {
      res.status(400).json({ message: "Invalid facility ID" });
      return;
    }
    const result = await pool.query("SELECT * FROM roles WHERE facility_id = $1", [facilityId]);
    console.log("Roles fetched successfully:", result.rows);
    const roles = result.rows;

    if (roles.length === 0) {
      res.status(404).json({ message: "No roles found" });
      return;
    }

    res.json({ roles });
    return;
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({ message: "Server error" });
    return;
  }
};
