import { NextFunction, Request, response, Response } from "express";
import {
	createFavorite,
	deleteFavorite,
	getFavoriteByCategory,
} from "./favorites.service";
import { AppError, errorStatusCodes } from "../../utils/error";
import { responseMessage } from "../../utils/responseMessage";
import { Category } from "@prisma/client";

export const createFavoriteController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { category, item_id, name } = req.body;
		if (req.user?.id === undefined) {
			throw new AppError(errorStatusCodes.BAD_REQUEST, "Unauthorized");
		}
		const newFavorite = await createFavorite(req.user.id, {
			category,
			item_id,
			name,
		});
		res.status(201).json(responseMessage(201, "Favorite created successfully"));
	} catch (error) {
		next(error);
	}
};

export const getFavoriteByCategoryController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const category = req.params.category as Category;
		const limit = req.query.limit as string;
		const offset = req.query.offset as string;
		if (req.user?.id === undefined) {
			throw new AppError(errorStatusCodes.BAD_REQUEST, "Unauthorized");
		}
		const favorite = await getFavoriteByCategory(
			req.user.id,
			category,
			Number(limit),
			Number(offset)
		);
		res
			.status(200)
			.json(responseMessage(200, "Favorite fetched successfully", favorite));
	} catch (error) {
		next(error);
	}
};

export const deleteFavoriteController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const favoriteId = req.params.id;
		if (req.user?.id === undefined) {
			throw new AppError(errorStatusCodes.BAD_REQUEST, "Unauthorized");
		}
		await deleteFavorite(req.user.id, favoriteId);
		res.status(200).json(responseMessage(200, "Favorite deleted successfully"));
	} catch (error) {
		next(error);
	}
};
