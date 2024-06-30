const Products = require("../models/Product");

//add product

const addProduct = async (req, res) => {
  const { title, description, price, category, qty, imgsrc, createdAt } =
    req.body;

  let product = await Products.create({
    title,
    description,
    price,
    category,
    qty,
    imgsrc,
    createdAt,
  });

  res.json({ message: "Product added successfully...!", product });
};

//get products
const getProducts = async (req, res) => {
  let products = await Products.find().sort({ createdAt: -1 });

  res.json({ message: "All products", products });
};
//find product by id
const getProductbyid = async (req, res) => {
  const id = req.params.id;
  let product = await Products.findById(id);
  if (!product) return res.json({ message: "Invalid id" });
  res.json({ message: "Specific product", product });
};

//update by product id
const updateProductbyid = async (req, res) => {
  const id = req.params.id;
  let product = await Products.findByIdAndUpdate(id, req.body, { new: true });
  if (!product) return res.json({ message: "Invalid id" });
  res.json({ message: " Product has been Updated", product });
};

// delete product by id
const deleteProductbyid = async (req, res) => {
  const id = req.params.id;
  let product = await Products.findByIdAndDelete(id);
  if (!product) return res.json({ message: "Invalid id" });
  res.json({ message: "Product has been deleted", product });
};
module.exports = {
  addProduct,
  getProducts,
  getProductbyid,
  updateProductbyid,
  deleteProductbyid,
};
