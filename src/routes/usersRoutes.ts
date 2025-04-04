import express from "express";
import { getAllUsers, getUsersByFacility } from "../controllers/usersController";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:facilityId", getUsersByFacility);

export default router;
