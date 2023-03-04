const request = require("supertest");
const rutas = require("../src/routes/palomo_routes");
const express = require("express");
const { response } = require("express");
const app = express();
app.use("/", rutas);

describe("Funcionalidades Palomo", () => {

  it("Validar que se loguea que recibe un 200 y que es un objeto", async () => {
    const login = {
      email: "cliente@palomomensajero.cl",
      password: "123",
    };

    const { body } = await request(app).post("/login").send(login);

    expect(body).toBeInstanceOf(Object);
    expect(response.statusCode).toEqual(200);
  });

  it("Validar que la respuesta es un arreglo y que obtiene un 200", async () => {
    try {
      const response = await request(app).get("/servicios");
      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Array);
      console.log("Este es el RESPONSE: ", response);
    } catch (error) {
      console.log("Error catch", error);
    }
  });

  it("la ruta PUT /servicio_contratado devuelve un status code 400 si :id != payload.id", async () => {
    const servicioContratado = { id_estado: 1, id_serv_contratados: 90 };

    try {
      const response = await request(app)
        .put(`/servicio_contratado/`)
        .send(servicioContratado);
      expect(response.statusCode).toBe(400);
    } catch (error) {
      console.log("Error catch", error);
    }
  });

  it("Validar que venga el token al eliminar un servicio contratado", async () => {
    try {
      const jwt = "";
      const resultado = await request(app)
        .delete("/servicio_contratado")
        .set("Authorization", jwt);
      expect(resultado.statusCode).toBe(400);
    } catch (error) {
      console.log("Error catch", error);
    }
  });

});
