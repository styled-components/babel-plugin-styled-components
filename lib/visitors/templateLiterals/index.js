'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _options = require('../../utils/options');

var _transpile = require('./transpile');

var _transpile2 = _interopRequireDefault(_transpile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (path, state) {
  if ((0, _options.useTranspileTemplateLiterals)(state)) {
    (0, _transpile2.default)(path, state);
  }
};