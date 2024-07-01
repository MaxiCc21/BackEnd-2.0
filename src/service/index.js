const DestinationManager = require("../dao/mongoManager/destinationManager");
const ReservationManager = require("../dao/mongoManager/reservationManager");

const reservationService = new ReservationManager();
const destinationService = new DestinationManager();

module.exports = {
  destinationService,
  reservationService,
};
