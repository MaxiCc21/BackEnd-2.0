const { Router } = require("express");
const DestinationsModel = require("../models/destinations.model");
const { CleanCookie } = require("../utils/my-cookie-handle");
const router = Router();

router.get('/', async (req, res) =>{
    
  try {

    CleanCookie(req, res, 'travelOptions');

    const userSession = req.session.user || undefined


    const getAllDestination = await DestinationsModel.find()
    
    const options =  {
        title:"home",
        userSession,
        destinations : getAllDestination
    }

    res.render("home",options)
  } catch (err) {
    res.status(500).status("Ha ocurrido un Error inesperado, por favor ingrese a la paguina nuevamente mas tarde")
  }
}

)




module.exports = router