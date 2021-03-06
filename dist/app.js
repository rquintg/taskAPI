"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _tasks = _interopRequireDefault(require("./routes/tasks.routes"));

var _tipoequipo = _interopRequireDefault(require("./routes/tipoequipo.routes"));

var _estadoequipo = _interopRequireDefault(require("./routes/estadoequipo.routes"));

var _usuarios = _interopRequireDefault(require("./routes/usuarios.routes"));

var _marcas = _interopRequireDefault(require("./routes/marcas.routes"));

var _inventario = _interopRequireDefault(require("./routes/inventario.routes"));

// app contiene la dependencia express
// creamos y cofiguramos  servidor con express
var dotenv = require('dotenv').config();

var app = (0, _express["default"])(); // coonfiguracion puerto

app.set('port', process.env.PORT || 5000); //middlewares, morgan nos sirve para mostrar por consola las peticiones htpp
// express.json nos permite reconocer que el objeto que recibimos es JSON
// cors nos permite extender la app de diferentes servidoress
//const corsOptions = { origin: 'http://localhost:5000'}
//app.use(cors(corsOptions));
//const cors = require('cors');

app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
})); // permite entender si la peticion viene de un from en html
// routes
// simplemente damos una respuesta JSON a la direccion raiz 'localhost:3000' 

app.get('/', function (req, res) {
  res.json({
    message: 'Bienvenido a la APP'
  });
}); // invocamos los modulos de cada CRUD

app.use('/api/tasks', _tasks["default"]);
app.use('/api/tasks', _tipoequipo["default"]);
app.use('/api/task', _estadoequipo["default"]);
app.use('/api/users', _usuarios["default"]);
app.use('/api/brands', _marcas["default"]);
app.use('/api/inventory', _inventario["default"]);
var _default = app;
exports["default"] = _default;