const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const Authenticated = async (req, res, next) => {
  const token = req.header("Auth");
  if (!token) {
    return res.json({ message: "login first" });
  }
  const decoded = jwt.verify(token, "!@#$%^&*()");

  const id = decoded.userId;
  let user = await User.findById(id);
  if (!user) return res.json({ message: "user not exist" });

  req.user = user;
  next();
};

module.exports = Authenticated;
