import { NextFunction, Request, Response } from "express";
import { responseMessage } from "../../utils/responseMessage";
import { AppError, errorStatusCodes } from "../../utils/error";
import { createTrack, deleteTrack, getTrackById, getTracks, updateTrack } from "./track.service";



export const createTrackController = async (
req: Request,
res: Response,
next: NextFunction
) => {
try {
    const newTrack = await createTrack(req.body);
    res.status(201).json(responseMessage(201, "Track created successfully"));
} catch (error) {
    next(error);
}
};

export const getTrackController = async (
req: Request,
res: Response,
next: NextFunction
) => {
try {
    const trackId = req.params.id;
    const track = await getTrackById(trackId);
    res.status(200).json(responseMessage(200, "Track fetched successfully", track));
} catch (error) {
    next(error);
}
};

export const getTracksController = async (
req: Request,
res: Response,
next: NextFunction
) => {
try {
    const limit = req.query.limit ?? 5;
    const offset = req.query.offset ?? 0;
    const hidden = req.query.hidden ?? false;
    const artist_id = req.query.artist_id as string;
    const album_id = req.query.album_id as string;
    const tracks = await getTracks(Number(limit), Number(offset), hidden === "true", artist_id, album_id);
    res.status(200).json(responseMessage(200, "Tracks fetched successfully", tracks));
} catch (error) {
    next(error);
}
};

export const updateTrackController = async (
req: Request,
res: Response,
next: NextFunction
) => {
try {
    const trackId = req.params.id;
    const updatedTrack = await updateTrack(trackId, req.body);
    res.status(200).json(responseMessage(200, "Track updated successfully"));
} catch (error) {
    next(error);
}
};

export const deleteTrackController = async (
req: Request,
res: Response,
next: NextFunction
) => {
try {
    const trackId = req.params.id;
    const track = await getTrackById(trackId);
    if (!track) {
        throw new AppError(errorStatusCodes.BAD_REQUEST, "Track not found");
    }
    await deleteTrack(trackId);
    res.status(200).json(responseMessage(200, "Track deleted successfully"));
} catch (error) {
    next(error);
}
};