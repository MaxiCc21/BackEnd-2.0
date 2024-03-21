const exphbs = require("express-handlebars");
const path = require("path");

function configureHandlebars(app) {
  app.engine(
    "handlebars",
    exphbs.engine({
      defaultLayout: "main",
      extname: ".handlebars",
      layoutsDir: path.join(__dirname, "../views/layouts"),
      partialsDir: path.join(__dirname, "../views/partials"),
    })
  );

  app.set("view engine", "handlebars");
  app.set("views", path.join(__dirname, "../views"));
}

module.exports = configureHandlebars;
