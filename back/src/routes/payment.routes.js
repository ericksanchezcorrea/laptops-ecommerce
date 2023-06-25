import { Router } from "express";
import { createOrder, receiveWebhook } from "../controllers/payment/paymentControllers.js";
import {validateToken} from "../middlewares/validateToken.js";

const router = Router()

router.post('/create-order/:uid', validateToken, createOrder)
// router.get('/success', createOrder)
// router.get('/failure', createOrder)
// router.get('/pending', createOrder)
router.post('/webhook', receiveWebhook)

export default router 