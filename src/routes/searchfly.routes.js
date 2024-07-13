const { Router } = require("express");
const { flightService, aircraftService } = require("../service");

const router = Router();

router.get("/", async (req, res) => {
  /*
    TODO 1) FROM tiene que envia el nick name del las privincias
    TODO 2) 
    */

  try {
    let { from, ticketClass, not: numberOfTicket, dateFlight } = req.query;

    from = "EZE";

    //* busca si exites la ruta del pasaje, con el from
    const searchFlight = await flightService.getOneFlight(from);

    if (!searchFlight.ok) {
      console.log(searchFlight.stateMsj);
    }

    //* Verifica si hay un avino disponible, para realizare l vuelo
    const statusAircraft = await aircraftService.getOneAirCraft(
      searchFlight.data
    );
    if (!statusAircraft.ok) {
      console.log(statusAircraft.stateMsj);
    }

    const options = {
      ticketData: {
        from,
        ticketClass,
        numberOfTicket,
        dateFlight,
      },
    };

    res.render("calender", options);
  } catch (err) {
    res
      .status(500)
      .send("Ha ocurrido un error inesperado, intente nuevamente mas tarde");
  }
});

// router.get("/callender", async (req, res) => {
//     res.render("calender")
// })

router.post("/", (req, res) => {
  const { date, price, from } = req.body;
  res.cookie("travelOptions", JSON.stringify({ date, price, from }), {
    maxAge: 900000,
    httpOnly: true,
  });
  res.render("home");
});
module.exports = router;
