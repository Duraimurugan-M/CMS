import Expense from "../models/Expense.js";

export const createExpense = async (req,res)=>{
  const expense = await Expense.create(req.body);
  res.status(201).json(expense);
};

export const getExpenses = async (req,res)=>{
  const expenses = await Expense.find();
  res.json(expenses);
};

export const deleteExpense = async (req,res)=>{
  await Expense.findByIdAndDelete(req.params.id);
  res.json({message:"Expense removed"});
};