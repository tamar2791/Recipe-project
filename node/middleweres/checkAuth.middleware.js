import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const [, token] = authorization.split(' ');
        const secretKey = process.env.JWT_SECRET || 'JWT_SECRET';
        const user = jwt.verify(token, secretKey);
        if (!user) {
            return next({ status: 403, message: 'auth required' })
        }
        req.myUser = user;
        next();
    } catch (error) {
        return next({ status: 403, message: 'auth required' })
    }
}