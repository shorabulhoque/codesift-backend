import cors from "cors";
import express from 'express';
import type { Application, Request, Response } from 'express';
import httpStatus from 'http-status';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Welcome to the CodeShift Developer Assessment Platform API!',
    });
});

export default app;