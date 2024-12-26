import { z } from "zod";


export const createArtistSchema = z.object({
	body: z.object({
		name: z.string().nonempty(),
		hidden: z.boolean().default(false),
		grammy: z.number().default(0),
	}).strict(),
})

 
export type createArtistType = z.infer<typeof createArtistSchema>;

export const updateArtistSchema = z.object({
	body: z.object({
		name: z.string().nonempty(),
		hidden: z.boolean().default(false),
		grammy: z.number().default(0),
	}).partial().strict(),
});

export type updateArtistType = z.infer<typeof updateArtistSchema>;

