const { Router } = require("express");
const flightRouteModel = require("../models/flightRoute.mode");
const AircraftModel = require("../models/aircraft.model");


const router = Router()



router.get("/",async (req,res) => {
  
    /*
    TODO 1) FROM tiene que envia el nick name del las privincias
    TODO 2) 
    */
    
    try {
        let {from, ticketClass,not:numberOfTicket,dateFlight} = req.query

        from = "EZE"
    
        const searchFlight = await flightRouteModel.findOne({origin:from})
        
        const statusAircraft = await AircraftModel.findOne({airlineId:searchFlight.aircraftId[0]})
    
        if (statusAircraft.status) {
            console.log("Todo bien el avion");
        }else{
            console.log("Todo mal con el avion");
        }
        
        const options = {
            ticketData : {
                from,
                ticketClass,
                numberOfTicket,
                dateFlight
            },
        }


        res.render("calender",options)
    } catch (err) {
        res.status(500).send("Ha ocurrido un error inesperado, intente nuevamente mas tarde")
    }
})

// router.get("/callender", async (req, res) => {
//     res.render("calender")
// })



router.post('/', (req, res) => {
    const { date, price ,from} = req.body;
    res.cookie('travelOptions', JSON.stringify({ date, price,from }), { maxAge: 900000, httpOnly: true });
    res.render('home');
});
module.exports = router