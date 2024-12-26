import { Router } from 'express';
import { loginController, logoutController, SignupController } from './auth.controller';
import { log } from 'console';
import { isAuthenticated } from '../../middleware/auth';
import validateResource from '../../utils/validator';
import { signUpSchema } from './auth.schema';

const router= Router();

router.get('/logout', isAuthenticated,logoutController);
router.post('/login',loginController );
router.post('/signup',validateResource(signUpSchema),SignupController );


export default router;