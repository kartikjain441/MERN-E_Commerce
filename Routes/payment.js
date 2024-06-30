const express = require("express");
const {
  checkout,
  verify,
  userOrder,
  allOrders,
} = require("../Controllers/payment");
const Authenticated = require("../Middlewares/auth");
const router = express.Router();

router.post("/checkout", checkout);
//verify payment
router.post("/verify-payment", verify);

router.get("/userorder", Authenticated, userOrder);

router.get("/orders", allOrders);

module.exports = router;
