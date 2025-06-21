import { JwtPayload, sign } from "jsonwebtoken";
import createHttpError from "http-errors";
import { RefreshToken } from "../entity/RefreshToken";
import { User } from "../entity/User";
import { Repository } from "typeorm";

export class TokenService {
    constructor(private refreshTokenRepository: Repository<RefreshToken>) {}

    generateAccessToken(payload: JwtPayload) {
        const secret = process.env.JWT_SECRET || "dev-super-secret";

        if (!secret) {
            throw createHttpError(500, "JWT_SECRET is not defined");
        }

        const accessToken = sign(payload, secret, {
            algorithm: "HS256",
            expiresIn: "1d",
            issuer: "auth-service",
        });

        return accessToken;
    }

    generateRefreshToken(payload: JwtPayload) {
        const secret = process.env.JWT_SECRET || "dev-super-secret";

        if (!secret) {
            throw createHttpError(500, "JWT_SECRET is not defined");
        }

        const refreshToken = sign(payload, secret, {
            algorithm: "HS256",
            expiresIn: "1y",
            issuer: "auth-service",
            jwtid: String(payload.id),
        });

        return refreshToken;
    }

    async persistRefreshToken(user: User) {
        const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365;

        const newRefreshToken = await this.refreshTokenRepository.save({
            user: user,
            expiresAt: new Date(Date.now() + MS_IN_YEAR),
        });

        return newRefreshToken;
    }

    async deleteRefreshToken(tokenId: number) {
        return await this.refreshTokenRepository.delete({ id: tokenId });
    }
}
