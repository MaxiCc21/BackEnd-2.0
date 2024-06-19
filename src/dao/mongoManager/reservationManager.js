const reservationModel = require("../../models/reservation.model");

class ReservationManager {
  getReservation = async (lastname, shortCode) => {
    try {
      const reservationData = await reservationModel
        .findOne({ lastname, shortCode })
        .lean();

      if (!reservationData) {
        return {
          status: 400,
          ok: false,
          error: false,
          stateMsj: "No se encontro una reservaion que coincida con los datos",
          data: null,
        };
      }

      return {
        status: 200,
        ok: true,
        error: false,
        stateMsj: "Reservacion encontrada",
        data: reservationData,
      };
    } catch (error) {
      console.log("Error: ", error);
      return {
        status: 500,
        ok: false,
        error: true,
        stateMsj:
          "Ocurrio un error inesperado, estamos trabajando para solucionarlo",
        data: null,
      };
    }
  };

  postReservation = async (data) => {
    try {
      const createReservation = await reservationModel.create(data);

      if (!createReservation) {
        return {
          status: 400,
          ok: false,
          error: true,
          stateMsj:
            "Ocurrio un error al intentar crear una reservacion, por favor inntente nuevamente mas tarde",
          data: null,
        };
      }

      return {
        status: 200,
        ok: true,
        error: false,
        stateMsj: "Pasaje reservado con éxito\n, Lo esperamosa bordo",
        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        ok: false,
        error: true,
        stateMsj:
          "Ocurrio un error inesperado, estamos trabajando para solucionarlo",
        data: null,
      };
    }
  };
}

module.exports = ReservationManager;
