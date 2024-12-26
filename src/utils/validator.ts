/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
// @ts-ignore
import { fromZodError } from "zod-validation-error";
import { AppError, errorStatusCodes } from "./error";

const validateResource = (schema: AnyZodObject) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = schema.safeParse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			if (!result.success) {
				throw new AppError(errorStatusCodes.BAD_REQUEST,fromZodError(result.error).toString());
			}
			next();
		} catch (e: unknown) {
			console.error("Validation error", e);
			next(e);
		}
	};
};

export default validateResource;
