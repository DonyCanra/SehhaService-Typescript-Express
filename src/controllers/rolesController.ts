import { Request, Response } from "express";
import { pool } from "../config/db";

// GET All Roles
export const getAllRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM roles");
    const roles = result.rows;

    if (roles.length === 0) {
      res.status(404).json({
        status: "error",
        message: "No roles found",
        data: [],
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Roles fetched successfully",
      data: roles,
    });
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching roles",
      error: (err as Error).message,
    });
  }
};

// GET Roles by Facility ID
export const getRolesByFacility = async (req: Request, res: Response): Promise<void> => {
  try {
    const facilityId = parseInt(req.params.facilityId, 10);

    if (isNaN(facilityId)) {
      res.status(400).json({
        status: "error",
        message: "Invalid facility ID",
        error: "facilityId must be a number",
      });
      return;
    }

    const result = await pool.query("SELECT * FROM roles WHERE facility_id = $1", [facilityId]);
    const roles = result.rows;

    if (roles.length === 0) {
      res.status(404).json({
        status: "error",
        message: "No roles found for this facility",
        data: [],
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Roles fetched successfully for the facility",
      data: roles,
    });
  } catch (err) {
    console.error("Error fetching roles by facility:", err);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching roles by facility",
      error: (err as Error).message,
    });
  }
};
