import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import cors from "cors"; // 👈 FIXED: Changed from require to import
import interviewRouter from "./routes/interview.route.js";

dotenv.config();

const app = express(); // 👈 FIXED: Initialized the missing 'app' variable!

// 👇 FIXED: Positioned CORS right at the top so it intercepts requests immediately
app.use(cors({
  origin: "https://three-interview-client.onrender.com/", 
  credentials: true,                
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

// Routers
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview",interviewRouter);

app.get("/", (req, res) => {
    return res.json({ message: "Server Started" });
});

// Server Listener
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    connectDb();
}).on("error", (err) => {
    console.error("Listen Error:", err);
});
