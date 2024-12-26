import db from "../../utils/database";
import { AppError, errorStatusCodes } from "../../utils/error";
import { track } from "@prisma/client";
import { createTrackType, updateTrackType } from "./track.schema";


export const createTrack = async (track: createTrackType["body"]): Promise<track> => {
    const newTrack = await db.track.create({
        data: track,
    });
    if (!newTrack) {
        throw new AppError(
            errorStatusCodes.BAD_REQUEST,
            "Failed to create track"
        );
    }
    return newTrack;
};

export const getTrackById = async (trackId: string): Promise<track> => {
    const track = await db.track.findFirst({
        where: {
            id: trackId,
        },
    });
    if (!track) {
        throw new AppError(
            errorStatusCodes.NOT_FOUND,
            "Track not found"
        );
    }
    return track;
};

export const getTracks = async (limit = 5, offset = 0,hidden=false,artist_id:string,album_id:string): Promise<track[]> => {
    const tracks = await db.track.findMany({
        ...(limit &&  {take: limit}),
       ...(offset&& {skip: offset}),
        where:{
            hidden,
            ...(artist_id && {artist_id}),
            ...(album_id && {album_id})
        }
    });
    if (!tracks) {
        throw new AppError(
            errorStatusCodes.NOT_FOUND,
            "Tracks not found"
        );
    }
    return tracks;
};

export const updateTrack = async (trackId: string, track: updateTrackType['body']): Promise<track> => {
    const updatedTrack = await db.track.update({
        where: {
            id: trackId,
        },
        data: track,
    });
    if (!updatedTrack) {
        throw new AppError(
            errorStatusCodes.BAD_REQUEST,
            "Failed to update track"
        );
    }
    return updatedTrack;
};

export const deleteTrack = async (trackId: string): Promise<void> => {
    const deletedTrack = await db.track.delete({
        where: {
            id: trackId,
        },
    });
    if (!deletedTrack) {
        throw new AppError(
            errorStatusCodes.BAD_REQUEST,
            "Failed to delete track"
        );
    }
};