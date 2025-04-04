import express from "express";
import { getAllRoles, getRolesByFacility } from "../controllers/rolesController";

const router = express.Router();

router.get("/", getAllRoles);
router.get("/:facilityId", getRolesByFacility);

export default router;
