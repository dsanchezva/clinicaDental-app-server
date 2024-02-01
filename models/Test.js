const bcrypt = require("bcryptjs");
const User = require("./User.model");

const añadirUser =  async (req, res, next) => {
    console.log(req)
    const {username, password} = req
    try {
    const salt = await bcrypt.genSalt(12)
    const cryptedPassword = await bcrypt.hash(password, salt)

    console.log(cryptedPassword)
    console.log(username)
    
    await User.create({username, password: cryptedPassword})
    const isPasswordValid = await bcrypt.compare(cryptedPassword, password);

    console.log(isPasswordValid)
    } catch (err) {
        console.log(err)
    }


}


añadirUser({username: 'admin', password: 'ClinicaDentalEstrella2024'})