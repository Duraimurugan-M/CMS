import express from "express";
import {
  addItem,
  getItems,
  createSale
} from "../controllers/shopController.js";

const router = express.Router();

// Add shop item
router.post("/items", addItem);

// Get shop items
router.get("/items", getItems);

// Create sales transaction
router.post("/sales", createSale);

export default router;