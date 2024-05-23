const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(colorize(), timestamp(), logFormat),
  transports: [
    new transports.Console(), // Mostrar logs en la consola
    new transports.File({ filename: "logs/error.log", level: "error" }), // Guardar logs de errores en un archivo
    new transports.File({ filename: "logs/combined.log" }), // Guardar todos los logs en un archivo
  ],
  exceptionHandlers: [
    new transports.File({ filename: "logs/exceptions.log" }), // Guardar excepciones no capturadas en un archivo
  ],
  rejectionHandlers: [
    new transports.File({ filename: "logs/rejections.log" }), // Guardar promesas rechazadas no capturadas en un archivo
  ],
});

module.exports = logger;
