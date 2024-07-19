const UserModel = require("../../models/user.model");

class UserManager {
  //* GetOneUser busca un usuario, al pedir como dato query, es posible buscar por qualquier campo que requieras
  GetOneUser = async (query) => {
    try {
      const userdata = await UserModel.findOne(query).lean();
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

  createNewUser = async (newData) => {
    try {
      //todo ****************Verificaciones****************
      //* Verifica primero que no exista un usuairo registrado con el mismo email
      const emailAlreadyRegistered = await this.GetOneUser({
        email: newData.email,
      });

      /*
      Si alreadyExist es:
       true | manda un error ya que el email se encuestra registrado
       false | sigue con hilo de ejecucion  
      */
      if (emailAlreadyRegistered.ok) {
        return {
          status: 500,
          ok: false,
          error: false,
          stateMsj: "El email ya se encuentra registrado",
          data: null,
        };
      }

      //* Verifica primero que no exista un usuairo registrado con el mismo DNI
      const dniAlreadyExist = await this.GetOneUser({
        docType: newData.docType,
        docNumber: newData.docNumber,
      });
      /*
          Si alreadyExist es:
           true | manda un error ya que el dni se encuestra registrado
           false | sigue con hilo de ejecucion  
          */
      if (dniAlreadyExist.ok) {
        return {
          status: 500,
          ok: false,
          error: false,
          stateMsj: "El numero de D.N.I ya se encuentra registrado",
          data: null,
        };
      }
      //todo ****************Verificaciones****************

      //* con los datos resividos crea un nuevo usuario
      const createNewUser = await UserModel.create(newData);

      if (!createNewUser) {
        return {
          status: 500,
          ok: false,
          error: false,
          stateMsj:
            "No fue posible crear el usuario, intente nuevamente mas tarde",
          data: null,
        };
      }

      return {
        status: 200,
        ok: true,
        error: false,
        stateMsj: "Usuario registrado con exito",
        data: null,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        ok: false,
        error: false,
        stateMsj:
          "Ocurrio un error inesperado, por favor intente nuevamente mas tarde",
        data: null,
      };
    }
  };
}

module.exports = UserManager;
