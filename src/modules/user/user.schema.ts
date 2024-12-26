import { Role } from "@prisma/client";
import { z } from "zod";



export const createUserSchema = z.object({
	body: z.object({
		email: z.string().nonempty(),
		password: z.string().nonempty(),
		role: z.enum([Role.editor,Role.viewer]),
	}).strict(),
})

export type createUserType = z.infer<typeof createUserSchema>;

export const updatePasswordSchema = z.object({
	body:z.object({
		old_password:z.string().nonempty(),
		new_password:z.string().nonempty(),
	}).strict(),
})

export type updatePasswordType = z.infer<typeof updatePasswordSchema>;