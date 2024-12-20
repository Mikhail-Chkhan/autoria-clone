import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import * as mongoose from "mongoose";

import { configs } from "./config/configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors/api.error";
import { adminRouter } from "./routers/admin.router";
import { authRouter } from "./routers/auth.router";
import { carRouter } from "./routers/car.router";
import { catalogRouter } from "./routers/catalog.router";
import { reportsRouter } from "./routers/report.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Origin",
      "Access-Control-Allow-Origin",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/cars", carRouter);
app.use("/reports", reportsRouter);
app.use("/catalog", catalogRouter);

app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json({
      message: error.message,
      status: error.status,
    });
  },
);
process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
  process.exit(1);
});

app.listen(configs.APP_PORT, async () => {
  await mongoose.connect(configs.MONGO_URI);
  cronRunner();
  console.log(
    `Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`,
  );
});
