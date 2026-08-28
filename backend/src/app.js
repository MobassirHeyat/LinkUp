const express = require("express");
const http = require("http");
const cors = require("cors");
const { PORT } = require("./config/env");
const authRoutes = require("./routes/auth.routes");
const { connectDB } = require("./config/database");
const { Server } = require("socket.io")

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin : "http://localhost:5174",
    methods: ["GET", "POST"]
  }
});

app.use(cors({origin: "http://localhost:5174" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let messages = new Array;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

io.on("connection", (socket)=>{
  socket.on("messages", (msg) => {
    console.log(msg);
    io.emit("messages", msg);
    })
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
  });
});

connectDB();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
