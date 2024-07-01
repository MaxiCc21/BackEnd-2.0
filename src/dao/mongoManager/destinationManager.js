const DestinationsModel = require("../../models/destinations.model");
const logger = require("../../utils/logger");

class DestinationManager {
  getAllDestination = async () => {
    try {
      const getData = await DestinationsModel.find();

      if (getData.length === 0) {
        return {
          status: 400,
          ok: false,
          error: true,
          stateMsj: "No se encontro ningun destino",
          data: null,
        };
      }

      return {
        status: 200,
        ok: true,
        error: false,
        stateMsj: "Destinos encontrados",
        data: getData,
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        ok: false,
        stateMsj:
          "Ocurrio un error inesperado, estamos trabajando para solucionarlo MG",
        dsata: null,
      };
    }
  };

  createDestination = async (newDestination) => {
    try {
      const createNewDestination = await DestinationsModel.create(
        newDestination
      );

      if (!createNewDestination) {
        return {
          status: 400,
          ok: false,
          stateMsj: "No se pudo crear un destino",
          data: null,
        };
      }

      return {
        status: 200,
        ok: true,
        error: false,
        stateMsj: "Destino creado con exito",
        data: createNewDestination,
      };
    } catch (err) {
      logger.error(" File destinationManager.js Error:", err);
      return {
        status: 500,
        ok: false,
        stateMsj:
          "Ocurrion un error inesperado, Estamos trabajando para solucionarlo",
        data: null,
      };
    }
  };

  deleteDestinatin = async (nickname) => {
    try {
      const deleteDestination = await DestinationsModel.findOneAndDelete({
        nickname,
      });

      if (!deleteDestination) {
        return {
          status: 400,
          ok: false,
          error: false,
          stateMsj: `No se pudo eliminar el destinio con nickname ${nickname}`,
          data: null,
        };
      }
      return {
        status: 200,
        ok: true,
        error: false,
        stateMsj: "Destino eliminar con exito",
        data: null,
      };
    } catch (err) {
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

module.exports = DestinationManager;
