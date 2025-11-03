import { Router } from 'express';
import * as passwordController from '../controllers/password.controller';

const router: Router = Router();

router.post("/forgot-password", passwordController.forgotPassword);

export default router;