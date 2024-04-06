const express = require('express')
const bodyParser = require('body-parser');
const MongoStore = require("connect-mongo")

const app = express()
const URL_MONGO =  "mongodb+srv://maxi21498:Morethanwords21@cluster0.2z3gkua.mongodb.net/AirlFly"

const viewsRouter = require("./routes/views.routes")
const sessionRouter = require("./routes/session.routes")
const searchflyRouter = require("./routes/searchfly.routes")
const destinationRouter= require("./routes/destination.routes")

const Handlebars = require("handlebars");
const configureHandlebars = require('./config/handlebars');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use(express.json());
app.use("/static", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// configuracion de las cookies 
app.use(cookieParser('MyCookiePaswordCoder'));


app.use(session({
    store: MongoStore.create({
      mongoUrl: URL_MONGO,
      ttl: 10 * 60
    }),
    secret: 'secret-key-session-Cod3r', 
    resave: false, 
    saveUninitialized: false 
  }));

//--------------- Handlebars ---------------
const helpers = {
  toUperCaseHelper : function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  FormDataHelper : function (date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

}

for (const helperName in helpers) {
  Handlebars.registerHelper(helperName,helpers[helperName])
}

configureHandlebars(app);
//--------------- Handlebars ---------------

app.use("/home",viewsRouter)
app.use("/session", sessionRouter)
app.use("/searchfly",searchflyRouter)
app.use("/destination",destinationRouter)

const port = 9090

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 


try {
    mongoose.connect(URL_MONGO)

    console.log("Coneccion exitosa");
} catch (error) {
    
    console.log("No se pudo conectar a la BD udando Moongose:" + error);
    process.exit()
}

