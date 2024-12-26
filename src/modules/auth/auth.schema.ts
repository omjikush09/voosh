import { Role } from "@prisma/client";
import { z } from "zod";

export const signUpSchema = z.object({
	body: z
		.object({
			email: z.string().nonempty(),
			password: z.string().nonempty(),
		})
		.strict(),
});

export type signupType = z.infer<typeof signUpSchema>;
