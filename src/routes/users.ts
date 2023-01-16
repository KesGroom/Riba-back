import { Router } from "express";
import { deleteUser, getUser, getUsers, postUser, putUser } from "../controllers/users";

const router = Router();

router.get('/', getUsers);
router.get('/:dni', getUser);
router.post('/', postUser);
router.put('/:dni', putUser);
router.delete('/', deleteUser);

export { router };