import express from "express";
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  getInvoicesByStudent
} from "../controllers/invoiceController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, authorizeRoles("superadmin", "admin", "accountant"), createInvoice)
  .get(protect, authorizeRoles("superadmin", "admin", "accountant"), getAllInvoices);

router.get(
  "/student/:studentId",
  protect,
  authorizeRoles("superadmin", "admin", "accountant"),
  getInvoicesByStudent
);

router.get(
  "/:id",
  protect,
  authorizeRoles("superadmin", "admin", "accountant"),
  getInvoiceById
);

export default router;