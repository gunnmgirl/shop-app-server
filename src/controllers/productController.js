import Product from "../Models/productModel";
import User from "../Models/userModel";

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
    const product = await Product.create(req.body);
    const user = await User.findById(req.userId);
    user.products.push(product);
    await user.save();
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
  }
}

export default { getProducts, postProduct };
