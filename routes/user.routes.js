const Usuario = require("../models/User.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const isValidToken = require("../middlewares/user.middleware");

//POST 'api/treatments/create', Crear un nuevo tratamiento 
router.post('/login', async (req, res, next) => {
    const {username, password} = req.body
    
    if(!username || !password) {
        res.status(400).json({message:'Tienes que introducir el usuario y la contraseña'})
        return
    }
    try {
        const user = await Usuario.findOne({username: username})

        if(!user) {
            res.status(400).json({message:'Usuario no escontrado'})
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            res.status(400).json({message:'Contraseña no es valida'})
            return
        }

        const payload = {
            _id : user._id,
            username : user.username,
        }

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: "1d",
        })
        console.log(authToken)
        res.status(200).json({authToken})



    } catch (err) {
        next (err)
    }

})


//GET 'api/user/verify' ==> Decir al Front si quien visita la esta logeado
router.get('/verify', isValidToken, (req, res, next) => {
    res.json({payload: req.payload})
})




module.exports = router;