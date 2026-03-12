import express from "express";
import {
  createItem,
  getItems,
  updateItem,
  deleteItem
} from "../controllers/inventoryController.js";

const router = express.Router();

// Create inventory item
router.post("/", createItem);

// Get all inventory items
router.get("/", getItems);

// Update inventory item
router.put("/:id", updateItem);

// Delete inventory item
router.delete("/:id", deleteItem);

export default router;