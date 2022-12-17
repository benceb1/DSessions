const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getProductsByVenue = asyncHandler(async (req, res) => {
  const products = await Product.find({ venue: req.params.id });

  res.status(200).json(products);
});

const addProduct = asyncHandler(async (req, res) => {
  const { venueId, name, price, icon } = req.body;

  if (!name || !venueId || !price || !icon) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const productExists = await Product.findOne({ name, venue: venueId });

  if (productExists) {
    res.status(400);
    throw new Error("Product already exists");
  }

  const product = await Product.create({
    venue: venueId,
    name,
    price,
    icon,
  });

  if (product) {
    res.status(201).json({
      _id: product.id,
      name: product.name,
      venue: product.venue,
      price: product.price,
      icon: product.icon,
    });
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("product not found");
  }

  await product.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProductsByVenue,
  addProduct,
  deleteProduct,
};
