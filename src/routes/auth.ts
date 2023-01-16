import { Router } from "express";
import { generateCode, login, register, signOut } from "../controllers/auth";

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', signOut);
router.post('/recovery', generateCode)

export { router };