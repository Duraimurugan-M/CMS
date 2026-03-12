import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    entryDate: {
      type: Date,
      default: Date.now
    },
    entryType: {
      type: String,
      enum: ["invoice", "payment", "fine", "advance_adjustment", "manual_adjustment"],
      required: true
    },
    debit: {
      type: Number,
      default: 0,
      min: 0
    },
    credit: {
      type: Number,
      default: 0,
      min: 0
    },
    balance: {
      type: Number,
      required: true
    },
    refType: {
      type: String,
      enum: ["Invoice", "Payment", "Manual", null],
      default: null
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    remarks: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const Ledger = mongoose.model("Ledger", ledgerSchema);

export default Ledger;