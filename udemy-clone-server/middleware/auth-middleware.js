import jwt from "jsonwebtoken";
import { serverResponse } from "../utils/serverResponse.js";

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
}

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return serverResponse(res, 401, false, "Unauthorized");


    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        return serverResponse(res, 401, false, "Invalid token");
    }
}