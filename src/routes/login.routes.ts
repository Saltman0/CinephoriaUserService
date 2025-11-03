import { Router } from 'express';
import * as loginController from '../controllers/login.controller';

const router: Router = Router();

router.post("/login", loginController.loginUser);

export default router;