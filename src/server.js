const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const errorHandler = require('./middlewares/error')
const rutas = require("./routes/palomo_routes");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/config/config.env" });

const app = express();

app.use(express.json());
app.use(morgan('dev'))
app.use(cors());
app.use(errorHandler);
app.use("/", rutas);

const PORT = process.env.portServer;
console.log(PORT)
app.listen(PORT, console.log(`el servidor esta activo en el puerto ${PORT}`));