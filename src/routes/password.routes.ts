import { Router } from 'express';
import * as passwordController from '../controllers/password.controller';

const router: Router = Router();

router.post("/password/forgot-password", passwordController.forgotPassword);
router.post("/password/reset-password", passwordController.resetPassword);

export default router;