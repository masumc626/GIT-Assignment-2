// env variables access
const dotenv = require("dotenv");
dotenv.config();

// import models
const express = require("express");
const cors = require("cors");

const connectDB = require("./connections/connectDB");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

// listening port
const PORT = process.env.PORT;

const app = express();

// connect to Database
connectDB();

// middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);
app.use("/", postRouter)

app.get("/", async (req, res) => {
    res.json({
        status: "Server is Running",
    });
});

// running the server to particuler port {ex. 3000}
app.listen(PORT, () => {
    console.log("Server is running ...");
});