import express from "express";
import {
  createFeeHead,
  deleteFeeHead,
  getFeeHeadById,
  getFeeHeads,
  updateFeeHead
} from "../controllers/feeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, authorizeRoles("superadmin", "admin", "accountant"), createFeeHead)
  .get(protect, getFeeHeads);

router
  .route("/:id")
  .get(protect, getFeeHeadById)
  .put(protect, authorizeRoles("superadmin", "admin", "accountant"), updateFeeHead)
  .delete(protect, authorizeRoles("superadmin", "admin", "accountant"), deleteFeeHead);

export default router;