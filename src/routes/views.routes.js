const { Router } = require("express");
const { CleanCookie } = require("../utils/my-cookie-handle");
const logger = require("../utils/logger");
const { destinationService } = require("../service");
const router = Router();

router.get("/", async (req, res) => {
  try {
    //* limpia una cookie, necesaria para hacer la compra del pasaje
    CleanCookie(req, res, "travelOptions");

    const userSession = req.session.user || undefined;

    //* Recobra todos los datos de destinos que exista, para poder cargarlas en el home
    const { data: destinations } = await destinationService.getAllDestination();

    const options = {
      title: "home",
      userSession,
      destinations,
    };
    logger.info("Handling GET request for /");
    res.render("home", options);
  } catch (err) {
    res
      .status(500)
      .status(
        "Ha ocurrido un Error inesperado, por favor ingrese a la paguina nuevamente mas tarde"
      );
  }
});

module.exports = router;
