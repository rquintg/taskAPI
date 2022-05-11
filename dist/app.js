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

var _estadoequipo = _interopRequireDefault(require("./routes/estadoequipo.routes"));

// app contiene la dependencia express
// creamos y cofiguramos  servidor con express
var app = (0, _express["default"])(); // coonfiguracion puerto

app.set('port', process.env.PORT || 3000); //middlewares, morgan nos sirve para mostrar por consola las peticiones htpp
// express.json nos permite reconocer que el objeto que recibimos es JSON
// cors nos permite extender la app de diferentes servidoress

var corsOptions = {
  origin: 'http://localhost:3000'
};
app.use((0, _cors["default"])(corsOptions));
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
app.use('/api/tasks', _estadoequipo["default"]);
var _default = app;
exports["default"] = _default;