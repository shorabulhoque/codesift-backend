import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema: ZodType) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const parsed = (await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies,
        })) as Record<string, any>;

        req.body = parsed.body;
        req.query = parsed.query;
        req.params = parsed.params;

        next();
    });
};

export default validateRequest;