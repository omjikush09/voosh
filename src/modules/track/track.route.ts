import { Router } from "express";
import { isAuthenticated, isAuthorized } from "../../middleware/auth";


import validateResource from "../../utils/validator";
import { createTrackController, deleteTrackController, getTrackController, getTracksController, updateTrackController } from "./track.controller";
import { createTrackSchema, updateTrackSchema } from "./track.schema";
const router = Router();

router.get("/tracks", isAuthenticated, getTracksController);
router.post(
	"/tracks/add-track",
	isAuthenticated,
	isAuthorized(["admin", "editor"]),
	validateResource(createTrackSchema),
	createTrackController
);
router.get("/tracks/:id", isAuthenticated, getTrackController);
router.put(
	"/tracks/:id",
	isAuthenticated,
	isAuthorized(["admin", "editor"]),
	validateResource(updateTrackSchema),
	updateTrackController
);
router.delete(
	"/tracks/:id",
	isAuthenticated,
	isAuthorized(["admin", "editor"]),
	deleteTrackController
);

export default router;
