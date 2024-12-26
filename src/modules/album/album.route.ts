import { Router } from "express";
import { isAuthenticated, isAuthorized } from "../../middleware/auth";

import validateResource from "../../utils/validator";
import { albumCreateController, deleteAlbumController, getAlbumController, getAlbumsController, updateAlbumController } from "./album.controller";
import { createAlbumSchema, updateAlbumSchema } from "./album.schema";
const router = Router();

router.get("/albums", isAuthenticated,getAlbumsController);
router.post(
	"/albums/add-album",
	isAuthenticated,
	isAuthorized(["admin", "editor"]),
	validateResource(createAlbumSchema),
	albumCreateController
);
router.get("/albums/:id", isAuthenticated, getAlbumController);
router.put(
	"/albums/:id",
	isAuthenticated,
	isAuthorized(["admin", "editor"]),
	validateResource(updateAlbumSchema),
	updateAlbumController
);
router.delete(
	"/albums/:id",
	isAuthenticated,
	isAuthorized(["admin", "editor"]),
	deleteAlbumController
);

export default router;
