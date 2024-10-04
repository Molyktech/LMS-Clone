import express from 'express';
import { registerUser, loginUser,checkUser } from '../controllers/auth-controller.js';
import { authenticate } from '../middleware/auth-middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post("/login", loginUser);
router.get("/check",authenticate, checkUser);

export default router;