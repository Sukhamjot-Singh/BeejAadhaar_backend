const cors = require("cors");
const cropRoute = require("./routes/crop/cropRoute");
const userRoute = require("./routes/users/usersRoute");
const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/dbConnect");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
// const usersRoute = require("./routes/users/usersRoute");
// const incomeRoute = require("./routes/income/incomeRoute");
// const expRoute = require("./routes/expenses/expenseRoute");
const app = express();

app.use(cors());
//env
dotenv.config();

//database connect
db();

//middleware
app.use(express.json()); // to allow posting json data

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the Expense Tracker!" });
});


app.use("/crop", cropRoute);
app.use("/user", userRoute);


// error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
