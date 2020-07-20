import express from "express";
import productRoutes from "./routes/productRoutes";

const app = express();

app.use(productRoutes);

app.listen(4000);
