const mongoose = require("mongoose");

const treatmentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        default: 'https://res.cloudinary.com/dqdhb1efh/image/upload/v1706783860/b1tsc0yqheasoabxlbkm.jpg',
    }



});

const Treatment = mongoose.model("Treatment", treatmentsSchema);

module.exports = Treatment