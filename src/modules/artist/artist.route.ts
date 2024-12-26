
import { Router } from 'express';
import { isAuthenticated, isAuthorized } from '../../middleware/auth';
import { artistCreateController, deleteArtistController, getArtistController, getArtistsController, updateArtistController } from './aritist.controller';
import { createArtistSchema, updateArtistSchema } from './artist.schema';
import validateResource from '../../utils/validator';
const router = Router();

router.get('/artists',isAuthenticated,getArtistsController);
router.post(
	"/artists/add-artist",
	isAuthenticated,
	isAuthorized(["admin","editor"]),
	validateResource(createArtistSchema),
	artistCreateController
);
router.get(
	"/artists/:id",
	isAuthenticated,
	getArtistController
);
router.put(
	"/artists/:id",
	isAuthenticated,
	isAuthorized(["admin","editor"]),
	validateResource(updateArtistSchema),
	updateArtistController
);
router.delete('/artists/:id', isAuthenticated, isAuthorized(["admin","editor"]), deleteArtistController);





export default router;
