import express from 'express';
import cors from 'cors';

//import routes
import authRoutes from "./routes/authRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import ledgerRoutes from "./routes/ledgerRoutes.js";

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
app.use("/api/fee-heads", feeRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/ledger", ledgerRoutes);


export default app;