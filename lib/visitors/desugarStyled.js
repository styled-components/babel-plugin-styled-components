'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _detectors = require('../utils/detectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (path, state) {
  /**
   * Handles both "styled.div" and "styled_default.default.div" (transpiled output)
   */
  if ((0, _detectors.isStyled)(path.node, state)) {
    /**
     * e.g. "div"
     */
    var sugar = (0, _get2.default)(path, 'node.property.name');

    /**
     * If the left side of the function is a complex path, e.g.
     * "styled_default.default.div", we want to preserve the "styled_default.default"
     * part and just reuse that AST object.
     */
    var leftSide = t.isMemberExpression(path.node.object) ? path.node.object : t.identifier(path.node.object.name);

    if (sugar) {
      /**
       * "styled.div" -> "styled('div')"
       */
      path.replaceWith(t.callExpression(leftSide, [t.stringLiteral(sugar)]));
    }
  }
};