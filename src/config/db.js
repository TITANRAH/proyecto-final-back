const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const credenciales = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    allowExitOnIdle: true,
  };
  
exports.pool = new Pool(credenciales);