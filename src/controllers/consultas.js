const { pool } = require("../config/db");
const bcrypt = require("bcrypt");

/* USUARIOS */

/* CREAR USUARIO CONSULTA */
exports.createUser = async ({ rol, nombre, apellido, email, password }) => {
  try {
    const consultaRol = `SELECT email_roles.id_rol FROM email_roles WHERE email_rol = '${email}'`;
    const resultadoRol = await pool.query(consultaRol);

    if (resultadoRol.rows != 0) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      rol = resultadoRol.rows[0].id_rol;
      const consulta = `INSERT INTO usuarios values (DEFAULT, $1, $2, $3 ,$4, $5)`;
      const valores = [rol, nombre, apellido, email, password];
      const resultado = await pool.query(consulta, valores);
      return resultado;
    } else {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      rol = 1;
      const consulta = `INSERT INTO usuarios values (DEFAULT, $1, $2, $3 ,$4, $5)`;
      const valores = [rol, nombre, apellido, email, password];
      const resultado = await pool.query(consulta, valores);
      return resultado;
    }
  } catch (error) {
    throw error;
  }
};

/* VERIFICAR CREDENCIALES USUARIO CONSULTA */
exports.verifyCredentials = async (email, password) => {
  try {
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const values = [email];
    const { rows } = await pool.query(consulta, values);
    if (rows == 0) {
      throw {
        code: 404,
        message: "No se encontró ningún usuario con estas credenciales",
      };
    }
    const isBool = await bcrypt.compare(password, rows[0].password);
    return isBool;
  } catch (error) {
    throw error;
  }
};

/* OBTENER 1 USUARIO CONSULTA */
exports.getUserVerify = async (email) => {
  try {
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const values = [email];
    const { rows } = await pool.query(consulta, values);
    console.log("rows: ", rows);
    return rows;
  } catch (error) {
    console.log("No se pudo llevar a cabo la consulta", error);
    return error;
  }
};

/* OBTENER USUARIOS CONSULTA */
exports.getAllUsers = async () => {
  try {
    const consulta = "SELECT * FROM usuarios";
    const { rows } = await pool.query(consulta);

    console.log("rows: ", rows);
    return rows;
  } catch (error) {
    console.log("No se pudo obtener usuarios", error);
    return error;
  }
};

/* ELIMINAR USUARIO */
exports.eliminarUsuario = async (id_usuario) => {
  try {
    const consulta = "DELETE FROM usuarios WHERE id_usuario = $1";
    const valores = [id_usuario];
    const resultado = await pool.query(consulta, valores);
    return resultado;
  } catch (error) {
    console.log("No se pudo llevar a cabo la eliminación", error);
    return error;
  }
};

/* MODIFICAR USUARIO */
exports.modificarUsuario = async (
  id_usuario,
  nombre,
  apellido,
  email,
  password
) => {
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const consulta = `UPDATE usuarios SET nombre = $2, apellido = $3, email = $4, password =$5 WHERE id_usuario = $1`;

    console.log("consulta update", consulta);
    const valores = [id_usuario, nombre, apellido, email, password];
    const resultado = await pool.query(consulta, valores);
    return resultado;
  } catch (error) {
    console.log("no se pudo actualizar el usuario", error);
  }
};

/* FIN USUARIOS */



/* ROLES */

/* CREAR ROL CONSULTA */
exports.createRol = async ({ id_rol, email_rol }) => {
  try {
    const consulta = "INSERT INTO email_roles values (DEFAULT, $1, $2)";
    const valores = [id_rol, email_rol];
    const resultado = await pool.query(consulta, valores);
    return resultado;
  } catch (error) {
    console.log("No se pudo crear rol", error);
    return error;
  }
};

/* ELIMINAR ROL */
exports.eliminarRol = async (id) => {
  try {
    const consulta = "DELETE FROM email_roles WHERE id_roles = $1";
    const valores = [id];
    const resultado = await pool.query(consulta, valores);
    return resultado;
  } catch (error) {
    console.log("No se pudo llevar a cabo la eliminación", error);
    return error;
  }
};



/* MODIFICAR ROL */

exports.modificarRol = async (id_roles, id_rol, email_rol) => {
  try {
    const consulta = `UPDATE email_roles SET id_rol = $2, email_rol = $3 WHERE id_roles = $1`;

    console.log("consulta update", consulta);
    const valores = [id_roles, id_rol, email_rol];
    const resultados = await pool.query(consulta, valores);
    return resultados;
  } catch (error) {
    console.log("no se pudo actualizar el rol", error);
  }
};

/* OBTENER ROLES */
exports.getAllEmailRoles = async () => {
  try {
    const consulta = "SELECT * FROM email_roles";
    const { rows } = await pool.query(consulta);

    console.log("rows: ", rows);
    return rows;
  } catch (error) {
    console.log("No se pueden obtener los emails de los roles", error);
    return error;
  }
};

/* FIN ROLES */


/* SERVICIOS */

