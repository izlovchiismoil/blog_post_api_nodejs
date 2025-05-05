import express, {urlencoded} from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(urlencoded({ extended: false }));
app.use(express.json());
import models from "./models/indexModel.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import commentRouter from "./routes/commentRoute.js";
import authRouter from "./routes/authRoute.js";
import { defaults } from "./utils/defaults.js";
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10000,
    message: "Too many requests from this IP. Please try again later."
});
app.use(limiter);

models.user.sync({ alter: true }).then(user => {
    console.log(user);
}).catch(err => console.log(err));

models.post.sync({ alter: true }).then(post => {
    console.log(post);
}).catch(err => console.log(err));

models.category.sync({ alter: true }).then(categories => {
    console.log(categories);
}).catch(err => console.log(err));

models.comment.sync({ alter: true }).then(comments => {
    console.log(comments);
}).catch(err => console.log(err));

// Default options
defaults().then(d => {
    console.log("All defaults set");
}).catch(err => console.log(err));

// Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/comments", commentRouter);


const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
});
