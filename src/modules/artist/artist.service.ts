import db from "../../utils/database";
import { AppError, errorStatusCodes } from "../../utils/error";
import { artist, user } from "@prisma/client";
import { createArtistType, updateArtistType } from "./artist.schema";

export const createArtist = async (artist: createArtistType["body"]): Promise<artist> => {
    const newArtist = await db.artist.create({
        data: artist,
    });
    if (!newArtist) {
        throw new AppError(
            errorStatusCodes.BAD_REQUEST,
            "Failed to create artist"
        );
    }
    return newArtist;
};

export const getArtistById = async (artistId: string): Promise<artist> => {
    const artist = await db.artist.findFirst({
        where: {
            id: artistId,
        },
    });
    if (!artist) {
        throw new AppError(
            errorStatusCodes.NOT_FOUND,
            "Artist not found"
        );
    }
    return artist;
};

export const getArtists = async (limit = 5, offset = 0,hidden=false,grammy=0): Promise<artist[]> => {
    const artists = await db.artist.findMany({
       ...(limit &&  {take: limit}),
       ...(offset&& {skip: offset}),
        where: {
            hidden,
            grammy
        }
    });
    if (!artists) {
        throw new AppError(
            errorStatusCodes.NOT_FOUND,
            "Artists not found"
        );
    }
    return artists;
};

export const updateArtist = async (artistId: string, artist:updateArtistType ): Promise<artist> => {
    const updatedArtist = await db.artist.update({
        where: {
            id: artistId,
        },
        data: artist,
    });
    if (!updatedArtist) {
        throw new AppError(
            errorStatusCodes.BAD_REQUEST,
            "Failed to update artist"
        );
    }
    return updatedArtist;
};

export const deleteArtist = async (artistId: string): Promise<artist> => {

    const deletedArtist = await db.artist.delete({
        where: {
            id: artistId,
        },
    });
    return deletedArtist;
};
