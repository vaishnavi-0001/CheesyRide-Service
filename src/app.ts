import "reflect-metadata";
import express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth";
import tenantRouter from "./routes/tenant";
import userRouter from "./routes/user";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
// import { Config } from "./config";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',  // 👈 your frontend running on this
    credentials: true
  }));
  

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Auth service from K8s");
});

app.use("/auth", authRouter);
app.use("/tenants", tenantRouter);
app.use("/users", userRouter);


app.use(globalErrorHandler);
export default app;
