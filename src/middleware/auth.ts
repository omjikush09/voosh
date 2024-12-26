import { NextFunction, Response, Request } from "express";
import { verifyAndGetTokenData } from "../utils/auth";
import { AppError, errorStatusCodes } from "../utils/error";
import { Role } from "@prisma/client";

export const isAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authToken = req.headers.authorization;
	
	if (authToken && authToken.startsWith("Bearer ")) {
		const token = authToken.split(" ")[1];
		const decodeadToken = await verifyAndGetTokenData(token); // Will verify the token and return the decoded token
		if (decodeadToken) {
			req.user = decodeadToken;
			return next();
		}
	}
	next(new AppError(errorStatusCodes.UNAUTHORIZED, "Unauthorized"));
};

export const isAuthorized = (roles: Role[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (req.user?.role && roles.includes(req.user.role)) {
			return next();
		}

		next(new AppError(errorStatusCodes.FORBIDDEN, "Forbidden"));
	};
};
