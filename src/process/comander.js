const { Command } = require("commander");
const commander = new Command();

commander.option(
  "--mode <type>",
  "Modo de ejecución de la aplicación",
  "development"
);

// Parsear los argumentos de la línea de comandos
commander.parse(process.argv);

module.exports = commander;
