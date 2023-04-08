const expressAsyncHandler = require("express-async-handler");

const crop = require("../../models/crop");


const createCrop = expressAsyncHandler(async (req, res) => {
    const { cropname, seller, price, weight } = req?.body;
    try {
        const c = await crop.create({ cropname, seller, price, weight });
        res.json(c);
    } catch (error) {
        res.json(error);
    }
});
const deleteCrop = expressAsyncHandler(async (req, res) => {
    const { id_ } = req?.body;
    console.log(id_);
    try {
        const c = await crop.deleteOne({ id_ });
        res.json(c);
    } catch (error) {
        res.json(error);
    }
});

const fetchcrops = expressAsyncHandler(async (req, res) => {

    try {
        const fetchAll = await crop.find({});
        res.json(fetchAll);
    } catch (error) {
        res.json(error);
    }
});


module.exports = {createCrop, fetchcrops, deleteCrop};