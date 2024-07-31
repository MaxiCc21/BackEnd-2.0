const dotenv = require("dotenv");
const commander = require("../process/comander");
const { mode } = commander.opts(); //opts se guardan las configuraciones que nosotros creamos y acedemos a la propiedad mode para poder trabajar en distintos entornos
dotenv.config({
  path: mode === "production" ? "./.env.production" : "./.env.development",
});

module.exports = {
  PORT: process.env.PORT,
  PROD_ACCESS_TOKEN: process.env.PROD_ACCESS_TOKEN,
  PRIVATE_KEY: process.env.PRIVATE_KEY_CODER,

  SECRET_KEY_COOKIE: process.env.SECRET_KEY_COOKIE,

  SECRET_KEY_SESSION: process.env.SECRET_KEY_SESSION,

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PRIV_SECRET_KEY: process.env.STRIPE_PRIV_SECRET_KEY,

  MONGO_URL_DB: process.env.MONGO_URL_DB,

  GMAIL_USER_APP: process.env.GMAIL_USER_APP,
  GMAIL_PASS_APP: process.env.GMAIL_PASS_APP,

  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,

  PERSISTENCE: process.env.PERSISTENCE,
  MAILER_USER_GMAIL: process.env.MAILER_USER_GMAIL,
  MAILER_USER_PASS: process.env.MAILER_USER_PASS,
};
