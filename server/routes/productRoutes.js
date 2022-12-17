const express = require("express");
const router = express.Router();
const {
  getProductsByVenue,
  deleteProduct,
  addProduct,
} = require("../controllers/productController");

router.get("/:id", getProductsByVenue);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
