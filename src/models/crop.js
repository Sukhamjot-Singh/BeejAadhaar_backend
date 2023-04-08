const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const cropSchema = mongoose.Schema(
    {
        cropname: {
            type: String,
            required: [true, "Crop Name is required"],
        },
        seller: {
            type: String,
            required: [true, "Seller is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        weight: {
            type: String,
            required: [true, "Weight is required"],
        },
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     required: [true, "user is required"],
        // },
    },
    {
        timestamps: true,
        // toJSON: {
        //   virtuals: true,
        // },
        // toObject: {
        //   virtuals: true,
        // },
    }
);

// expenseSchema.plugin(mongoosePaginate);

const crop = mongoose.model("crop", cropSchema);
module.exports = crop;
