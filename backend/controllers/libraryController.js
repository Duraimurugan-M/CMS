import Book from "../models/Book.js";
import BookIssue from "../models/BookIssue.js";

export const addBook = async(req,res)=>{
  const book = await Book.create(req.body);
  res.json(book);
};

export const getBooks = async(req,res)=>{
  const books = await Book.find();
  res.json(books);
};

export const issueBook = async(req,res)=>{
  const issue = await BookIssue.create(req.body);
  res.json(issue);
};