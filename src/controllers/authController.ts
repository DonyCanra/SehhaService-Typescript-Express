import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Cek user berdasarkan email
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = userResult.rows[0];

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Ambil fasilitas (hospitals) yang dimiliki user
    const hospitalsResult = await pool.query(
      `SELECT f.id, f.name 
       FROM facilities f 
       JOIN user_facilities uf ON f.id = uf.facility_id 
       WHERE uf.user_id = $1`,
      [user.id]
    );
    const hospitals = hospitalsResult.rows;

    // Ambil role user
    const roleResult = await pool.query(
      `SELECT r.id, r.name, r.facility_id 
       FROM roles r 
       WHERE r.id = $1`,
      [user.role_id]
    );
    const role = roleResult.rows[0] || null;

    // Ambil permissions berdasarkan role
    let permissions: string[] = [];
    if (role) {
      const permissionsResult = await pool.query(
        `SELECT p.code 
         FROM permissions p 
         JOIN role_permissions rp ON p.id = rp.permission_id 
         WHERE rp.role_id = $1`,
        [role.id]
      );
      permissions = permissionsResult.rows.map((row) => row.code);
    }

    // Buat payload JWT dengan data lengkap
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    };

    const dataUser = {
      userId: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      hospitals,
      role,
      permissions,
    };

    // Generate JWT token
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    // Kirim response dengan token dan data user
    res.json({ token, user: dataUser });
    return;
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Server error" });
    return;
  }
};
