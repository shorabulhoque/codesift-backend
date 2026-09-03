import cors from "cors";
import express from "express";
import type { Application, Request, Response } from "express";
import httpStatus from "http-status";
import config from "./config";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(
    cors({
        origin: config.frontend_url,
        credentials: true,
    }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Welcome to the CodeShift Developer Assessment Platform API!',
    });
});

export default app;