import express from "express";

import {
 createStudent,
 getStudents,
 getStudentById,
 updateStudent,
 deleteStudent
} from "../controllers/studentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createStudent);

router.get("/", protect, getStudents);

router.get("/:id", protect, getStudentById);

router.put("/:id", protect, updateStudent);

router.delete("/:id", protect, deleteStudent);

export default router;