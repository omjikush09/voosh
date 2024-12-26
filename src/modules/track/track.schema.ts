

import { z } from "zod";


export const createTrackSchema = z.object({
	body: z.object({
		name: z.string().nonempty(),
		duration: z.number(),
		album_id: z.string().nonempty(),
		artist_id: z.string().nonempty(),
	}).strict(),
})


export type createTrackType = z.infer<typeof createTrackSchema>;

export const updateTrackSchema = z.object({
	body: z
		.object({
			name: z.string().nonempty(),
			duration: z.number(),
		})
		.partial()
		.strict(),
});

export type updateTrackType = z.infer<typeof updateTrackSchema>;

