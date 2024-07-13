const AircraftModel = require("../../models/aircraft.model");
const logger = require("../../utils/logger");

class aircraftManager {
  getOneAirCraft = async (searchFlightData) => {
    try {
      const statusAircraft = await AircraftModel.findOne({
        airlineId: searchFlightData.aircraftId[0],
      });

      if (!statusAircraft) {
        return {
          status: 400,
          ok: false,
          error: false,
          stateMsj: "No se encontro un avion",
          data: null,
        };
      }

      if (statusAircraft.status) {
        return {
          status: 200,
          ok: true,
          error: false,
          stateMsj: "Avion encontrado y listo para volar",
          data: statusAircraft,
        };
      } else {
        return {
          status: 400,
          ok: false,
          error: true,
          stateMsj:
            "No se encontro un avion disponible, intente nuvament mas tarde",
          data: undefined,
        };
      }
    } catch (err) {
      logger.error("File AircraftManager.js Error: ", err);
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

module.exports = aircraftManager;
