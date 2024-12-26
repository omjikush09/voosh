import { Router } from "express";
import { isAuthenticated, isAuthorized } from "../../middleware/auth";
import {
	createUserController,
	deleteUserController,
	getUsersController,
	updatePasswordController,
} from "./user.controller";
import validateResource from "../../utils/validator";
import { createUserSchema, updatePasswordSchema } from "./user.schema";

const router = Router();

router.get(
	"/users",
	isAuthenticated,
	isAuthorized(["admin"]),
	getUsersController
);
router.post(
	"/users/add-user",
	isAuthenticated,
	isAuthorized(["admin"]),
	validateResource(createUserSchema),
	createUserController
);
router.put(
	"/users/update-password",
	isAuthenticated,
	validateResource(updatePasswordSchema),
	updatePasswordController
);

router.delete(
	"/users/:id",
	isAuthenticated,
	isAuthorized(["admin"]),
	deleteUserController
);

export default router;
