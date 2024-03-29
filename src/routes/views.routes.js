const { Router } = require("express")
const router = Router();

router.get('/', (req, res) =>{
    
    const userSession = req.session.user || undefined

    const options =  {
        title:"home",
        userSession
    }

    res.render("home",options)
}



)




module.exports = router