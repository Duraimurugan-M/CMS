import express from 'express';
import cors from 'cors';

//import routes
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";


const app = express();

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
.split(',')
.map((origin) => origin.trim())
.filter(Boolean);

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);



export default app;