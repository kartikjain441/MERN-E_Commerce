const express = require("express");
const router = express.Router();
const {
  addTocart,
  userCart,
  removeProductFromCart,
  clearCart,
  decreaseProductQty,
} = require("../Controllers/cart");

const Authenticated= require("../Middlewares/auth");

//add to cart
router.post("/add", Authenticated, addTocart);
// get user cart
router.get("/user", Authenticated, userCart);

router.delete("/remove/:productId",Authenticated, removeProductFromCart);

router.delete("/clear",Authenticated, clearCart);

router.post("/--qty",Authenticated, decreaseProductQty);
module.exports = router;
