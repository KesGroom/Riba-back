import { NextFunction, Request, Response } from "express";
import { Auth } from "../models/Auth";
import { verifyToken } from "../utils/jwt.handle";

const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || '';
        const key = jwtByUser.split(' ').pop();
        if (key === '') res.status(403).send('TOKEN_NOT_PROVIDED');
        if (key === process.env.PAGE_TOKEN) next();
        else {
            const authUser = await Auth.findOneBy({ key, user: false });
            if (!authUser) return res.status(404).json({ msg: 'NOT_TOKEN_FOUND' })
            const isOk = verifyToken(`${authUser.jwt}`);
            if (!isOk) res.status(403).send('INVALID_TOKEN')
            else next()

        }
    } catch (error) {
        res.status(403).send('Invalid session')
    }
}

export { checkJwt } 