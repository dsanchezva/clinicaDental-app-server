const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
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
        default: 'https://res.cloudinary.com/dqdhb1efh/image/upload/v1704718316/no-fotos_mihqdq.png',
    }



});

const Team = mongoose.model("Treatment", teamSchema);

module.exports = Team