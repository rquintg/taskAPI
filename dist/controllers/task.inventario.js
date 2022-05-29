"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTask = exports.findOneTask = exports.findAllTasks = exports.deleteTask = exports.createTask = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Taskinventario = _interopRequireDefault(require("../models/Taskinventario"));

var _Taskusuarios = _interopRequireDefault(require("../models/Taskusuarios"));

var _Taskmarcas = _interopRequireDefault(require("../models/Taskmarcas"));

var _Taskestadoequipo = _interopRequireDefault(require("../models/Taskestadoequipo"));

var _TasktipodeEquipo = _interopRequireDefault(require("../models/TasktipodeEquipo"));

var _getPagination2 = require("../libs/getPagination");

// asignamos las peticiones, create,delete,find,uodate...
var findAllTasks = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$query, size, page, nombre, condition, _getPagination, limit, offset, task;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$query = req.query, size = _req$query.size, page = _req$query.page, nombre = _req$query.nombre;
            condition = nombre ? {
              nombre: {
                $regex: new RegExp(nombre),
                $options: "i"
              }
            } : {};
            _getPagination = (0, _getPagination2.getPagination)(page, size), limit = _getPagination.limit, offset = _getPagination.offset;
            _context.next = 6;
            return _Taskinventario["default"].paginate(condition, {
              offset: offset,
              limit: limit
            });

          case 6:
            task = _context.sent;
            res.json({
              totalItems: task.totalDocs,
              tasks: task.docs,
              totalPages: task.totalPages,
              currentPage: task.page - 1
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: _context.t0.message || 'algo salio mal mientras consultabamos el inventario'
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function findAllTasks(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.findAllTasks = findAllTasks;

var findOneTask = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, task;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id; //console.log(req.params.id)

            _context2.next = 4;
            return _Taskinventario["default"].findById(id);

          case 4:
            task = _context2.sent;

            if (task) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: "El inventario: ".concat(id, " no existe")
            }));

          case 7:
            res.json(task);
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: _context2.t0.message || 'algo salio mal mientras consultabamos por ID en el inventario'
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function findOneTask(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findOneTask = findOneTask;

var createTask = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, serial, modelo, email, marcas, estados, tipoEquipos, inventarioBD, usuarioBD, marcasBD, estadosBD, tipoEquipoBD, newTasks, taskSave;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (req.body.serial) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              message: 'El serial no puede estar vacio'
            }));

          case 2:
            _context3.prev = 2;
            // const email = req.body.usuarios.email;
            // const marca = req.body.marcas.nombre;
            // const estado = req.body.estados.nombre;
            // const tipoEquipos = req.body.tipoEquipos.nombre;
            _req$body = req.body, serial = _req$body.serial, modelo = _req$body.modelo, email = _req$body.email, marcas = _req$body.marcas, estados = _req$body.estados, tipoEquipos = _req$body.tipoEquipos;
            _context3.next = 6;
            return _Taskinventario["default"].findOne({
              $or: [{
                serial: serial
              }, {
                modelo: modelo
              }]
            });

          case 6:
            inventarioBD = _context3.sent;

            if (!inventarioBD) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              msj: 'Ya existe serial o modelo'
            }));

          case 9:
            console.log('marca: ', marcas);
            console.log('req.body', req.body);
            _context3.next = 13;
            return _Taskusuarios["default"].findOne({
              email: email,
              estado: true
            });

          case 13:
            usuarioBD = _context3.sent;

            if (usuarioBD) {
              _context3.next = 16;
              break;
            }

            return _context3.abrupt("return", res.status(404).send({
              message: "El usuario: ".concat(email, " no existe o no esta activo")
            }));

          case 16:
            _context3.next = 18;
            return _Taskmarcas["default"].findOne({
              nombre: marcas,
              estado: true
            });

          case 18:
            marcasBD = _context3.sent;

            if (marcasBD) {
              _context3.next = 21;
              break;
            }

            return _context3.abrupt("return", res.status(404).send({
              message: "la marca: ".concat(marcas, " no existe o no esta activa")
            }));

          case 21:
            _context3.next = 23;
            return _Taskestadoequipo["default"].findOne({
              nombre: estados
            });

          case 23:
            estadosBD = _context3.sent;

            if (estadosBD) {
              _context3.next = 26;
              break;
            }

            return _context3.abrupt("return", res.status(404).send({
              message: "El estado de equipo: ".concat(estados, " no existe")
            }));

          case 26:
            _context3.next = 28;
            return _TasktipodeEquipo["default"].findOne({
              nombre: tipoEquipos
            });

          case 28:
            tipoEquipoBD = _context3.sent;

            if (tipoEquipoBD) {
              _context3.next = 31;
              break;
            }

            return _context3.abrupt("return", res.status(404).send({
              message: "El tipo de equipo: ".concat(tipoEquipos, " no existe")
            }));

          case 31:
            // console.log(estado);
            newTasks = new _Taskinventario["default"]({
              serial: req.body.serial,
              modelo: req.body.modelo,
              descripcion: req.body.descripcion,
              foto: req.body.foto,
              color: req.body.color,
              precio: req.body.precio,
              usuarios: usuarioBD._id,
              marcas: marcasBD._id,
              estados: estadosBD._id,
              tipoEquipos: tipoEquipoBD._id
            });
            _context3.next = 34;
            return newTasks.save();

          case 34:
            taskSave = _context3.sent;
            // console.log(newTasks)
            res.json(taskSave);
            _context3.next = 41;
            break;

          case 38:
            _context3.prev = 38;
            _context3.t0 = _context3["catch"](2);
            res.status(500).json({
              message: _context3.t0.message || 'algo salio mal mientras creabamos el inventario'
            });

          case 41:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 38]]);
  }));

  return function createTask(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createTask = createTask;

var deleteTask = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _Taskinventario["default"].findByIdAndDelete(id);

          case 4:
            data = _context4.sent;

            if (data) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "El inventario: ".concat(id, " no existe")
            }));

          case 7:
            res.json({
              message: "el equipo ".concat(data.serial, " se ha eliminado correctamente")
            });
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: 'algo salio mal mientras eliminabamos inventario'
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function deleteTask(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteTask = deleteTask;

var updateTask = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, task, updatetask;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id; //console.log(req.params.id)

            _context5.next = 4;
            return _Taskinventario["default"].findById(id);

          case 4:
            task = _context5.sent;

            if (task) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "El inventario: ".concat(id, " no existe")
            }));

          case 7:
            _context5.next = 9;
            return _Taskinventario["default"].findByIdAndUpdate(req.params.id, req.body);

          case 9:
            updatetask = _context5.sent;
            res.json({
              message: "".concat(updatetask.serial, " se ha modificado correctamente")
            });
            _context5.next = 16;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: 'algo salio mal mientras actualizabamos el inventario'
            });

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 13]]);
  }));

  return function updateTask(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateTask = updateTask;