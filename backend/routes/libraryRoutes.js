import express from "express";
import {
  addBook,
  getBooks,
  issueBook
} from "../controllers/libraryController.js";

const router = express.Router();

// Add book
router.post("/books", addBook);

// Get all books
router.get("/books", getBooks);

// Issue book
router.post("/issue", issueBook);

export default router;