const flightRouteModel = require("../../models/flightRoute.mode");
const logger = require("../../utils/logger");

class flightManager {
  //* Esta funcion verifica si exites la ruta que se esta buscando, don el from ej "EZE"
  getOneFlight = async (nickName) => {
    try {
      const searchFlight = await flightRouteModel.findOne({ origin: nickName });

      if (!searchFlight) {
        return {
          status: 400,
          ok: false,
          error: true,
          stateMsj: "No fue posiible encontrar el destino",
          data: null,
        };
      }

      return {
        status: 200,
        ok: true,
        error: false,
        stateMsj: "Destino encotrado",
        data: searchFlight,
      };
    } catch (err) {
      logger.error("File figlthManager.js Erorr: ", err);
      return {
        status: 500,
        ok: false,
        error: false,
        stateMsj:
          "Ocurrion un error inesperado, Estamos trabajando para solucionarlo",
        data: null,
      };
    }
  };
}

module.exports = flightManager;
