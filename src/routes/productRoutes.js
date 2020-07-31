import express from "express";
import productController from "../controllers/productController";

import isAuth from "../middleware/isAuth";

const router = express.Router();

router.get("/", isAuth, productController.getProducts);
router.post("/", isAuth, productController.postProduct);

export default router;
