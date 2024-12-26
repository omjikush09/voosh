import { NextFunction, Request, Response } from "express";

import { createAlbum, deleteAlbum, getAlbumById, getAlbums, updateAlbum } from "./album.service";
import { responseMessage } from "../../utils/responseMessage";
import { AppError, errorStatusCodes } from "../../utils/error";

export const albumCreateController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const newAlbum = await createAlbum(req.body);
		res.status(201).json(responseMessage(201, "Album created successfully"));
	} catch (error) {
		next(error);
	}
};

export const getAlbumController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const albumId = req.params.id;
		const album = await getAlbumById(albumId);
		res.status(201).json(responseMessage(200, "Album fetched successfully", album));
	} catch (error) {
		next(error);
	}
};

export const getAlbumsController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const limit = req.query.limit ?? 5;
		const offset = req.query.offset ?? 0;
		const hidden = req.query.hidden?? false;
		const artistId = req.query.artist_id as string;
		const albums = await getAlbums(Number(limit), Number(offset), hidden === "true", artistId);
		res.status(201).json(responseMessage(200, "Albums fetched successfully", albums));
	} catch (error) {
		next(error);
	}
};

export const updateAlbumController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const albumId = req.params.id;
		const updatedAlbum = await updateAlbum(albumId, req.body);
		res.status(201).json(responseMessage(200, "Album updated successfully", updatedAlbum));
	} catch (error) {
		next(error);
	}
};

export const deleteAlbumController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const albumId = req.params.id;
		const album = await getAlbumById(albumId);
		if (!album) {
			throw new AppError(errorStatusCodes.BAD_REQUEST, "Album not found");
		}
		const deletedAlbum = await deleteAlbum(albumId);
		res.status(201).json(responseMessage(200, "Album deleted successfully"));
	} catch (error) {
		next(error);
	}
};
