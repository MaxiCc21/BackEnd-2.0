const express = require("express");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const app = express();
const swaggerSetup = require("./config/swagger");
const viewsRouter = require("./routes/views.routes");
const sessionRouter = require("./routes/session.routes");
const searchflyRouter = require("./routes/searchfly.routes");
const destinationRouter = require("./routes/destination.routes");
const checkoutRouter = require("./routes/checkout.routes");
const paymentRouter = require("./routes/payment.routes");

const Handlebars = require("handlebars");
const configureHandlebars = require("./config/handlebars");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("./utils/logger");
const {
  PORT,
  MONGO_URL_DB,
  SECRET_KEY_COOKIE,
  SECRET_KEY_SESSION,
  STRIPE_PRIV_SECRET_KEY,
} = require("./config/config");
app.use(express.json());
app.use("/static", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//todo -----------Swagger------------
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//todo -----------Swagger------------

// configuracion de las cookies
app.use(cookieParser(SECRET_KEY_COOKIE));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL_DB,
      ttl: 10 * 60,
    }),
    secret: SECRET_KEY_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

//--------------- Handlebars ---------------
const helpers = {
  toUperCaseHelper: function (str) {
    console.log("str: ", str);
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  FormDataHelper: function (date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  },

  JsonHelper: function (data) {
    return JSON.stringify(data);
  },
};

for (const helperName in helpers) {
  Handlebars.registerHelper(helperName, helpers[helperName]);
}

configureHandlebars(app);
//--------------- Handlebars ---------------
// !TODO Logger Winston
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`); // Registrar cada solicitud recibida
  next();
});
// !TODO Logger Winston

app.use("/home", viewsRouter);
app.use("/session", sessionRouter);
app.use("/searchfly", searchflyRouter);
app.use("/destination", destinationRouter);
app.use("/checkout", checkoutRouter);
app.use("/api/payment", paymentRouter);
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () =>
  console.log(`La aplicacion esta corriendo en el puerto: ${PORT}!`)
);

try {
  mongoose.connect(MONGO_URL_DB);

  console.log("Coneccion exitosa");
} catch (error) {
  console.log("No se pudo conectar a la BD udando Moongose:" + error);
  process.exit();
}
