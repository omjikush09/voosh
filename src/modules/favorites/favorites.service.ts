import db from "../../utils/database";
import { AppError, errorStatusCodes } from "../../utils/error";
import { artist, Category } from "@prisma/client";
import { Favourite } from "@prisma/client";
import {createFavoriteType } from "./favorites.schema"

export const createFavorite = async (
    user_id: string,
	favorite: createFavoriteType["body"]
): Promise<Favourite> => {
	const newFavorite = await db.favourite.create({
		data: {...favorite, user_id},
	});
	if (!newFavorite) {
		throw new AppError(
			errorStatusCodes.BAD_REQUEST,
			"Failed to create favorite"
		);
	}
	return newFavorite;
};

export const getFavoriteByCategory = async (
    user_id: string,
	category: Category,
    limit=5,
    offset=0
): Promise<Favourite[]> => {
	const favorite = await db.favourite.findMany({
		where: {
            user_id,
			category,
		},
      ...(limit &&  {take: limit}),
       ...(offset&& {skip: offset})
	});
	if (!favorite) {
		throw new AppError(errorStatusCodes.NOT_FOUND, "Favorite not found");
	}
	return favorite;
};





export const deleteFavorite = async (user_id:string,favoriteId: string): Promise<void> => {
	const deletedFavorite = await db.favourite.delete({
		where: {
			id: favoriteId,
            user_id
		},
	});
	if (!deletedFavorite) {
		throw new AppError(
			errorStatusCodes.BAD_REQUEST,
			"Failed to delete favorite"
		);
	}
};
