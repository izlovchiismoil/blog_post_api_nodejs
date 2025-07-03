import dotenv from "dotenv";
dotenv.config();
import express, {urlencoded} from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
const app = express();
app.use(urlencoded({ extended: false }));
app.use(express.json());
import { sequelize } from "./models/indexModel.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import commentRouter from "./routes/commentRoute.js";
import authRouter from "./routes/authRoute.js";
import userRoleRouter from "./routes/userRoleRoute.js";
import initialRouter from "./routes/initialRote.js";
import { initial } from "./utils/initial.js";

app.use(cookieParser());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10000,
    message: "Too many requests from this IP. Please try again later."
});

app.use(limiter);


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


sequelize.sync({ alter: true })
    .then(() => {
        console.log("All tables created successfully");
        initial().then(d => {
            console.log("All initial set");
        }).catch(err => console.log(err));
}).catch((err) => {
    console.error(err);
});



const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Routers
app.use("/api/v1/images/posts", express.static(path.join(__dirname, "uploads/posts")));
app.use("/api/v1/images/profile", express.static(path.join(__dirname, "uploads/profile")));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/roles", userRoleRouter);
app.use("/api/v1/initial", initialRouter);


const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
});
