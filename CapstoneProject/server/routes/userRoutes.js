const express = require("express");
const multer = require("multer");
const {
  registerUser,
  loginUser,
  getCurrentLoggedInUser,
  uploadAvatar,
} = require("../controllers/userControllers");
const userRouter = express.Router();
const protect = require("../middleware/authMiddleware");

//  SETTING UP THE STORAGE TO STORE THE IMAGES OF THE WEBSITE
// USING MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/uploadAvatar", upload.single("avatar"), uploadAvatar);
userRouter.get("/userData", getCurrentLoggedInUser);

module.exports = userRouter;
