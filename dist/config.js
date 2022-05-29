"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)(); // usamos el modulo dotenv el que nos permite darle seguridad a las conexiones importantes como la ruta de la bd o puerto en un archivo .env

var _default = {
  mongodbURL: process.env.MONGODB_URIEXT
};
exports["default"] = _default;