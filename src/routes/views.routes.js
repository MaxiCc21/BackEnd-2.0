const { Router } = require("express")
const router = Router();

router.get('/', (req, res) =>{

    const options =  {
        title:"home"
    }

    res.render("home",options)
}



)




module.exports = router