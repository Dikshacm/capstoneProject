const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const bcrypt = require("bcryptjs");

const fs = require("fs");
const User = require("../models/userModel");
const userRouter = require("../routes/userRoutes");
const { db } = require("../models/userModel");

// @desc      Regisster New userModel
// @route     POST/user/
// @access    Public

const registerUser = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Field Can not be empty");
  }

  //   check if the user is already exist
  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  //  Encryting the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const saveUser = await User.create({ name, email, password: hashedPassword });
  if (saveUser) {
    res.status(201).json({
      success: true,
      _id: saveUser._id,
      name: saveUser.name,
      email: saveUser.email,
      token: generateToken(saveUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Error.!");
  }

  //   res.json({ message: "Register user" });
};

// @desc      Authenticate New user
// @route     POST/user/login
// @access    Public

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log(await bcrypt.compare(password, user.password));

  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log(user);
    if (isPasswordMatch) {
      res.json({
        success: true,
        _id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid Credentials" });
      //   throw new Error("Invalid Credentials");
    }
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
};

// @desc      Get User Data
// @route     user/
// @access    Private

const getCurrentLoggedInUser = async (req, res) => {
  res.status(200).json({ message: "getCurrentLoggedInUser " });
};

const logOutUser = async (req, res) => {
  console.log("logging Out");
};

// genrating tokens JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "SECERET", { expiresIn: "1d" });
};

// UPLOADING AVATAR

const uploadAvatar = async (req, res) => {
  // console.log(req.body);w
  console.log(`file : ${req.file.filename}`);
  console.log("pathhhh");

  // let user = localStorage.getItem("user");
  // console.log(user);

  const dbUser = await User.findOne({ _id: "634d68f971bec70b772238e1" });
  console.log(dbUser);

  const query = { id: "634d68f971bec70b772238e1" };

  var data = {
    avatar: { data: req.file.filename, ContentType: "image/jpg" },
    avatarString: req.file.filename,
  };

  User.updateOne(query, data, (err, userData) => {
    if (err) {
      throw err;
    }
    console.log(userData);
  });

  res.status(200).json({ success: true });
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentLoggedInUser,
  uploadAvatar,
};
