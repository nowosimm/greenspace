const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    type: {type: String, required: true, maxLength: 50},
    water: {
        type: String,
        required: true,
        enum: ["Keep Moist", "Top 1/3", "Top 1/2", "Dry Out"],
        default: "Keep Moist",
    },
    sunlight: {
        type: String,
        required: true,
        enum: ["Direct", "Bright Indirect", "Moderate", "Low"],
        default: "Direct",
    },
    humidity: {
        type: String,
        required: true,
        enum: ["Extreme", "High", "Moderate", "Low"],
        default: "Extreme",
    },
    notes: {type: String, required: false, maxLength: 1500},
})

module.exports = mongoose.model("Plant", PlantSchema);