const isValidToken = require("../middlewares/user.middleware");
const Treatment = require("../models/Treatments.model");
const uploader = require('../middlewares/cloudinary.middleware')

const router = require("express").Router();



//POST 'api/treatments/create', Crear un nuevo tratamiento 
router.post('/create', isValidToken, async (req, res, next) => {
   const { name , description, imgUrl } = req.body
    // controlar que todos los campos estan rellenados
   if (!name || !description) {
    res.status(400).json({errorMessage: "Hay que rellenar todos los campos"})
    return
   }
   try {
    await Treatment.create({name, description, imgUrl})
    res.status(200).json({message: 'Tratamiento creado'})

   } catch (err) {
    next(err)
   }
})

//PATCH 'api/treatments/:treatmentId/edit', Editar un tratamiento
router.patch('/:treatmentId/edit',isValidToken, async (req, res, next) => {
    const {name, description} = req.body
    try {
        await Treatment.findByIdAndUpdate(req.params.treatmentId, {name, description})
        res.status(200).json({message: 'Tratamiento actualizado'})
    } catch (err) {
        next(err)
    }
})
//PATCH 'api/treatments/uploadTreatmentPic' => Subit a cloudinary la foto del tratamiento
router.patch('/uploadTreatmentPic', uploader.single('treatmentPicture'), isValidToken, async (req, res, next) => {
    try {
        if (!req.file) {
            next('No se ha subido ninguna foto')
            return
        }
        res.json({treatmentPic: req.file.path})
    }catch (err) {
        next(err)
    }

});
//PATCH 'api/treatments/editTreatmentPic => sibur a la base de datos la foto del tratamiento
router.patch('/:treatmentId/editTreatmentPic', isValidToken, async (req, res, next) => {
    const treatmentId = req.params.treatmentId
    const imgUrl = req.body.treatmentPic

    try {

        await Treatment.findByIdAndUpdate(treatmentId, {imgUrl})
        res.status(200).json({message: 'Foto actualizada'})

    } catch (err) {
        next(err)
    }
})
//DELETE 'api/treatments/:treatmentId/delete' => borrar el tratamiento de la base de datos
router.delete('/:treatmentId/delete', isValidToken, async (req, res, next) => {
const treatmentId = req.params.treatmentId
console.log(treatmentId)
try {
    await Treatment.findByIdAndDelete(treatmentId)
    res.status(200).json({message: 'Tratamiento borrado'})
}catch (err) {
    next(err)
}
})

//GET 'api/treatments/all' => Enviar todos los tratamietnos
router.get('/treatmentAll', async (req, res, next) => {

    try{
        const data = await Treatment.find()
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }

})





module.exports = router;