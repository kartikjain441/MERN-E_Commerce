const Cart = require("../models/Cart");
//add to cart
const addTocart = async (req, res) => {
  const { productId, title, price, qty, imgsrc } = req.body;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemindex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemindex > -1) {
    cart.items[itemindex].qty += qty;
    cart.items[itemindex].price += price * qty;
  } else {
    cart.items.push({ productId, title, price, qty, imgsrc });
  }

  await cart.save();
  res.json({ message: "Items Added To Cart", cart });
};

//get User cart
const userCart = async (req, res) => {
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ message: "Cart not found" });
  res.json({ message: "user cart", cart });
};

//remove cart item from cart

const removeProductFromCart = async (req, res) => {
  let productId = req.params.productId;
  const userId =req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ message: "cart not found" });
  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  await cart.save();
  res.json({ message: "product remove from cart" });
};

//clear card

const clearCart = async (req, res) => {
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ item: [] });
  } else {
    cart.items = [];
  }
  await cart.save();
  res.json({ message: "cart cleared" });
};

// Decrease qty from cart
const decreaseProductQty = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemindex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemindex > -1) {
    const item = cart.items[itemindex];

    if (item.qty > qty) {
      const pricePerUnit = item.price / item.qty;
      item.qty -= qty;
      item.price -= pricePerUnit * qty;
    } else {
      cart.items.splice(itemindex, 1);
    }
  } else {
    return res.json({ message: "invalid product Id" });
  }

  await cart.save();
  res.json({ message: "Items qty decreased", cart });
};

module.exports = {
  addTocart,
  userCart,
  removeProductFromCart,
  clearCart,
  decreaseProductQty,
};
