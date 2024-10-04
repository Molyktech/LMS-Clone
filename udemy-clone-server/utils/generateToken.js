import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
    }

    res.cookie('token', token, options);
    return token;
}