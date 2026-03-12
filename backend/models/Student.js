import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    regNumber: {
      type: String,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    dob: {
        type: Date,
        required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    course: {
        type: String,
        required: true,
    },

    admissionDate: {
      type: Date,
      default: Date.now,
    },

    parentName: {
        type: String,
        required: true,
    },

    parentPhone: {
        type: String,
        unique: true,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true },
);

const Student = mongoose.model("Student", studentSchema);

export default Student;