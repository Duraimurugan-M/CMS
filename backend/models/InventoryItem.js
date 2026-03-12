import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  quantity: { type: Number, default: 0 },
  unitPrice: Number,
  supplier: String,
  purchaseDate: Date
}, { timestamps: true });

export default mongoose.model("InventoryItem", inventoryItemSchema);