'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      MemberExpression(path, state) {
        (0, _desugarStyled2.default)(path, state);
      },
      CallExpression(path, state) {
        (0, _uglifyPure2.default)(path, state);
      },
      TaggedTemplateExpression(path, state) {
        (0, _minify2.default)(path, state);
        (0, _displayNameAndId2.default)(path, state);
        (0, _templateLiterals2.default)(path, state);
      },
      VariableDeclarator(path, state) {
        (0, _assignStyledRequired2.default)(path, state);
      }
    }
  };
};

var _uglifyPure = require('./visitors/uglifyPure');

var _uglifyPure2 = _interopRequireDefault(_uglifyPure);

var _minify = require('./visitors/minify');

var _minify2 = _interopRequireDefault(_minify);

var _desugarStyled = require('./visitors/desugarStyled');

var _desugarStyled2 = _interopRequireDefault(_desugarStyled);

var _displayNameAndId = require('./visitors/displayNameAndId');

var _displayNameAndId2 = _interopRequireDefault(_displayNameAndId);

var _templateLiterals = require('./visitors/templateLiterals');

var _templateLiterals2 = _interopRequireDefault(_templateLiterals);

var _assignStyledRequired = require('./visitors/assignStyledRequired');

var _assignStyledRequired2 = _interopRequireDefault(_assignStyledRequired);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }