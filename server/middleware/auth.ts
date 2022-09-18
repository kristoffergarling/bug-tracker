import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config";

interface TokenInterface {
    id: string;
    email: string;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("x-auth-token");

        if (!token) {
            return res.status(401).send({message: "No authentication token, authorization denied."});
        }

        const decodedToken = jwt.verify(token, JWT_SECRET) as TokenInterface;

        if (!decodedToken.id) {
            return res.status(401).send({message: "Invalid token, authorization denied."});
        }

        req.userId = decodedToken?.id;

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;