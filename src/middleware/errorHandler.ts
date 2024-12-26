import { Request, Response, NextFunction } from "express";
import { AppError, errorStatusCodes } from "../utils/error";
import { responseMessage } from "../utils/responseMessage";

const errorHandler = (
	err: AppError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = err.statusCode || 500;
	const message = err.isOperational
		? err.message
		: "Internal server error. Please try again later.";

	console.error(`[ERROR] ${err.message}`, { stack: err.stack });

	res.status(statusCode).json(responseMessage(statusCode, message));
};

export default errorHandler;
