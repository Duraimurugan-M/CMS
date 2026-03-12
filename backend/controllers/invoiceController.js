import Invoice from "../models/Invoice.js";
import { createLedgerEntry } from "../services/ledgerService.js";
import Student from "../models/Student.js";

export const createInvoice = async (req, res) => {
  try {
    const { studentId, academicYear, feeItems, remarks } = req.body;

    if (!studentId || !academicYear || !feeItems || !Array.isArray(feeItems) || feeItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "studentId, academicYear and feeItems are required"
      });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const normalizedFeeItems = feeItems.map((item, index) => {
      if (!item.feeHeadId || !item.title || item.amount === undefined || !item.dueDate) {
        throw new Error(`Invalid fee item at position ${index + 1}`);
      }

      return {
        feeHeadId: item.feeHeadId,
        title: item.title,
        amount: Number(item.amount),
        dueDate: item.dueDate,
        installmentNo: Number(item.installmentNo || 1),
        fineAmount: Number(item.fineAmount || 0),
        status: "pending"
      };
    });

    const totalAmount = normalizedFeeItems.reduce((sum, item) => sum + item.amount, 0);

    const invoice = await Invoice.create({
      studentId,
      academicYear,
      feeItems: normalizedFeeItems,
      totalAmount,
      totalPaid: 0,
      balanceAmount: totalAmount,
      status: "unpaid",
      remarks: remarks || "",
      createdBy: req.user?._id || null
    });

    await createLedgerEntry({
      studentId,
      entryType: "invoice",
      debit: totalAmount,
      credit: 0,
      refType: "Invoice",
      refId: invoice._id,
      remarks: `Invoice generated for ${student.fullName || student.name || student.regNo || "student"} - ${academicYear}`
    });

    res.status(201).json({
      success: true,
      message: "Invoice created and ledger updated successfully",
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("studentId", "fullName name regNo registrationNumber course")
      .populate("feeItems.feeHeadId", "name code amount")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getInvoicesByStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const invoices = await Invoice.find({ studentId: req.params.studentId })
      .populate("studentId", "fullName name regNo registrationNumber course")
      .populate("feeItems.feeHeadId", "name code amount")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("studentId", "fullName name regNo registrationNumber course")
      .populate("feeItems.feeHeadId", "name code amount");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found"
      });
    }

    res.status(200).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};