const {
  crearServicio,
  eliminarServicio,
  crearServicioContratado,
  getAllServices,
  getAllCategorias,
  serviciosContratadosPorIdUsuario,
  eliminarServicioContratado,
  changeStatus,
  detectarIdServEnServCont,
  getAllServiciosContratados,
  cruzarDatosUsuarioServCont
} = require("./consultas");
const ErrorResponse = require("../helpers/errorResponse");

/* CREAR SERVICIO */
exports.createService = async (req, res, next) => {
  try {
    const { titulo, descripcion, img_src, precio, categoria } = req.body;

    if (![titulo, descripcion, img_src, precio, categoria].includes("")) {
      const servicio = {
        titulo,
        descripcion,
        img_src,
        precio,
        categoria,
      };
      await crearServicio(servicio);
      return res
        .status(200)
        .json({ status: 200, message: "Servicio creado con éxito" });
    }
  } catch (err) {
    next(new ErrorResponse("Error, no ha sido posible crear rol" + err + 404));
  }
};

/* ELIMINAR SERVICIO */
exports.deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id == "") {
      res.status(400).json({
        status: 400,
        estado: "Error, id no detectado",
      });
    }
    const isBool = await detectarIdServEnServCont(id);

    console.log("isbool", isBool);

    if (isBool == false) {
      console.log("es falso no hay filas con este id se deberia eliminar");
      await eliminarServicio(id);
      res.status(200).json({
        status: 200,
        estado: `Servicio con el id ${id}, eliminado exitósamente`,
      });
    } else {
      throw err
    }
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible eliminar el servicio " + err.message + 404
      )
    );
  }
};

/* OBTENER SERVICIOS */
exports.getServices = async (req, res, next) => {
  try {
    const servicios = await getAllServices();
    res.json(servicios);
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible obtener los servicios" + err + 404
      )
    );
  }
};

/* OBTENER SERVICIOS CONTRATADOS CRUZANDO LOS USUARIOS */

exports.getServicesWithDataUser = async (req, res, next) => {
  try {
    const servicios = await cruzarDatosUsuarioServCont();
    res.json(servicios);
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible obtener los servicios y datos de usuario" + err + 404
      )
    );
  }
};



/* OBTENER SERVICIOS CONTRATADOS */
exports.getServicesContratados = async (req, res, next) => {
  try {
    const servicios = await getAllServiciosContratados();
    res.json(servicios);
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible obtener los servicios" + err + 404
      )
    );
  }
};


/* CREAR SERVICIO CONTRATADO */
exports.contratarServicio = async (req, res, next) => {
  try {
    const {
      id_usuario, 
      id_servicio,
      id_estado,
      direccion_envio,
      fecha_solicitud,
      fecha_entrega,
      precio_final,
    } = req.body;

    if (
      ![
        id_usuario, 
        id_servicio,
        id_estado,
        direccion_envio,
        fecha_solicitud,
        fecha_entrega,
        precio_final,
      ].includes("")
    ) {
      const servicioContratado = {
        id_usuario, 
        id_servicio,
        id_estado,
        direccion_envio,
        fecha_solicitud,
        fecha_entrega,
        precio_final,
      };
      await crearServicioContratado(servicioContratado);
      return res
        .status(200)
        .json({ status: 200, message: "Servicio contratado con éxito" });
    }
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible contratar servicio" + err + 404
      )
    );
  }
};

/* OBTENER SERVICIO CONTRATADO POR ID DE USUARIO */
exports.getServicioContratado = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log("id usuario", id);
    const servicios_contratados = await serviciosContratadosPorIdUsuario(
      id
    );
    console.log("servicios contratados", servicios_contratados);
    res.json(servicios_contratados);
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible obtener servicios contratados" + err + 404
      )
    );
  }
};

/* ELIMINAR SERVICIO CONTRATADO POR ID DE SERVICIO CONTRATADO */
exports.deleteServiceContratado = async (req, res, next) => {
  try {
    const { id_serv_contratados } = req.body;

    if (id_serv_contratados != "") {
      await eliminarServicioContratado(id_serv_contratados);

      res.status(200).json({
        status: 200,
        estado: `Servicio contratado con el id ${id_serv_contratados}, eliminado exitósamente`,
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
        "Error, no ha sido posible eliminar el servicio contratado " +
          err.message +
          404
      )
    );
  }
};



/* CAMBIAR ESTADO DE PEDIDO */

exports.changeStatusService = async (req, res, next) => {
  try {
    const { id_estado, id_serv_contratados } = req.body;

    if (![id_estado, id_serv_contratados].includes("")) {
      await changeStatus(id_estado, id_serv_contratados);
      res.status(200).json({
        status: 200,
        estado: `Se ha cambiado de estado el servicio exitósamente`,
      });
    } else {
      res.status(400).json({
        status: 400,
        estado: "Error, operación cancelada",
      });
    }
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible modificar el estado  " + err.message + 404
      )
    );
  }
};

/* OBTENER CATEGORIAS */

exports.getCategorias = async (req, res, next) => {
    try {
      const categorias = await getAllCategorias();
      res.json(categorias);
    } catch (err) {
      next(
        new ErrorResponse(
          "Error, no ha sido posible obtener los servicios" + err + 404
        )
      );
    }
  };
