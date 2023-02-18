const { pool } = require("../config/db");
const bcrypt = require("bcrypt");

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
      rol = 2;
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
