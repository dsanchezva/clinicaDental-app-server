const Treatment = require("../models/Treatments.model");

const router = require("express").Router();

//POST 'api/treatments/create', Crear un nuevo tratamiento 
router.post('/create', async (req, res, next) => {
   const { name , description } = req.body
    // controlar que todos los campos estan rellenados
   if (!name || !description) {
    res.status(400).json({errorMessage: "Hay que rellenar todos los campos"})
   }
   try {
    await Treatment.create({name, description})
    res.status(200).json('tratamiento creado')

   } catch (err) {
    next(err)
   }


})




module.exports = router;