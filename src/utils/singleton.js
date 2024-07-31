const { logger } = require("../utils/logger");
const { connect } = require("mongoose");
const { MONGO_URL_DB } = require("../config/config");

class MongoSingleton {
  static #instance;
  constructor() {
    connect(MONGO_URL_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  static getInstance() {
    if (this.#instance) {
      logger.info("Base de datos ya está creada");

      return this.#instance;
    }
    this.#instance = new MongoSingleton();

    logger.info("Base de dato creada");
    return this.#instance;
  }
}

module.exports = {
  MongoSingleton,
};
