import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router: Router = Router();

router.get("/user", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

export default router;