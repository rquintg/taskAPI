"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTask = exports.findOneTask = exports.findAllTasks = exports.findAllDoneTasks = exports.deleteTask = exports.createTask = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Taskusuarios = _interopRequireDefault(require("../models/Taskusuarios"));

var _getPagination2 = require("../libs/getPagination");

// asignamos las peticiones, create,delete,find,update...
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
            return _Taskusuarios["default"].paginate(condition, {
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
              message: _context.t0.message || 'algo salio mal mientras consultabamos la tarea'
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

var createTask = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var newTasks, taskSave;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (req.body.nombre) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              message: 'El contenido no puede estar vacio'
            }));

          case 2:
            _context2.prev = 2;
            // console.log(req.body)
            newTasks = new _Taskusuarios["default"]({
              nombre: req.body.nombre,
              email: req.body.email,
              estado: req.body.estado ? req.body.estado : false
            });
            _context2.next = 6;
            return newTasks.save();

          case 6:
            taskSave = _context2.sent;
            // console.log(newTasks)
            res.json(taskSave);
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            res.status(500).json({
              message: _context2.t0.message || 'algo salio mal mientras creabamos la tarea'
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 10]]);
  }));

  return function createTask(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createTask = createTask;

var findAllDoneTasks = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var task;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Taskusuarios["default"].find({
              estado: true
            });

          case 3:
            task = _context3.sent;
            res.json(task);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              message: err.message || 'algo salio mal mientras consultabamos los done true en la tarea'
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function findAllDoneTasks(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findAllDoneTasks = findAllDoneTasks;

var findOneTask = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, task;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id; //console.log(req.params.id)

            _context4.next = 4;
            return _Taskusuarios["default"].findById(id);

          case 4:
            task = _context4.sent;

            if (task) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "El tipo de equipo: ".concat(id, " no existe")
            }));

          case 7:
            res.json(task);
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: _context4.t0.message || 'algo salio mal mientras consultabamos por ID en tipo de equipo'
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function findOneTask(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.findOneTask = findOneTask;

var deleteTask = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _Taskusuarios["default"].findByIdAndDelete(req.params.id);

          case 3:
            data = _context5.sent;
            res.json({
              message: "el equipo ".concat(data.nombre, " se ha eliminado correctamente")
            });
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: 'algo salio mal mientras eliminabamos un equipo'
            });

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function deleteTask(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteTask = deleteTask;

var updateTask = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var updatetask;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _Taskusuarios["default"].findByIdAndUpdate(req.params.id, req.body);

          case 3:
            updatetask = _context6.sent;
            res.json({
              message: "".concat(updatetask.nombre, " se ha modificado correctamente")
            });
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            res.status(500).json({
              message: 'algo salio mal mientras actualizabamos en la tarea'
            });

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function updateTask(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateTask = updateTask;