/* CREAR SERVICIO CONSULTA */
exports.crearServicio = async ({ id_categoria, titulo, descripcion, img_src, precio, categoria }) => {
    try {
      const consultaCat = await pool.query(`SELECT id_categoria FROM categorias WHERE categoria = '${categoria}'`)
      id_categoria = consultaCat.rows[0].id_categoria
      const consulta = "INSERT INTO servicios values (DEFAULT, $1, $2, $3, $4, $5)";
      const valores = [id_categoria, titulo,descripcion, img_src, precio];
      const resultado = await pool.query(consulta, valores);
      return resultado;
    } catch (error) {
      console.log("No se pudo crear servicio", error);
      return error;
    }
  };

  /* ELIMINAR SERVICIO CONSULTA */
exports.eliminarServicio = async (id) => {
    try {
      const consulta = "DELETE FROM servicios WHERE id_servicio = $1";
      const valores = [id];
      const resultado = await pool.query(consulta, valores);
      return resultado;
    } catch (error) {
      console.log("No se pudo llevar a cabo la eliminación", error);
      return error;
    }
  };

  /* OBTENER SERVICIOS CONSULTA */
  exports.getAllServices = async () => {
    try {
      const consulta = "SELECT * FROM servicios";
      const { rows } = await pool.query(consulta);
  
      console.log("rows: ", rows);
      return rows;
    } catch (error) {
      console.log("No se pueden obtener los servicios", error);
      return error;
    }
  };

  /* OBTENER CATEGORIAS */

  exports.getAllCategorias = async () => {
    try {
      const consulta = "SELECT * FROM categorias";
      const { rows } = await pool.query(consulta);
  
      console.log("rows: ", rows);
      return rows;
    } catch (error) {
      console.log("No se pueden obtener las categorias", error);
      return error;
    }
  };


  /* FIN SERVICIOS */


  /* SERVICIOS CONTRATADOS */

 /* CREAR SERVICIO CONTRATADO */
  exports.crearServicioContratado = async ({ id_usuario,  id_estado, direccion_envio, fecha_solicitud, fecha_entrega, precio_final, id_servicio }) => {
    try {
      const consulta = "INSERT INTO servicios_contratados values (DEFAULT, $1, $2, $3, $4, $5, $6, $7)";
      const valores = [id_usuario,  id_estado, direccion_envio, fecha_solicitud, fecha_entrega, precio_final, id_servicio,];
      const resultado = await pool.query(consulta, valores);
      return resultado;
    } catch (error) {
      console.log("No se pudo crear servicio contratado", error);
      return error;
    }
  };

/* OBTENER LOS SERVICIOS CONTRATADOS POR USUARIO */
  exports.serviciosContratadosPorIdUsuario = async(id_usuario) => {

console.log('id_usuario', id_usuario)
    try {
        const consulta = `SELECT * FROM servicios_contratados WHERE servicios_contratados.id_usuario = $1`;
        const valores = [id_usuario];
        const {rows} = await pool.query(consulta, valores);
        return rows
    } catch (error) {
        console.log("No se pudo obtener servicio contratado", error);
      return error;
        
    }

  }

  /* ELIMINAR LOS SERVICIOS CONTRATADOS POR ID DE SERVICIO CONTRATADO */
  exports.eliminarServicioContratado = async (id_serv_contratado) => {
    try {
      const consulta = "DELETE FROM servicios_contratados WHERE id_serv_contratado = $1";
      const valores = [id_serv_contratado];
      const resultado = await pool.query(consulta, valores);
      return resultado;
    } catch (error) {
      console.log("No se pudo llevar a cabo la eliminación", error);
      return error;
    }
  };

/* ELIMINAR LOS SERVICIOS CONTRATADOS DE UN USUARIO ELIMINADO */
  exports.eliminarServContrataAlEliminarUsuario = async (id_usuario) => {
    try {
      const consulta = "DELETE FROM servicios_contratados WHERE servicios_contratados.id_usuario = $1";
      const valores = [id_usuario];
      const resultado = await pool.query(consulta, valores);
      return resultado;
    } catch (error) {
      console.log("No se pudo llevar a cabo la eliminación", error);
      return error;
    }
  };

  /* CAMBIAR DE ESTADO UN SERVICIO CONTRATADO */

  exports.changeStatus = async (id_estado, id_serv_contratado) => {

    try {
        const consulta = "UPDATE servicios_contratados SET id_estado = $1 WHERE id_serv_contratado = $2";
        const values = [id_estado, id_serv_contratado];
        const result = await pool.query(consulta, values);
        return result;
      } catch (error) {
        console.log('no se pudo actualizar el estado del pedido',error);
      }

  }

  exports.detectarIdServEnServCont = async (id) => {
    try {
        let idIsPresent = false
        const consulta = "SELECT * FROM servicios_contratados WHERE servicios_contratados.id_servicio = $1";
        const values = [id];
        const {rows} = await pool.query(consulta, values);
        console.log(rows);
        if(rows != 0){
            return idIsPresent = true;
        } else {
            return idIsPresent = false;
        }

    } catch (error) {
        console.log('no se pudo actualizar el estado del pedido',error);
    }
  }

  