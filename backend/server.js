import dns from "dns";
import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the College Management System API");
});
