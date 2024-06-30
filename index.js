const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/user");
const productRouter = require("./Routes/product");
const cartRouter = require("./Routes/cart");
const addressRouter = require("./Routes/address");
const app = express();
const cors = require("cors");
const paymentRouter = require("./Routes/payment");
mongoose
  .connect(
    "mongodb+srv://kartikjaink101:QQy8cH5JEUSehLVI@cluster0.2rvh7za.mongodb.net/ecommerce"
  )
  .then(() => console.log("mongodb connected"));

app.use(express.json());

app.use(
  cors({
    origin: true,
    mothods: ["  GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "This is home route" });
});

app.use("/api/user", userRouter);

app.use("/api/product", productRouter);

app.use("/api/cart", cartRouter);

app.use("/api/address", addressRouter);
app.use("/api/payment", paymentRouter);

app.listen(1000, () => console.log("server started"));
