const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    type: {type: String, required: true, maxLength: 50},
    water: {
        type: Number,
        required: true,
        min: 1,
        max: 30,
    },
    sunlight: {
        type: String,
        required: true,
        enum: ["Direct", "Bright Indirect", "Moderate", "Low"],
        default: "Direct",
    },
    humidity: {
        type: Number,
        required: true,
        min: 1,
        max: 30,
    },
    picturePath: {type: String, required: false},
    notes: {type: String, required: false, maxLength: 1500},
    
    isWatered: {
        type: Boolean,
        required: false, 
    },
    isMisted: {
        type: Boolean,
        required: false, 
    },
    lastWatered: {
        type: Date,
        required: false, 
    },
    lastMisted: {
        type: Date,
        required: false, 
    },
})

module.exports = mongoose.model("Plant", PlantSchema);