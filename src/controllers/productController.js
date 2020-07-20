function getProducts(req, res, next) {
  res.status(200).json({
    products: [{ name: "Apple", description: "This is a green apple!" }],
  });
}

function postProduct(req, res, next) {
  const name = req.body.name;
  const description = req.body.description;
  res.status(201).json({
    message: "Product created successfully",
    product: { name: name, description: description },
  });
}

export default { getProducts, postProduct };
