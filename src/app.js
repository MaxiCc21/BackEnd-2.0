const express = require('express')
const bodyParser = require('body-parser');
const app = express()


const viewsRouter = require("./routes/views.routes")
const sessionRouter = require("./routes/session.routes")
const searchflyRouter = require("./routes/searchfly.routes")

const configureHandlebars = require('./config/handlebars');
const { default: mongoose } = require('mongoose');


app.use(express.json());
app.use("/static", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
//--------------- Handlebars ---------------
configureHandlebars(app);
//--------------- Handlebars ---------------

app.use("/home",viewsRouter)
app.use("/session", sessionRouter)
app.use("/searchfly",searchflyRouter)


const port = 9090

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 


const URL_MONGO =  "mongodb+srv://maxi21498:Morethanwords21@cluster0.2z3gkua.mongodb.net/AirlFly"

try {
    mongoose.connect(URL_MONGO)

    console.log("Coneccion exitosa");
} catch (error) {
    
    console.log("No se pudo conectar a la BD udando Moongose:" + error);
    process.exit()
}

