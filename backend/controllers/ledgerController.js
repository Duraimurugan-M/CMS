import Ledger from "../models/Ledger.js";
import Student from "../models/Student.js";

export const getStudentLedger = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).select(
      "fullName name regNo registrationNumber course"
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const entries = await Ledger.find({ studentId: req.params.studentId })
      .populate("studentId", "fullName name regNo registrationNumber course")
      .sort({ createdAt: 1, _id: 1 });

    const totalDebit = entries.reduce((sum, item) => sum + item.debit, 0);
    const totalCredit = entries.reduce((sum, item) => sum + item.credit, 0);
    const closingBalance = entries.length ? entries[entries.length - 1].balance : 0;

    res.status(200).json({
      success: true,
      student,
      summary: {
        totalDebit,
        totalCredit,
        closingBalance
      },
      count: entries.length,
      data: entries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};