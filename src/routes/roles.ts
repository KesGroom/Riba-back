import { Router } from "express";
import { deleteRole, getRole, getRoles, postRole, putRole } from "../controllers/roles";
import { checkJwt } from "../middleware/session.middleware";

const router = Router();

router.get('/', checkJwt, getRoles);
router.get('/:id', getRole);
router.post('/', postRole);
router.put('/:id', putRole);
router.delete('/:id', deleteRole);

export { router };