import { Router } from "express";
import { createUser, deleteUser, updateUser } from "../controllers/user/userControllers.js";

const router = Router()

router.post('/user/create', createUser)
// router.post('/user/login',  loginUser)
// router.delete('/user/:id',  deleteUser)
// router.patch('/user/:id',  updateUser)

// router.post('/admin', validateToken, isSuperAdmin ,createAdmin)

export default router 