import express, { NextFunction, RequestHandler, Response } from "express";
import authenticate from "../middlewares/authenticate";
import { canAccess } from "../middlewares/canAccess";
import { Roles } from "../constants";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import logger from "../config/logger";
import createUserValidator from "../validators/create-user-validatot";
import { CreateUserRequest, UpdateUserRequest } from "../types";
import updateUserValidator from "../validators/update-user-validator";

const router = express.Router();

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService, logger);

router.post(
    "/",
    authenticate as RequestHandler,
    canAccess([Roles.ADMIN]),
    createUserValidator,
    (req: CreateUserRequest, res: Response, next: NextFunction) => {
        userController.create(req, res, next).catch(next);
    },
);

router.patch(
    "/:id",
    authenticate as RequestHandler,
    canAccess([Roles.ADMIN]),
    updateUserValidator,
    async (req: UpdateUserRequest, res: Response, next: NextFunction) => {
        try {
            await userController.update(req, res, next);
        } catch (err) {
            next(err);
        }
    },
);

router.get(
    "/",
    authenticate as RequestHandler,
    canAccess([Roles.ADMIN]),
    async (req, res, next) => {
        try {
            await userController.getAll(req, res, next);
        } catch (err) {
            next(err);
        }
    },
);

router.get(
    "/:id",
    authenticate as RequestHandler,
    canAccess([Roles.ADMIN]),
    async (req, res, next) => {
        try {
            await userController.getOne(req, res, next);
        } catch (err) {
            next(err);
        }
    },
);

router.delete(
    "/:id",
    authenticate as RequestHandler,
    canAccess([Roles.ADMIN]),
    async (req, res, next) => {
        try {
            await userController.destroy(req, res, next);
        } catch (err) {
            next(err);
        }
    },
);

export default router;