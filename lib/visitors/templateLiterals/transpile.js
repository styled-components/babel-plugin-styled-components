'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

var _detectors = require('../../utils/detectors');

var _options = require('../../utils/options');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function addRoot(quasis, state) {
  if ((0, _options.useRootNode)(state)) {
    quasis[0].value.cooked = `${(0, _options.useRootNode)(state)}& { ${quasis[0].value.cooked}`;
    quasis[quasis.length - 1].value.cooked = `${quasis[quasis.length - 1].value.cooked} }`;
    return quasis.map(function (quasi) {
      return t.stringLiteral(quasi.value.cooked);
    });
  } else {
    return quasis.map(function (quasi) {
      return t.stringLiteral(quasi.value.cooked);
    });
  }
}

exports.default = function (path, state) {
  if ((0, _detectors.isStyled)(path.node.tag, state) || (0, _detectors.isHelper)(path.node.tag, state)) {
    var _path$node = path.node,
        callee = _path$node.tag,
        _path$node$quasi = _path$node.quasi,
        quasis = _path$node$quasi.quasis,
        expressions = _path$node$quasi.expressions;

    var values = t.arrayExpression(addRoot(quasis, state));

    path.replaceWith(t.callExpression(callee, [values].concat(_toConsumableArray(expressions))));
  }
};