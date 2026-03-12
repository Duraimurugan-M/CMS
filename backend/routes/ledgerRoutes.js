import express from "express";
import { getStudentLedger } from "../controllers/ledgerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/:studentId",
  protect,
  authorizeRoles("superadmin", "admin", "accountant"),
  getStudentLedger
);

export default router;