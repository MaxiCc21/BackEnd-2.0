const ReservationManager = require("../dao/mongoManager/reservationManager");

const reservationService = new ReservationManager();

module.exports = {
  reservationService,
};
