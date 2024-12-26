import db from "../../utils/database";
import { createAlbumType } from "./album.schema";
import { AppError, errorStatusCodes } from "../../utils/error";
import { album } from "@prisma/client";

export const createAlbum = async (album: createAlbumType["body"]): Promise<album> => {
	const newAlbum = await db.album.create({
		data: album,
	});
	if (!newAlbum) {
		throw new AppError(errorStatusCodes.BAD_REQUEST, "Failed to create album");
	}
	return newAlbum;
};

export const getAlbumById = async (albumId:string): Promise<album> => {
	const album = await db.album.findFirst({
		where:{
            id:albumId
        }
	});
	if (!album) {
		throw new AppError(
            errorStatusCodes.NOT_FOUND,
            "Album not found"
        );
	}
	return album;
};

export const getAlbums = async (limit=5,offset=0,hidden:boolean,artistId?:string): Promise<album[]> => {
    const albums = await db.album.findMany({
			where: {
				hidden,
				...(artistId && { artistId }),
			},
			...(limit && { take: limit }),
			...(offset && { skip: offset }),
		});
    if (!albums) {
        throw new AppError(
            errorStatusCodes.NOT_FOUND,
            "Albums not found"
        );
    }
    return albums;
};

export const updateAlbum = async (
	albumId: string,
	album: createAlbumType["body"]
): Promise<album> => {
	const updatedAlbum = await db.album.update({
		where: {
			id: albumId,
		},
		data: album,
	});
	if (!updatedAlbum) {
		throw new AppError(errorStatusCodes.BAD_REQUEST, "Failed to update album");
	}
	return updatedAlbum;
};

export const deleteAlbum = async (albumId: string): Promise<void> => {
    const deletedAlbum = await db.album.delete({
        where: {
            id: albumId,
        },
    });
    if (!deletedAlbum) {
        throw new AppError(errorStatusCodes.BAD_REQUEST, "Failed to delete album");
    }
};