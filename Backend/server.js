import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const PORT = process.env.PORT || 4000; //Defining port
const app = express(); //Creating express app
// dotenv.config(); //Loading environment variables
connectDb(); //Connecting to database



//Middlewares
app.use(express.json()); //Parsing json
app.use(cors());         //Enabling cors
app.use(cookieParser()); //Parsing cookies

//Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//Authentication Routes
app.use("/auth", userRouter)
app.use("/ai", aiRouter)

//Starting server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})