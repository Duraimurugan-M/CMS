import mongoose from "mongoose";

const shopItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("ShopItem", shopItemSchema);