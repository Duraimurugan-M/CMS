import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema(
  {
    feeHeadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeeHead",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    dueDate: {
      type: Date,
      required: true
    },
    installmentNo: {
      type: Number,
      default: 1
    },
    fineAmount: {
      type: Number,
      default: 0,
      min: 0
    },
    status: {
      type: String,
      enum: ["pending", "paid", "partial"],
      default: "pending"
    }
  },
  { _id: false }
);

const invoiceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    academicYear: {
      type: String,
      required: true,
      trim: true
    },
    feeItems: {
      type: [invoiceItemSchema],
      required: true
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    totalPaid: {
      type: Number,
      default: 0,
      min: 0
    },
    balanceAmount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["unpaid", "partial", "paid"],
      default: "unpaid"
    },
    remarks: {
      type: String,
      default: ""
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;