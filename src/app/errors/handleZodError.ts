import type { ZodError, ZodIssue } from "zod";
import httpStatus from "http-status";

export type TErrorSources = {
    path: string | number;
    message: string;
}[];

export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
};

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
        const rawPath = issue.path[issue.path.length - 1];
        const path: string | number = typeof rawPath === "number" ? rawPath : String(rawPath ?? "");

        return {
            path,
            message: issue.message,
        };
    });

    const statusCode = httpStatus.BAD_REQUEST;

    return {
        statusCode,
        message: "Validation Error",
        errorSources,
    };
};

export default handleZodError;