const { Router } = require("express");
const DestinationsModel = require("../models/destinations.model");
const { destinationService } = require("../service");

const router = Router();

router.get("/", async (req, res) => {
  try {
    //* Trae todos los datos de Destinos de vuelo
    const destinationData = await destinationService.getAllDestination();

    res.status(200).send(destinationData);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    //* los datos necesarios para crear un nuevo destino
    const newDestination = req.body;

    //* crea un nuevo destino
    const { status, ok, stateMsj, data } =
      await destinationService.createDestination(newDestination);

    res.status(status).send(stateMsj);
  } catch (err) {
    console.log(err);
    res.status(500).send("Algo salio mal al agreagar un nuevo destino");
  }
});

router.delete("/delete/:nickname", async (req, res) => {
  try {
    const { nickname } = req.params;

    //* Elimina un destino, filtrado por su nickname(nombre corto que lo identifica)
    const { status, ok, error, stateMsj, data } =
      await destinationService.deleteDestinatin(nickname);

    res.status(status).send(stateMsj);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al eliminar el destino");
  }
});

module.exports = router;
