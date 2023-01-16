const express = require("express");
const { connection } = require("./config/db");
const { auth } = require("./middeleware/auth.middelware");
const { postRouter } = require("./routers/Post.route");
const { userRouter } = require("./routers/User.route");

require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Social Media");
});

app.use("/users", userRouter);
app.use(auth);
app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connect to mongodb");
  } catch (err) {
    console.log(err);
  }
  console.log(`server at ${process.env.port}`);
});
