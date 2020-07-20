import express from "express";
import productController from "../controllers/productController";

const router = express.Router();

router.get("/", productController.getProducts);
router.post("/", productController.postProduct);

export default router;
