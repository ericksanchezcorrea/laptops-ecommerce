import { Router } from "express";
import { getShoppingCartsByUser } from "../controllers/shoppingCarts/shoppingCarts.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.get('/shoppingCart/:email/:uid', validateToken, getShoppingCartsByUser)

export default router