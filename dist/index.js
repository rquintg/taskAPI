"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

require("./database");

var _colors = _interopRequireDefault(require("colors"));

//inicializamos la app y la bd  
_app["default"].listen(_app["default"].get('port')); // definicion del puerto


console.log(_colors["default"].rainbow('Servidor en puerto'), _app["default"].get('port')); // aca se concatena ej: server on port 3000