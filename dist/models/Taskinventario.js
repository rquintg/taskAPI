"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));

//formato que usamos para enviar a mongodb
var taskShema = new _mongoose.Schema({
  serial: {
    type: String,
    required: [true, 'Serial requerido'],
    unique: true
  },
  modelo: {
    type: String,
    require: [true, 'Modelo requerido'],
    unique: false
  },
  descripcion: {
    type: String
  },
  foto: {
    type: String
  },
  color: {
    type: String
  },
  fechaCompra: {
    type: Date,
    "default": new Date()
  },
  precio: {
    type: Number
  },
  usuarios: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  marcas: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'marcas',
    required: true
  },
  estados: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'estados_de_equipo',
    required: true
  },
  tipoEquipos: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'tipo_de_equipos',
    required: true
  }
}, {
  versionKey: false
});
taskShema.plugin(_mongoosePaginateV["default"]);

var _default = (0, _mongoose.model)('inventarios', taskShema);

exports["default"] = _default;