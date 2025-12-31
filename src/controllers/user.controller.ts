import { Request, Response } from "express";
import * as userRepository from "../repository/user.repository";
import { publishMessage } from "../rabbitmq";

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
            parseInt(req.params.userId)
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
            parseInt(req.params.userId),
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
            parseInt(req.params.userId)
        );

        await publishMessage(
            "booking",
            JSON.stringify(
                {
                    type: "booking",
                    event: "deleteByUser",
                    body: {userId: userToDelete.id}
                }
            )
        );

        res.status(200).json({ message: `User deleted successfully.` });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}