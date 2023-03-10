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
    changeStatusService,
    getCategorias,
    getServicesContratados,
    getServicesWithDataUser
} = require("../controllers/palomo_servicios_controllers");


/* RUTAS */
ruta.route("/registro")
    .post(create);
ruta.route("/usuario")
    .get(securitySystem, getUser)
    .delete(securitySystem, deleteUser)   
    .put(securitySystem,editUser) 
ruta.route("/usuarios")
    .get(securitySystem, getUsers);
ruta.route("/login")
    .post(login);
ruta.route("/roles")
    .post(securitySystem,createRoles)
    .put(securitySystem,editRol) 
    .get(securitySystem,getRoles)   
    .delete(deleteRol) 
ruta.route("/crear-servicio")
    .post(securitySystem,createService)
ruta.route("/servicio/:id")
    .delete(securitySystem,deleteService)
    .post(securitySystem,contratarServicio)
ruta.route("/servicios")
    .get(getServices)
ruta.route("/categorias")
    .get(getCategorias)
ruta.route("/servicio_contratado/:id")
    .get(securitySystem,getServicioContratado)
ruta.route("/servicio_contratado")
    .delete(securitySystem,deleteServiceContratado)
    .put(securitySystem,changeStatusService)
ruta.route("/todos_servicios_contratados")
    .get(securitySystem,getServicesContratados)
ruta.route("/servicios_contratados_usuarios")
    .get(getServicesWithDataUser)


module.exports = ruta;
