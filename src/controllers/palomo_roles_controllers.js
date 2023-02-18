const { createRol } = require("./consultas");

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
