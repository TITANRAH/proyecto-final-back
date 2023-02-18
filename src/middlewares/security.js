const jwt = require("jsonwebtoken");
const ErrorResponse = require("../helpers/errorResponse");
const { getUserVerify } = require("../controllers/consultas");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/config/config.env" });
const JWT_SECRET_WORD = process.env.JWT_SECRET_WORD;

exports.securitySystem = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.slice(6).trim();
  }
  if (!token) {
    return next(new ErrorResponse("El cliente no envió el token", 400));
  }
  
  try {
    const { email } = jwt.verify(token, JWT_SECRET_WORD);
    const usuario = await getUserVerify(email);
  
    console.log("usuario:", usuario);
    req.usuario = usuario;
    next();
  } catch (err) {
    return next(
      new ErrorResponse("Errores en el procesamiento del token", 400)
    );
  }
};
