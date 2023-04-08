const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");


//registration
const otpSend = expressAsyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req?.body;
  console.log(email);

  try {

    const otp = 123;

    // let testAccount = await nodemailer.createTestAccount();

    // // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: 'agarwalnaman35@gmail.com',
    //     pass: 'naman015', // generated ethereal password
    //   },
    // });

    // // send mail with defined transport object
    // let info = await transporter.sendMail({
    //   from: "agarwalnaman35@gmail.com", // sender address
    //   to: email,
    //   subject: "OTP Verification", // Subject line
    //   text:
    //       "Your OTP is : " + otp, // plain text body
    // });
    //
    // console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //
    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // const user = await User.create({ email, firstname, lastname, password });
    res.status(200).json({ email:email, firstname:firstname, lastname:lastname, password:password, otp:otp });
  } catch (error) {
    res.json(error);
  }
});

//create user
const createUser = expressAsyncHandler(async (req, res) => {
  // console.log(req?.body.state);

  const { email, firstname, lastname, password } = req?.body.state;

  const userExists = await User.findOne({ email }); // handle custom error handlers outside catch.
  if (userExists) throw new Error("User Exists");
  try {

    const user = await User.create({ email, firstname, lastname, password });
    res.status(200).json(user);
    // console.log("user created");
  } catch (error) {
    res.json(error);
  }
});

//password change
const passwordChange = expressAsyncHandler(async (req, res) => {
  // console.log(req?.body.state);
  const { email, password } = req?.body;
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(password, salt);

  // const userExists = await User.findOne({ email });
  let ret={};
  try {
  // if(userExists)
    ret = await User.findOneAndUpdate({email:email}, {password:pass});
  // else
  //   ret = {"msg":"UserNotFound"};

    res.status(200).json(ret);

  } catch (error) {
    res.json(error);
  }
});





//fetch all users from the database
const fetchAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json({ error: error.message });
  }
});

//logins
const loginuser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  const userFound = await User.findOne({ email });

  //check password
  if (userFound && (await userFound.isPasswordMatch(password))) {
    res.json({
      _id: userFound?._id,
      email: userFound?.email,
      firstname: userFound?.firstname,
      lastname: userFound?.lastname,
    });
  } else {
    res.status(401);
    throw new Error("Invalid User Credentials!");
  }
});

module.exports = { otpSend, fetchAllUsers, loginuser, createUser, passwordChange };
