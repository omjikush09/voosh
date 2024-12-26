import { Role } from "@prisma/client";
import db from "../../utils/database";
import { AppError, errorStatusCodes } from "../../utils/error";

type createUserType = {
	email: string;
	password: string;
	role: Role;
};

export const createUser = async (data: createUserType) => {
	const userExists = await db.user.findUnique({
		where: {
			email: data.email,
		},
	});
	if (userExists) {
		throw new AppError(errorStatusCodes.CONFLICT, "Email already exists");
	}

	const user = await db.user.create({
		data,
	});
	if (!user) {
		throw new AppError(errorStatusCodes.BAD_REQUEST, "User not created");
	}
};

export const getAllUsers = async (limit = 5, offset = 0, role: Role) => {
	const users = await db.user.findMany({
		where: {
			...(role && { role }),
		},
		select: {
			id: true,
			email: true,
			role: true,
		},
		...(limit && { take: limit }),
		...(offset && { skip: offset }),
	});
	return users;
};

export const getUserByEmail = async (email: string) => {
	const user = await db.user.findUnique({
		where: {
			email,
		},
	});
	return user;
};

export const anyAdminExists = async (): Promise<boolean> => {
	const user = await db.user.findFirst({
		where:{
			role: Role.admin
		}
	});
	if (!user) {
		return false;
	}
	return true;
};

export const getUserById = async (userId: string) => {
	const user = await db.user.findUnique({
		where: {
			id: userId,
		},
	});
	if (!user) {
		throw new AppError(errorStatusCodes.NOT_FOUND, "User not found");
	}
	return user;
};

export const updatePassword = async (userId: string, password: string) => {
	const updatedUser = await db.user.update({
		where: {
			id: userId,
		},
		data: {
			password,
		},
	});
	if (!updatedUser) {
		throw new AppError(
			errorStatusCodes.BAD_REQUEST,
			"Failed to update password"
		);
	}
};

export const deleteUser = async (userId: string) => {
	const deletedUser = await db.user.delete({
		where: {
			id: userId,
		},
	});
	if (!deletedUser) {
		throw new AppError(errorStatusCodes.BAD_REQUEST, "Failed to delete user");
	}
};
