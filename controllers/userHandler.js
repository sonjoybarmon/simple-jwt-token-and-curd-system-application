const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

exports.loginUser = async (req, res, next) => {
  const user = await User.find({ userName: req.body.userName });
  try {
    if (user && user.length > 0) {
      // bcrypt compare password
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      //jwt token convert
      if (isValidPassword) {
        var token = jwt.sign(
          {
            userName: user[0].userName,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          access_token: token,
          message: "login successfully",
        });
        console.log(token);
        console.log(isValidPassword);
      } else {
        res.status(500).json({
          error: "authentication error occurred ",
        });
      }
    } else {
      res.status(500).json({
        error: "authentication error occurred ",
      });
    }
  } catch {
    res.status(500).json({
      error: "authentication error occurred ",
    });
  }
};
// user sign up
exports.createUser = async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    name: req.body.name,
    userName: req.body.userName,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(200).json({
      success: "user created successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
};
