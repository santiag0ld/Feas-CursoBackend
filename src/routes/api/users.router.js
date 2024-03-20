import { Router } from "express";
import UsersController from "../../controllers/users.controller";

const router = Router();
const uControl = new UsersController();

router
    .get('/:id', uControl.getDataUserById)
    .post('/create', uControl.createUser)
    .put('/:uid', uControl.updateUser)
    .delete('/:uid', uControl.deleteUser)
    .put('/premium/:uid', uControl.toggleUserRole);


export default router;