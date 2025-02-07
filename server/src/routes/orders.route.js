import { Router } from "express";
import { createNewOrder, getAllOrders, verifyPayment } from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const orderRoutes = Router();

orderRoutes.route('/').get(verifyToken, getAllOrders)

orderRoutes.route('/new').post(verifyToken, createNewOrder)

orderRoutes.route('/verify').post(verifyToken, verifyPayment)

export default orderRoutes;