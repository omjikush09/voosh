import { user } from "@prisma/client";
import { Request } from "express";
// export interface RequetWithUser extends Request {
//   user: user;
// }

declare global {
	namespace Express {
		interface Request {
			user?: Pick<user, "id" | "email" | "role">;
		}
	}
}
