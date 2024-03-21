const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const port = 3000

const viewsRouter = require("./routes/views.routes")

const configureHandlebars = require('./config/handlebars')

app.use("/static", express.static(__dirname + "/public"));
//--------------- Handlebars ---------------
configureHandlebars(app);
//--------------- Handlebars ---------------

app.use("/home",viewsRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 

// Verifica la conexión
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos.');
});
