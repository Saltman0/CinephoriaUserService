import { Request, Response } from "express";
import crypto from "crypto";
import * as userRepository from "../repository/user.repository";
import * as resetPasswordRepository from "../repository/resetPassword.repository";


export async function forgotPassword(req: Request, res: Response) {
    try {
        const user = await userRepository.findUserByEmail(req.body.email);

        if (user !== null) {
            const token: string = crypto.randomBytes(32).toString("hex");
            const expireTime: Date = new Date(Date.now() + 3600000); // 1 hour later

            await resetPasswordRepository.insertResetPassword(token, expireTime, user.id);

            const resetLink = `http://localhost:4200/reset-password?token=${token}`

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