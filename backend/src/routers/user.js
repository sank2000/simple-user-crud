import { Router } from 'express';
import { createUser, updateUserById, getUserById, getUsers, deleteUser } from '@controllers/user';

import { validateBody } from 'src/helpers';
import { baseUser, updateUser, idValidator } from 'src/validators';

const router = Router();

/**
 * Router for /ping routes
 *
 * Available routes: /
 */

router.post('/', validateBody(baseUser), createUser);
router.get('/', getUsers);
router.get('/:id', validateBody(idValidator, true), getUserById);
router.put('/', validateBody(updateUser), updateUserById);
router.delete('/', validateBody(idValidator), deleteUser);

export default router;
