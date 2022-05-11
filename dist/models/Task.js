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
  title: {
    type: String,
    Required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  done: {
    type: Boolean,
    "default": false
  }
}, {
  versionKey: false,
  timestamps: true
});
taskShema.plugin(_mongoosePaginateV["default"]);

var _default = (0, _mongoose.model)('task', taskShema);

exports["default"] = _default;