import express, {urlencoded} from "express"
import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectToDb } from "./utils/connectToDb.js";
import {authRouter} from "./routers/auth.route.js";
import {taskRouter} from "./routers/task.route.js";

console.log("KAUSHALAM TODO APP")

const app = express();

await connectToDb()

// ENV variables
const PORT = process.env.PORT

// CORS
app.use(cors({
    origins: ['http://localhost:5173'],
    credentials: true
}))

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended:false }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/task",taskRouter)

// SERVER HEALTH
app.get("/", (req, res) => {
    return res.status(200).json({
        status: 200,
        topic: "health check",
        data: "Ok",
        uptime: process.uptime(),
        date: new Date(),
    });
});

app.listen(PORT,() => {
    console.log(`SERVER RUNNING ON : ${PORT}`)
})

