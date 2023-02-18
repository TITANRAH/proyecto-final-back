const express = require("express");
const ruta = express.Router();
const { securitySystem } = require("../middlewares/security");

/* CONTROLADORES USUARIOS */
const {
  create,
  login,
  getUser,
  getUsers,
} = require("../controllers/palomo_users_controllers");

/* CONTROLADORES ROLES */
const { 
    createRoles,
    deleteRol,
    editRol,
    getRoles
} = require("../controllers/palomo_roles_controllers");

ruta.route("/registro")
    .post(create);
ruta.route("/usuario")
    .get(securitySystem, getUser)    
ruta.route("/usuarios")
    .get(securitySystem, getUsers);
ruta.route("/login")
    .post(login);
ruta.route("/crear-rol")
    .post(createRoles);
ruta.route("/rol/:id")
    .delete(deleteRol)
    .put(editRol)
ruta.route("/roles")
    .get(getRoles)

module.exports = ruta;
