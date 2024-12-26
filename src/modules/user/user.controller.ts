import e, { NextFunction, Request, Response } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updatePassword } from "./user.service";
import { AppError, errorStatusCodes } from "../../utils/error";
import { responseMessage } from "../../utils/responseMessage";
import { createHash, verifyPassword } from "../../utils/auth";
import { Role } from "@prisma/client";
export const createUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const newUser = await createUser(req.body);
		res.status(201).json(responseMessage(201, "User created successfully"));
	} catch (error) {
		next(error);
	}
};

export const getUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.params.id;
		const user = await getUserById(userId);
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

export const getUsersController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const limit = req.query.limit as string;
		const offset = req.query.offset as string;
		const role = req.query.role as string as Role;
		const users = await getAllUsers(Number(limit), Number(offset),role);
		res.status(201).json(responseMessage(201, "Users fetched successfully", users));
	} catch (error) {
		next(error);
	}
};

export const updatePasswordController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const old_password = req.body.old_password;
		const new_password = req.body.new_password;
		const userId = req.user?.id;
		if (!userId) {
			throw new AppError(errorStatusCodes.UNAUTHORIZED, "User not found");
		}

		const user = await getUserById(userId);

		const isPasswordValid = await verifyPassword(old_password, user.password);
		if (!isPasswordValid) {
			throw new AppError(errorStatusCodes.UNAUTHORIZED, "Invalid credentials");
		}
		const hashedPassword = await createHash(new_password);
		const updatedUser = await updatePassword(userId, hashedPassword);
		res.status(201).json(responseMessage(201, "Password updated successfully"));
	} catch (error) {
		next(error);
	}
};

export const deleteUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.params.id;
		const deletedUser = await deleteUser(userId);
		res.status(201).json(responseMessage(201, "User deleted successfully"));
	} catch (error) {
		next(error);
	}
};
