import { Router } from "express";
import { getAddressesByEmail, createAddress, deleteAddress, updateAddress} from "../controllers/address/addressControllers.js";
import {validateToken} from "../middlewares/validateToken.js";

const router = Router()

router.get('/address/:email/:uid', validateToken, getAddressesByEmail)
router.post('/address/:uid', validateToken, createAddress)
router.delete('/address/:id/:uid', validateToken, deleteAddress)
router.put('/address/:id/:uid', validateToken, updateAddress)
// actualizar dirección
// router.post('/admin', validateToken, isSuperAdmin ,createAdmin)

export default router 