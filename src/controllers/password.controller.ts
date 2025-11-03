import { Request, Response } from "express";
import crypto from "crypto";
import * as userRepository from "../repository/user.repository";
import * as resetPasswordRepository from "../repository/resetPassword.repository";

export async function forgotPassword(req: Request, res: Response): Promise<void> {
    try {
        const user = await userRepository.findUserByEmail(req.body.email);

        if (user !== null) {
            const token: string = crypto.randomBytes(32).toString("hex");
            const expireTime: Date = new Date(Date.now() + 3600000); // 1 hour later

            await resetPasswordRepository.insertResetPassword(token, expireTime, user.id);

            const resetLink = `http://localhost:4200/reset-password?token=${token}`;

            res.status(200).json(resetLink);
        } else {
            res.status(404).json({error: `User not found`});
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function resetPassword(req: Request, res: Response): Promise<void> {
    try {
        const resetPassword = await resetPasswordRepository.findResetPasswordByToken(req.body.token);

        if (resetPassword !== null) {
            if (Date.now() < resetPassword.expireTime.getTime()) {
                await userRepository.updateUser(resetPassword.userId, null, req.body.password, null, null, null, null)
                res.status(200).json({ message: 'Password successfully reset' });
            } else {
                res.status(400).json({ error: `Expired token` });
            }
        } else {
            res.status(400).json({ error: `Invalid token` });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}