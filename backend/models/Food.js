const mongoose = require("mongoose");
const FoodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true 
    },
    DaysSinceEaten: {
        type: Number,
        required: true
    },
});

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;