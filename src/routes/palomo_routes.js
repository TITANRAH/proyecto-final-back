const express = require("express");
const ruta = express.Router();
const {securitySystem} = require('../middlewares/security');

const {
create,
login,
getUser,
getUsers
} = require("../controllers/palomo_controllers");

ruta.route("/usuario")
    .get(securitySystem, getUser)
    .post(create)
ruta.route("/usuarios")   
    .get(getUsers)
ruta.route("/login")
    .post(login)

    
module.exports = ruta;
    