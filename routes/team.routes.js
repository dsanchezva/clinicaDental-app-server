const Team = require("../models/Team.model");
const uploader = require('../middlewares/cloudinary.middleware');
const isValidToken = require("../middlewares/user.middleware");
const router = require("express").Router();


//POST 'api/team/create' => Crea un nuevo miembro del equipo
router.post('/create', isValidToken, async (req, res, next) => { 
    const {name, description, imgUrl} = req.body
    console.log(req.body)
    if(!name || !description) {
        res.status(404).json( {errorMessage: 'Hay que rellenar todos los campos'})
        return
    }
    try {
        await Team.create({name, description, imgUrl})
        res.status(200).json({message: 'Miembro de equipo creado correctamente'})
    } catch(err) {
        next(err);
    }
})

// PATCH 'api/team/:teamId/edit' => Editat la informacion de el miembro del equipo

router.patch('/:teamId/edit', isValidToken, async (req, res, next) => {
    const {name, description} = req.body
    try {
        await Team.findByIdAndUpdate(req.params.teamId, {name, description})
        res.status(200).json({message: 'Miembro del equipo actualizado'})
    }catch(err) { 
        next(err)
    }
})

//PATCH 'api/team/uploadTeamPic' => Subit a cloudinary la foto del tratamiento
router.patch('/uploadTeamPic', uploader.single('teamPicture'), isValidToken, async (req, res, next) => {
    try {
        if (!req.file) {
            next('No se ha subido ninguna foto')
            return
        }
        res.json({teamPic: req.file.path})
    }catch (err) {
        next(err)
    }

});
//PATCH 'api/team/:teamId/editTeamPic => sibur a la base de datos la foto del tratamiento
router.patch('/:teamId/editTeamPic', isValidToken, async (req, res, next) => {
    const teamId = req.params.teamId
    const imgUrl = req.body.teamPic

    try {
        await Team.findByIdAndUpdate(teamId, {imgUrl})
        res.status(200).json({message: 'Foto actualizada'})

    } catch (err) {
        next(err)
    }
})

//DELETE 'api/team/:teamId/delete
router.delete('/:teamId/delete', isValidToken, async (req, res, next) => {
    const teamId = req.params.teamId
    console.log(teamId)
    try {
        await Team.findByIdAndDelete(teamId)
        res.status(200).json({message: 'Miembro del equipo borrado'})
    } catch (err) {
        next(err)
    }
})

//GET 'api/team/all' => Enviar todos los miembros del equipo

router.get('/teamAll', async (req, res, next) => {

    try {
        const data = await Team.find()
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }


})





module.exports = router;