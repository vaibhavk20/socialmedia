const express = require("express");
const { UserModel } = require("../model/User.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();

userRouter.get("/",async(req,res)=>{
    const data = await UserModel.find()
    res.json(data)
})

userRouter.post("/register", (req, res) => {
  const { name, password, email, gender } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, pass) => {
      // Store hash in your password DB.
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ name, email, gender, password: pass });
        await user.save();
        res.send("register");
      }
    });
  } catch (err) {
    res.send("err to register");
  }
});

userRouter.post("/login", async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        // result == false
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send(`Login Succcessfull\n token:\n${token}`);
        } else {
          res.send("check password again");
        }
      });
    }
  } catch (err) {
    res.send("err to register");
  }
});

module.exports = {
  userRouter,
};
