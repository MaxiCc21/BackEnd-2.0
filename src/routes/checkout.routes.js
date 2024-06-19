const { Router } = require("express");
const reservationModel = require("../models/reservation.model");
const { reservationService } = require("../service");

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

    const { status, ok, error, stateMsj, data } =
      await reservationService.postReservation(flightReservationData);

    return res.status(status).send({
      status,
      ok,
      error,
      stateMsj,
      data,
    });
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

router.get("/reservation", async (req, res) => {
  try {
    const { lastname, code } = req.query;
    if (!lastname || !code) {
      res.redirect("/home");
    }

    const { status, ok, error, stateMsj, data } =
      reservationService.getReservation(lastname, code);

    if (!ok) {
      res.redirect("/home");
    }

    res.status(status).send(data);
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
});

router.post("/reservation", async (req, res) => {
  const { lastname, reservationCode: shortCode } = req.body;
  try {
    // verifica si existe la reservacion
    const { status, ok, error, stateMsj, data } =
      reservationService.getReservation(lastname, code);

    res.status(status).send({
      status,
      ok,
      error,
      stateMsj,
      data,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      ok: false,
      error: false,
      stateMsj: "Ocurrio un erro inesperado",
      data: null,
    });
  }
});
module.exports = router;
