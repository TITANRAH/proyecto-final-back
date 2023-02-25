const {
  createRol,
  eliminarRol,
  modificarRol,
  getAllEmailRoles,
} = require("./consultas");
const ErrorResponse = require("../helpers/errorResponse");

/* CREAR ROL */
exports.createRoles = async (req, res, next) => {
  try {
    const { id_rol, email_rol } = req.body;
    if (![id_rol, email_rol].includes("")) {
      const rol = {
        id_rol,
        email_rol,
      };
      console.log("rol", rol);
      await createRol(rol);
      return res
        .status(200)
        .json({ status: 200, message: "Rol creado con éxito" });
    }
  } catch (err) {
    next(new ErrorResponse("Error, no ha sido posible crear rol" + err + 404));
  }
};

/* ELIMINAR ROL */

exports.deleteRol = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id != "") {
      await eliminarRol(id_roles);

      res.status(200).json({
        status: 200,
        estado: `Rol con el id ${id}, eliminado exitósamente`,
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
        "Error, no ha sido posible eliminar el rol " + err.message + 404
      )
    );
  }
};

/* MODIFICAR ROL */

exports.editRol = async (req, res, next) => {
  try {
    const { id_roles, id_rol, email_rol } = req.body;
    if (![id_roles, id_rol, email_rol].includes("")) {
      await modificarRol(id_roles, id_rol, email_rol);

      res.status(200).json({
        status: 200,
        estado: `El rol con id ${id_roles}, ha sido modificado exitósamente `,
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
        "Error, no ha sido posible modificar el rol " + err.message + 404
      )
    );
  }
};

/* OBTENER ROLES */
exports.getRoles = async (req, res, next) => {
  try {
    const roles = await getAllEmailRoles();
    res.json(roles);
  } catch (err) {
    next(
      new ErrorResponse("Error, no han podido obtener los roles" + err + 404)
    );
  }
};

/* FIN ROLES */
