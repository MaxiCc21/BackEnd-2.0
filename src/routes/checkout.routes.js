const { Router } = require("express");
const reservationModel = require("../models/reservation.model");

const router = Router();

router.get("/passengers", async (req, res) => {
  try {
    const { travelOptions } = req.cookies;

    if (travelOptions) {
      const { date, price, from } = JSON.parse(travelOptions);
      // res.send(`Fecha: ${date}, Precio: ${price}, From: ${from}`);
      res.render("checkout/passenger");
    } else {
      res.redirect("/home");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/passengers", async (req, res) => {
  /* 
 Todo Para no hacerla larga, creo la reserva en esta instancia
 */
  try {
    let currentValue = JSON.parse(req.cookies.travelOptions);

    // const newCookieValue = {
    //   ...currentValue,
    //   ...req.body,
    // };
    const flightReservationData = {
      ...currentValue,
      ...req.body,
    };

    // res.cookie("travelOptions", JSON.stringify(newCookieValue), {
    //   maxAge: 900000,
    //   httpOnly: true,
    // });

    const createReservation = await reservationModel.create(
      flightReservationData
    );

    if (createReservation) {
      return res.status(200).send({
        status: 200,
        ok: true,
        error: false,
        stateMsj: "Pasaje reservado con éxito\n, Lo esperamosa bordo",
        data: null,
      });
    } else {
      throw Error;
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      ok: false,
      error: false,
      stateMsj: "Ha ocurrido un error inesperado",
      data: null,
    });
  }
});
module.exports = router;
