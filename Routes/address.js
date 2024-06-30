const express = require("express");
const router = express.Router();
const { addAddress, getaddress } = require("../Controllers/address");
const Authenticated = require("../Middlewares/auth");
// add address
router.post("/add", Authenticated, addAddress);

// get address
router.get("/get", Authenticated, getaddress);

module.exports = router;
