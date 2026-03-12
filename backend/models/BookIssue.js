import mongoose from "mongoose";

const bookIssueSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  },
  studentId: String,
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  returnDate: Date,
  fine: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("BookIssue", bookIssueSchema);