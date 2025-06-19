import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import { AuthController } from "../controllers/AuthController";
import { UserService } from "../services/UserService";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import logger from "../config/logger";
import registerValidator from "../validators/Register-validator";
import { TokenService } from "../services/TokenService";
import { RefreshToken } from "../entity/RefreshToken";
import loginValidator from "../validators/login-valiator";
import { CredentialService } from "../services/CredentialService";
import authenticate from "../middlewares/authenticate";
import { AuthRequest } from "../types";
import validateRefreshToken from "../middlewares/validateRefreshToken";
import parseRefreshToken from "../middlewares/parseRefreshToken";

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
const tokenService = new TokenService(refreshTokenRepository);
const credentialService = new CredentialService();
const authController = new AuthController(
    userService,
    logger,
    tokenService,
    credentialService,
);

router.post("/register", registerValidator, (async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    await authController.register(req, res, next);
}) as RequestHandler);

router.post(
    "/login",
    loginValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        await authController.login(req, res, next);
    },
);

router.get(
    "/self",
    authenticate as RequestHandler,
    (req: Request, res: Response) => {
        void authController.self(
            req as AuthRequest,
            res,
        );
    },
);

router.post(
    "/refresh",
    validateRefreshToken as RequestHandler,
    async (req: Request, res: Response, next: NextFunction) => {
        await authController.refresh(
            req as AuthRequest,
            res,
            next,
        );
    },
);

router.post(
    "/logout",
    authenticate as RequestHandler,
    parseRefreshToken as RequestHandler,
    async (req: Request, res: Response, next: NextFunction) => {
        await authController.logout(
            req as AuthRequest,
            res,
            next,
        );
    },
);

export default router;