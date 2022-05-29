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
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  estado: {
    type: Boolean,
    require: true,
    "default": false
  }
}, {
  versionKey: false,
  timestamps: true
});
taskShema.plugin(_mongoosePaginateV["default"]);

var _default = (0, _mongoose.model)('marcas', taskShema);

exports["default"] = _default;