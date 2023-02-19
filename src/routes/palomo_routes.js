const express = require("express");
const ruta = express.Router();
const { securitySystem } = require("../middlewares/security");

/* CONTROLADORES USUARIOS */
const {
  create,
  login,
  getUser,
  getUsers,
  deleteUser,
  editUser,
} = require("../controllers/palomo_users_controllers");

/* CONTROLADORES ROLES */
const { 
    createRoles,
    deleteRol,
    editRol,
    getRoles
} = require("../controllers/palomo_roles_controllers");

/* CONTROLADORES SERVICIOS */
const { 
    createService, 
    deleteService, 
    contratarServicio,
    getServices,
    getServicioContratado,
    deleteServiceContratado,
    changeStatusService
} = require("../controllers/palomo_servicios_controllers");


/* RUTAS */
ruta.route("/registro")
    .post(create);
ruta.route("/usuario")
    .get(securitySystem, getUser)
    .delete(deleteUser)   
    .put(editUser) 
ruta.route("/usuarios")
    .get(securitySystem, getUsers);
ruta.route("/login")
    .post(login);
ruta.route("/roles")
    .post(createRoles)
    .delete(deleteRol)
    .put(editRol) 
    .get(getRoles)    
ruta.route("/crear-servicio")
    .post(createService)
ruta.route("/servicio/:id")
    .delete(deleteService)
    .post(contratarServicio)
ruta.route("/servicios")
    .get(getServices)
ruta.route("/servicio_contratado")
    .get(getServicioContratado)
    .delete(deleteServiceContratado)
    .put(changeStatusService)


module.exports = ruta;
