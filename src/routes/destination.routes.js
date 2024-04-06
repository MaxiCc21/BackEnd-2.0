const { Router } = require("express");
const DestinationsModel = require("../models/destinations.model");

const router = Router()


router.get("/get",async (req,res) => {
    try {
        const destinationData = await DestinationsModel.find()

        res.status(200).send(destinationData)
    } catch (err) {
        res.status(500).send(err)
    }

})


router.post("/post", async (req,res) => {
    
    try {
        const newDestination = req.body

        const createNewDestination = await DestinationsModel.create(newDestination)
    
        res.status(200).send("Todo bien")

    } catch (err) {
        console.log(err);
        res.status(500).send("Algo salio mal al agreagar un nuevo destino")
    }

})

router.delete("/delete/:nickname", async (req,res) => {
    
    try {
        const {nickname} = req.params;
        const deleteDestination = await DestinationsModel.findOneAndDelete({ nickname });
        if (!deleteDestination) {
            return res.status(404).send("Destino no encontrado");
        }
        res.status(200).send("Destino eliminado con éxito");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al eliminar el destino");
    }
});



module.exports = router