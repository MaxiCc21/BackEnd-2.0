const {Router} = require('express')

const router = Router();


router.get("/passengers", async (req, res) => {
try {
    const {travelOptions} = req.cookies;
    
    if (travelOptions) {
        const { date, price,from } = JSON.parse(travelOptions);
        res.send(`Fecha: ${date}, Precio: ${price}, From: ${from}`);
    } else {
        res.send('No hay datos de viaje guardados en la cookie');
    }
} catch (err) {
    console.log(err);
    res.send(err)
}
});


module.exports = router