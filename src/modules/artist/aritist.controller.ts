import { NextFunction, Request, Response } from "express";
import {
	createArtist,
	deleteArtist,
	getArtistById,
	getArtists,
	updateArtist,
} from "./artist.service";
import { responseMessage } from "../../utils/responseMessage";
import { AppError, errorStatusCodes } from "../../utils/error";

export const artistCreateController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const newArtist = await createArtist(req.body);
		res.status(201).json(responseMessage(201, "Artist created successfully"));
	} catch (error) {
		next(error);
	}
};

export const getArtistController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const artistId = req.params.id;
		const newArtist = await getArtistById(artistId);
		res.status(201).json(newArtist);
	} catch (error) {
		next(error);
	}
};

export const getArtistsController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const limit = req.query.limit ?? 5;
		const offset = req.query.offset ?? 0;
		const grammy = req.query.grammy ?? 0;
		const hidden = req.query.hidden;
		const newArtist = await getArtists(
			Number(limit),
			Number(offset),
			hidden === "true",
			Number(grammy)
		);
		res.status(201).json(responseMessage(200, "Artists fetched successfully", newArtist));
	} catch (error) {
		next(error);
	}
};

export const updateArtistController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const artistId = req.params.id;
		const newArtist = await updateArtist(artistId, req.body);
		res.status(201).json(responseMessage(200, "Artist updated successfully"));
	} catch (error) {
		next(error);
	}
};

export const deleteArtistController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const artistId = req.params.id;
        const aritsis = await getArtistById(artistId);
        if(!aritsis){
            throw new AppError(errorStatusCodes.BAD_REQUEST, "Artist not found");
        }
		const deletedArtist = await deleteArtist(artistId);
		res.status(201).json(responseMessage(200, "Artist deleted successfully"));
	} catch (error) {
		next(error);
	}
};
