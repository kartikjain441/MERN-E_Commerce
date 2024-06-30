const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.json({ message: "User Already Exist", success: false });
  const hashPass = await bcrypt.hash(password, 10);
  user = await User.create({
    name: name,
    email: email,
    password: hashPass,
  });
  res.json({ message: "User register Successfully...!", user, success: true });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found", success: false });
  const validpass = await bcrypt.compare(password, user.password);
  if (!validpass)
    return res.json({ message: "Invalid Credential", success: false });
  const token = jwt.sign({ userId: user._id }, "!@#$%^&*()", {
    expiresIn: "365d",
  });
 

  res.json({ message: `Welcome ${user.name}`, token, success: true });
};
// get all users
const users = async (req, res) => {
  let users = await User.find().sort({ createdAt: -1 });
  res.json({ users });
};

//get profile 
const profile = async (req, res)=>
  {
    res.json({user:req.user})
  }

module.exports = {
  register,
  login,
  users,
  profile
};
