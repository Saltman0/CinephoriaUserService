import { Request, Response } from "express";
import * as userRepository from "../repository/user.repository";
import jwt from "jsonwebtoken";

export async function loginUser(req: Request, res: Response) {
    try {
        const user = await userRepository.findUserByEmail(req.body.email);

        if (user === null) {
            res.status(401).json({error: `Authentication failed : incorrect email or password`});
        } else {
            if (req.body.password !== user.password) {
                res.status(401).json({error: `Authentication failed : incorrect email or password`});
            }

            // Define a payload with the information you want to include in the token
            const payload = {
                id: user.id,
                role: user.role,
                iss: process.env.JWT_KEY
            };

            const token: string = jwt.sign(payload, process.env.JWT_SECRET as string, {
                expiresIn: "1h"
            });

            // Verify the JWT token
            jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
                if (err) {
                    console.log('Token is invalid or expired');
                    console.error(err);
                } else {
                    console.log('Decoded JWT:', decoded);
                }
            });

            res.status(200).json({value: token});
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}