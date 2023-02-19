const {
  createUser,
  verifyCredentials,
  getAllUsers,
  eliminarUsuario,
  modificarUsuario,
  eliminarServContrataAlEliminarUsuario
  
} = require("./consultas");
const ErrorResponse = require("../helpers/errorResponse");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/config/config.env" });
const JWT_SECRET_WORD = process.env.JWT_SECRET_WORD;

/* CREAR USUARIO */
exports.create = async (req, res, next) => {
  try {
    const { nombre, apellido, email, password } = req.body;
    if (![nombre, apellido, email, password].includes("")) {
      const usuario = {
        nombre,
        apellido,
        email,
        password,
      };

      console.log(usuario);
      await createUser(usuario);
      return res.status(200).json({ status: 200, message: "Usuario creado" });
    } else {
      return res.send("Los campos no pueden ir vacíos");
    }
  } catch (err) {
    next(
      new ErrorResponse("Error, no ha sido posible crear usuario" + err + 404)
    );
  }
};

/* LOGIN USUARIO */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("Ingrese un email y un password", 400));
    }
    const valorBool = await verifyCredentials(email, password);
    if (!valorBool) {
      return next(new ErrorResponse("Las credenciales son incorrectas", 400));
    }
    const token = jwt.sign({ email }, JWT_SECRET_WORD);
    res.status(200).json({ usuario: email, token: token });
  } catch (err) {
    next(
      new ErrorResponse("Error, no ha sido posible iniciar sesión" + err + 404)
    );
  }
};

/* OBTENER 1 USUARIO */
exports.getUser = async (req, res, next) => {
  try {
    return res.json(req.usuario);
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible obtener el usuario" + err + 404
      )
    );
  }
};

/* OBTENER USUARIOS */
exports.getUsers = async (req, res, next) => {
  try {
    const usuarios = await getAllUsers();
    res.json(usuarios);
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible obtener el usuario" + err + 404
      )
    );
  }
};

/* ELIMINAR USUARIO */

exports.deleteUser = async (req, res, next) => {
  try {
    const { id_usuario } = req.body;

    if (id_usuario != "") {

      await eliminarServContrataAlEliminarUsuario(id_usuario);
      await eliminarUsuario(id_usuario);
      
      res.status(200).json({
        status: 200,
        estado: `Usuario con el id ${id_usuario}, eliminado exitósamente`,
      });
    } else {
      res.status(400).json({
        status: 400,
        estado: "Error, id no detectado",
      });
    }
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible eliminar el usuario " + err.message + 404
      )
    );
  }
};

/* MODIFICAR USUARIO */
exports.editUser = async (req, res, next) => {
  try {
    
    const { id_usuario,nombre, apellido, email, password } = req.body;
    if (![id_usuario, nombre, apellido, email, password].includes("")) {
      await modificarUsuario(id_usuario, nombre, apellido, email, password);

      res.status(200).json({
        status: 200,
        estado: `El usuario con id ${id_usuario}, ha sido modificado exitósamente `,
      });
    } else {
      res.status(400).json({
        status: 400,
        estado: "Error, id no detectado",
      });
    }
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible modificar el usuario " + err.message + 404
      )
    );
  }
};
