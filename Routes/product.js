const express = require("express");
const {
  addProduct,
  getProducts,
  getProductbyid,
  updateProductbyid,
  deleteProductbyid,
} = require("../Controllers/product");

const router = express.Router();
// add
router.post("/add", addProduct);

//get all products
router.get("/all", getProducts);
module.exports = router;

//get product by id
router.get("/:id", getProductbyid);

//update product by id
router.put("/:id", updateProductbyid);

//delete update by id
router.delete("/:id", deleteProductbyid);

module.exports = router;
