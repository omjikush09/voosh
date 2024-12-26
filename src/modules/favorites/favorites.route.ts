import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth";

import validateResource from "../../utils/validator";
import {
	createFavoriteController,
	deleteFavoriteController,
	getFavoriteByCategoryController,
} from "./favorites.controller";
import { createFavoriteSchema } from "./favorites.schema";
const router = Router();

router.get(
	"/favorites/:category",
	isAuthenticated,
	getFavoriteByCategoryController
);
router.post(
	"/favorites/add-favorite",
	isAuthenticated,
	validateResource(createFavoriteSchema),
	createFavoriteController
);

router.delete(
	"/favorites/remove-favorite/:id",
	isAuthenticated,
	deleteFavoriteController
);

export default router;
