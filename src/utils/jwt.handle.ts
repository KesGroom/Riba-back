import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || 'RibatokenAuth20234478Kijse22saWEd';
const generateToken = (dni: string) => {
    const jwt = sign({ dni }, JWT_SECRET, {
        expiresIn: '1 day'
    });
    return jwt;
}
const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
}

export { generateToken, verifyToken }