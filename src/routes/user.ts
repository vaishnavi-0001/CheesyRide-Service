import express, { NextFunction, Response } from "express";
import authenticate from "../middlewares/authenticate";
import { canAccess } from "../middlewares/canAccess";
import { Roles } from "../constants";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import logger from "../config/logger";
import createUserValidator from "../validators/create-user-validatot";
import { UpdateUserRequest } from "../types";
import updateUserValidator from "../validators/update-user-validator";
import listUsersValidator from "../validators/list-users-validator";
import { Request } from "express-jwt";


const router = express.Router();

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService, logger);

function asyncHandler(
    fn: (
        req: express.Request,
        res: Response,
        next: NextFunction,
    ) => Promise<unknown>,
) {
    return (req: express.Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

router.post(
    "/",
    authenticate,
    canAccess([Roles.ADMIN]),
    createUserValidator,
    asyncHandler((req: express.Request, res: Response, next: NextFunction) =>
        userController.create(req, res, next),
    ),
);

router.patch(
    "/:id",
    authenticate,
    canAccess([Roles.ADMIN]),
    updateUserValidator,
    asyncHandler((req: UpdateUserRequest, res: Response, next: NextFunction) =>
        userController.update(req, res, next),
    ),
);
router.get("/", authenticate, canAccess([Roles.ADMIN]), listUsersValidator,
(req: Request, res: Response, next: NextFunction) =>
    userController.getAll(req, res, next),
);

router.get("/:id", authenticate, canAccess([Roles.ADMIN]), (req, res, next) =>
    userController.getOne(req, res, next),
);
router.delete(
    "/:id",
    authenticate,
    canAccess([Roles.ADMIN]),
    (req, res, next) => userController.destroy(req, res, next),
);
export default router;