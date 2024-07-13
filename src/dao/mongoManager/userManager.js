const UserModel = require("../../models/user.model");

class UserManager {
  GetOneUser = async (query) => {
    try {
      const userdata = await UserModel.findOne(query);

      if (!userdata) {
        return {
          status: 400,
          ok: false,
          error: false,
          stateMsj: "No se encontro ningun usuario",
          data: null,
        };
      }

      return {
        status: 200,
        ok: true,
        error: false,
        stateMsj: "Usuario encontrado",
        data: userdata,
      };
    } catch (err) {
      console.log("error: ,", err);
      return {
        status: 500,
        ok: false,
        error: false,
        stateMsj: "Ocurrio un error inesperado",
        data: null,
      };
    }
  };

  DeleteOneUser = async (query) => {
    try {
      const deleteUser = await UserModel.findOneAndDelete(query);
      if (!deleteUser) {
        return {
          status: 400,
          ok: false,
          error: false,
          stateMsj: "No fue posible encontrar el usuario para eliminarlo",
          data: null,
        };
      }

      return {
        status: 200,
        ok: true,
        error: false,
        stateMsj: "Usuario eliminaro con exito",
        data: null,
      };
    } catch (err) {
      return {
        status: 500,
        ok: false,
        error: false,
        stateMsj: "Ocurrio un error inesperado",
        data: null,
      };
    }
  };

  findOneAndUpdate = async (query) => {
    try {
      const createNewUser = await UserModel.findOneAndUpdate(query);

      if (!createNewUser) {
        return {
          status: 400,
          ok: false,
          error: false,
          stateMsj: "No fue posible modificar el usuario requirido",
          data: null,
        };
      }

      return {
        status: 200,
        ok: true,
        error: false,
        stateMsj: "Usuario actualizado con exito",
        data: null,
      };
    } catch (err) {
      return {
        status: 500,
        ok: false,
        error: false,
        stateMsj: "Ocurrio un error inesperado",
        data: null,
      };
    }
  };
}

module.exports = UserManager;
