import { Router } from "express";
import { getUsers, postUser } from "../controllers/users";

const router = Router();

router.get('/', getUsers);
router.post('/', postUser);

export { router };