import { NextFunction, Request, Response } from "express";
import { AppError, errorStatusCodes } from "../../utils/error";
import {
	anyAdminExists,
	createUser,
	getUserByEmail,
} from "../user/user.service";
import { createHash, createToken, verifyPassword } from "../../utils/auth";
import { responseMessage } from "../../utils/responseMessage";

export const loginController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;
	const user = await getUserByEmail(email);
	if (!user) {
		return next(
			new AppError(errorStatusCodes.UNAUTHORIZED, "Invalid credentials")
		);
	}
	const isPasswordValid = await verifyPassword(password, user.password);
	if (!isPasswordValid) {
		return next(
			new AppError(errorStatusCodes.UNAUTHORIZED, "Invalid credentials")
		);
	}
	const token = createToken({
		id: user.id,
		email: user.email,
		role: user.role,
	});
	res.status(200).json(responseMessage(200, "Login successful", { token }));
};

export const SignupController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password, name } = req.body;
	const users = await anyAdminExists();
	if (users) {
		return next(
			new AppError(errorStatusCodes.BAD_REQUEST, "Admin already exists")
		);
	}
	const hashedPassword = await createHash(password);
	const newUser = await createUser({
		email,
		password: hashedPassword,
		role: "admin",
	});
	res.status(201).json(responseMessage(201, "User created successfully"));
};

export const logoutController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(200).json(responseMessage(200, "Logout successful"));
};
