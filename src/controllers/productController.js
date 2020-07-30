import Product from "../Models/productModel";

async function getProducts(req, res, next) {
  try {
    console.log("in get products");
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
}

async function postProduct(req, res, next) {
  try {
    console.log("in post pro");
    const product = await Product.create(req.body);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
  }
}

export default { getProducts, postProduct };
