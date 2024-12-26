import { z } from "zod";


export const createFavoriteSchema = z.object({
    body: z.object({
        category:z.enum(["album","track","artist"]),
        item_id: z.string().nonempty(),
        name: z.string().nonempty(),
    }).strict(),
})

 
export type createFavoriteType = z.infer<typeof createFavoriteSchema>;



