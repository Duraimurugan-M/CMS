import express from 'express';
import cors from 'cors';

//import routes
import authRoutes from "./routes/authRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";

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
app.use("/api/inventory",inventoryRoutes);
app.use("/api/expenses",expenseRoutes);
app.use("/api/library",libraryRoutes);
app.use("/api/shop",shopRoutes);


export default app;