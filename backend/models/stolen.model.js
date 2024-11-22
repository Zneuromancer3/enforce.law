const mongoose = require("mongoose");

const currentDate = new Date();

const StolenItemSchema = mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
        },

        station: {
            type: String,
            required: true
        },
        
        image: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const StolenItems = mongoose.model("Stolen Items", StolenItemSchema)

module.exports = StolenItems