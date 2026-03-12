import mongoose from "mongoose";

const salesTransactionSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShopItem"
  },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: String,
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model("SalesTransaction", salesTransactionSchema);