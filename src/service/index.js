const aircraftManager = require("../dao/mongoManager/aircraftManager");
const DestinationManager = require("../dao/mongoManager/destinationManager");
const flightManager = require("../dao/mongoManager/flightManager");
const ReservationManager = require("../dao/mongoManager/reservationManager");
const UserManager = require("../dao/mongoManager/userManager");

const reservationService = new ReservationManager();
const destinationService = new DestinationManager();
const flightService = new flightManager();
const aircraftService = new aircraftManager();
const userService = new UserManager();

module.exports = {
  destinationService,
  flightService,
  reservationService,
  aircraftService,
  userService,
};
