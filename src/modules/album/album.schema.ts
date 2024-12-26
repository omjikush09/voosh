import { z } from "zod";

export const createAlbumSchema = z.object({
	body: z.object({
		name: z.string().nonempty(),
		artist_id: z.string().nonempty(),
	}).strict(),
});

export type createAlbumType = z.infer<typeof createAlbumSchema>;

export const updateAlbumSchema = z.object({
	body: z.object({
		name: z.string().nonempty(),
	}).partial().strict(),
});

export type updateAlbumType = z.infer<typeof updateAlbumSchema>;

