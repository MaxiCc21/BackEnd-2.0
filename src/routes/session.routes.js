const { Router } = require("express");
const UserModel = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/bcrypt");


const router = Router()


router.get("/acceso",(req,res) => {

    const options = {
        title:"Usuario"
    }
    
    res.render("user/user_login",options)
})


router.post("/acceso", async (req,res) => {
    
    try {
        const {email,password} = req.body

        const userExist = await UserModel.findOne({email})
    
        if (!userExist) {
            return res.status(400).send({
                status:"Error",
                ok:false,
                statusMessage:"Alguno de los datos es incorrecto"
            })
        }


        if ( await comparePassword(password,userExist.password)) {

            req.session.user = {
                id: userExist._id,
                email: userExist.email,
                name: userExist.name
            }

            return res.send({
                status:"ok",
                ok:true,
                statusMessage:"Bienvenido"
            })
        }else{
            return res.status(400).send({
                status:"Error",
                ok:false,
                statusMessage:"Alguno de los datos es incorrecto"
            })
        }
    } catch (error) {
            return res.status(500).send({
                status:"Error",
                ok:false,
                statusMessage:"Ocurrio un error inesperado /n Por favor intente nuevamente mas tarde"
            })
    }
})


router.get("/registro",(req,res) => {
    const options = {
        title:"Crear Usuario"
    }
    

    res.render("user/user_register",options)
})


router.post("/registro", async (req, res) => {
    try {
        const { email } = req.body;

        let newUserData = {
            ...req.body,
            password: "Pass1234"
        };

        const encryptedPassword = await hashPassword(newUserData.password)

        newUserData = {
            ...req.body,
            password: encryptedPassword
        };

        const createNewUser = await UserModel.findOneAndUpdate(
            { email },
            newUserData,
            { upsert: true, new: true }
        );


        if (createNewUser) {
            res.send("Usuario creado correctamente");
        } else {
                console.error('El Usuario ya existe');
                res.status(500).send("El Usuario ya existe");
        }
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).send("Error al crear usuario");
    }
});


router.delete("/registro/:email",async (req,res) => {
    
    try {
        // const {email} = req.body
        const userEmail = req.params.email;

        const deleteUser = await UserModel.findOneAndDelete({email:userEmail})
        
        if (deleteUser.deletedCount != 1) {
            res.send("Usuario eliminado correctamente");
        } else {
            res.status(404).send("Usuario no encontrado");
        }

    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send("Error al eliminar usuario: " + error.message);
    }

})


router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error al cerrar sesión");
        }
        res.redirect("/home");
    });
});


router.get("/userdata",async (req,res) => {
    

    try {
        const userSession = req.session.user || undefined
        const {_id} = req.session.user
    
        const userData = await UserModel.findOne(_id).lean();
    
        
    
        const options = {
            title:"Datos de usuario",
            userData,
            userSession
        }
    
        res.render("user/userData",options) 
    } catch (err) {
        res.status(500).send("Algo salio mal")
    }
})




module.exports = router