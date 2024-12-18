import { Request, Response } from "express";
import * as userRepository from "../repository/user.repository";
import jwt from "jsonwebtoken";

export async function loginUser(req: Request, res: Response) {
    try {
        const user = await userRepository.findUserByEmailAndPassword(
            req.body.email,
            req.body.password
        );

        if (user === null) {
            res.status(401).json({error : `Authentication failed : user ${req.body.email} not found.`});
        } else {
            // Define a payload with the information you want to include in the token
            const payload = {
                email: user[0].email,
                iss: "1*!uaNzKqrhZadJEcdpVGBH&E2%@g2usRxQ14h13dexDcjh8gMG3yyQ&aM&NpudW"
            };

            const token = jwt.sign(payload, "@Kv^n3^^ncBZ78$43GM59cfP77Bee*JQpnfRzgbEB2&w1C&3#54#kP5@0dR0DbuR", {
                expiresIn: "30d"
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
            res.status(404).json({error : `Users not found.`});
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
            res.status(404).json({error : `User ${req.params.id} not found.`});
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

        res.status(200).json(userToDelete);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}