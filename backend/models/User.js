import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    phone: {
      type: String
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: [
        "superadmin",
        "admin",
        "accountant",
        "student",
        "parent",
        "staff",
        "librarian",
        "shopadmin",
        "canteen"
      ],
      default: "student"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;