const {createCrop, fetchcrops, deleteCrop} = require("../../controllers/crop/cropctlr");


const express = require("express");
const crRoute = express.Router();

crRoute.get("/", fetchcrops);
crRoute.post("/add", createCrop);
crRoute.post("/delete", deleteCrop);


module.exports = crRoute;