import Ledger from "../models/Ledger.js";

export const getLatestBalance = async (studentId) => {
  const latestEntry = await Ledger.findOne({ studentId }).sort({ createdAt: -1, _id: -1 });
  return latestEntry ? latestEntry.balance : 0;
};

export const createLedgerEntry = async ({
  studentId,
  entryType,
  debit = 0,
  credit = 0,
  refType = null,
  refId = null,
  remarks = ""
}) => {
  const previousBalance = await getLatestBalance(studentId);
  const newBalance = previousBalance + debit - credit;

  const entry = await Ledger.create({
    studentId,
    entryType,
    debit,
    credit,
    balance: newBalance,
    refType,
    refId,
    remarks
  });

  return entry;
};