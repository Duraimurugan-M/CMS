import express from "express";
import {
  createExpense,
  getExpenses,
  deleteExpense
} from "../controllers/expenseController.js";

const router = express.Router();

// Add expense
router.post("/", createExpense);

// Get all expenses
router.get("/", getExpenses);

// Delete expense
router.delete("/:id", deleteExpense);

export default router;