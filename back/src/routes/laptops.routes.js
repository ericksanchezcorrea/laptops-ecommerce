import { Router } from "express";
import { getLaptops, createAllLaptops, createNewLaptop, deleteLaptop, updateLaptop } from "../controllers/products/laptopsControllers.js";
import {validateToken} from "../middlewares/validateToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router()

router.get('/laptops', getLaptops)
router.post('/laptops/:uid', validateToken, isAdmin, createAllLaptops)
router.post('/laptop/:uid', validateToken, isAdmin, createNewLaptop)

router.delete('/laptop/:id/:uid', validateToken, isAdmin, deleteLaptop)
router.put('/laptop/:id/:uid', validateToken, isAdmin, updateLaptop)

export default router 