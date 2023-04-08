const {
  otpSend,
  fetchAllUsers,
  loginuser,
  createUser,
    passwordChange
} = require("../../controllers/users/userctlr");
const express = require("express");

const userRoute = express.Router();
userRoute.post("/create", createUser);
userRoute.post("/otp", otpSend);
userRoute.post("/passwordChange", passwordChange);
userRoute.post("/login", loginuser);
userRoute.get("/", fetchAllUsers);
module.exports = userRoute;
