import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import passport from "../middleware/passport";

const router: Router = Router();

router.post("/login", userController.loginUser);
router.get("/user", userController.getUsers);
router.get("/user/:userId", passport.authenticate("jwt", { session: false }), userController.getUserById);
router.post("/user", passport.authenticate("jwt", { session: false }), userController.createUser);
router.put("/user/:userId", passport.authenticate("jwt", { session: false }), userController.updateUser);
router.delete("/user/:userId", passport.authenticate("jwt", { session: false }), userController.deleteUser);

export default router;