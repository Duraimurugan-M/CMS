import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  amount: { type: Number, required: true },
  paymentMethod: String,
  date: { type: Date, default: Date.now },
  notes: String
}, { timestamps: true });

export default mongoose.model("Expense", expenseSchema);