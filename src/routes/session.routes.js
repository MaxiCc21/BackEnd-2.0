const { Router } = require("express");

const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { sendPasswordResetEmail } = require("../utils/sendMail");
const { userService } = require("../service");

const router = Router();

router.get("/acceso", (req, res) => {
  const options = {
    title: "Usuario",
  };

  res.render("user/user_login", options);
});

router.post("/acceso", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await userService.GetOneUser({ email });

    if (!userExist.ok) {
      return res.status(400).send({
        status: 400,
        ok: false,
        stateMsj: "El email ingresado no corresponde a un usuario registrado",
      });
    }

    const samePassword = await comparePassword(
      password,
      userExist.data.password
    );
    if (samePassword) {
      req.session.user = {
        id: userExist.data._id,
        email: userExist.data.email,
        name: userExist.data.name,
      };

      return res.status(200).send({
        status: "ok",
        ok: true,
        stateMsj: "Bienvenido",
      });
    } else {
      return res.status(400).send({
        status: "Error",
        ok: false,
        stateMsj: "La contraseña es incorrecta",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      ok: false,
      statusMessage:
        "Ocurrio un error inesperado /n Por favor intente nuevamente mas tarde",
    });
  }
});

router.get("/registro", (req, res) => {
  const options = {
    title: "Crear Usuario",
  };
  res.render("user/user_register", options);
});

router.post("/registro", async (req, res) => {
  try {
    let newUserData = {
      ...req.body,
      password: "Pass1234",
    };

    const encryptedPassword = await hashPassword(newUserData.password);

    newUserData = {
      ...req.body,
      password: encryptedPassword,
    };

    const createNewUser = await userService.createNewUser(newUserData);

    res.status(createNewUser.status).send(createNewUser);
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      ok: false,
      error: false,
      stateMsj:
        "Ocurrio un error inesperado, por favor intente nuevamente mas tarde",
      data: null,
    };
  }
});

router.delete("/registro/:email", async (req, res) => {
  try {
    // const {email} = req.body
    const userEmail = req.params.email;

    const deleteUser = await userService.DeleteOneUser({ email: userEmail });

    if (!deleteUser.ok) {
      res.send("Usuario eliminado correctamente");
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).send("Error al eliminar usuario: " + error.message);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error al cerrar sesión");
    }
    res.redirect("/home");
  });
});

router.get("/userdata", async (req, res) => {
  // Muestra los datos del usuario, que inicio sesion
  try {
    const userSession = req.session.user || undefined;
    const ID = userSession.id;

    const userData = await userService.GetOneUser({ _id: ID });

    const options = {
      title: "Datos de usuario",
      userData: userData.data,
      userSession,
    };

    res.render("user/userData", options);
  } catch (err) {
    res.status(500).send("Algo salio mal");
  }
});

router.get("/recuperarContrasena", async (req, res) => {
  // Carga un render para recuperar contraseña
  res.render("user/recoverPassword");
});

router.post("/recuperarContrasena", async (req, res) => {
  // Envia un mail de verificacion, para realizar el cambio de contraseña
  try {
    let { email_recoverPassword } = req.body;

    const findUpdatePassword = await userService.GetOneUser({
      email: email_recoverPassword,
    });

    if (!findUpdatePassword.ok) {
      res.status(400).send({
        status: 400,
        ok: false,
        error: false,
        stateMsj: "No se ha encontrado un suario con ese email",
        data: null,
      });
    } else {
      const enviarEmail = await sendPasswordResetEmail(email_recoverPassword);

      if (enviarEmail) {
        res.status(200).send({
          status: 200,
          ok: true,
          error: false,
          stateMsj: "Se le envio un mensaje a su correo electronico",
          data: null,
        });
      } else {
        res.status(400).send({
          status: 400,
          ok: false,
          error: true,
          stateMsj: "Ocurrio un error inesperado al inviar el email",
          data: null,
        });
      }
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      status: 500,
      ok: false,
      error: err,
      stateMsj: "Ah ocurrido un error inesperado",
      data: null,
    });
  }
});

router.get("/cambiar-contrasena", async (req, res) => {
  try {
    const { token } = req.query;
    const user = await userService.GetOneUser({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user.ok) {
      return res
        .status(400)
        .send(
          "El enlace de restablecimiento de contraseña es inválido o ha expirado."
        );
    }

    res.render("user/changePassword");
  } catch (err) {
    res.status(500).send("Ocurrió un error");
  }
});

router.post("/cambiar-contrasena", async (req, res) => {
  // Cambia la contraseña vieja por la nueva ingresada por el usuario
  try {
    const { token, newPassword } = req.body;

    if (!token) {
      return res.status(400).send("Token no proporcionado.");
    }

    const user = await userService.GetOneUser({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user.ok) {
      return res
        .status(400)
        .send(
          "El enlace de restablecimiento de contraseña es inválido o ha expirado."
        );
    }

    const { data: userData } = user;

    userData.password = await hashPassword(newPassword);
    userData.resetPasswordToken = undefined;
    userData.resetPasswordExpires = undefined;
    await userData.save();

    res.send("Contraseña restablecida con éxito.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Ocurrió un error.");
  }
});

module.exports = router;
