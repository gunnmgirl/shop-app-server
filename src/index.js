import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import productRoutes from "./routes/productRoutes";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(productRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING, { useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to a server!");
    app.listen(4000);
  })
  .catch((error) => {
    console.log(error);
  });
