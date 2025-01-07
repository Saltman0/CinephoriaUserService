import { Request, Response } from "express";
import * as userRepository from "../repository/user.repository";
import jwt from "jsonwebtoken";
import { publishMessage } from "../rabbitmq";

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

            res.status(200).json(token);
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await userRepository.findUsers(
            req.query.role as string ?? null
        );

        if (users !== null) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message : `Users not found.` });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const user = await userRepository.findUserById(
            parseInt(req.params.id)
        );

        if (user !== null) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message : `User ${req.params.id} not found.` });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const userToCreate = await userRepository.insertUser(
            req.body.email,
            req.body.password,
            req.body.firstName,
            req.body.lastName,
            req.body.phoneNumber,
            req.body.role
        );

        await publishMessage("user", JSON.stringify({ type: "user", event: "create", body: userToCreate }));

        res.status(201).json(userToCreate);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const userToUpdate = await userRepository.updateUser(
            parseInt(req.params.id),
            req.body.email,
            req.body.password,
            req.body.firstName,
            req.body.lastName,
            req.body.phoneNumber,
            req.body.role
        );

        await publishMessage("user", JSON.stringify({ type: "user", event: "update", body: userToUpdate }));

        res.status(200).json(userToUpdate);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const userToDelete = await userRepository.deleteUser(
            parseInt(req.params.id)
        );

        await publishMessage("user", JSON.stringify({ type: "user", event: "delete", body: userToDelete }));

        res.status(200).json({ message: `User deleted successfully.` });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}