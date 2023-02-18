const express = require("express");
const ruta = express.Router();
const { securitySystem } = require("../middlewares/security");

const {
  create,
  login,
  getUser,
  getUsers,
} = require("../controllers/palomo_users_controllers");

const { createRoles } = require("../controllers/palomo_roles_controllers");

ruta.route("/usuario").get(securitySystem, getUser).post(create);
ruta.route("/usuarios").get(securitySystem, getUsers);
ruta.route("/login").post(login);
ruta.route("/crear-rol").post(createRoles);

module.exports = ruta;
