'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getOption(_ref, name) {
  var opts = _ref.opts;
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return opts[name] === undefined || opts[name] === null ? defaultValue : opts[name];
}

var useDisplayName = exports.useDisplayName = function useDisplayName(state) {
  return getOption(state, 'displayName');
};
var useRootNode = exports.useRootNode = function useRootNode(state) {
  var root = getOption(state, 'rootNode', false);
  if (root) {
    return root.startsWith('&') ? root : root + " ";
  } else {
    return root;
  }
};
var useSSR = exports.useSSR = function useSSR(state) {
  return getOption(state, 'ssr', false);
};
var useFileName = exports.useFileName = function useFileName(state) {
  return getOption(state, 'fileName');
};
var useMinify = exports.useMinify = function useMinify(state) {
  return getOption(state, 'minify');
};
var useTranspileTemplateLiterals = exports.useTranspileTemplateLiterals = function useTranspileTemplateLiterals(state) {
  return getOption(state, 'transpileTemplateLiterals');
};
var useUglifyPure = exports.useUglifyPure = function useUglifyPure(state) {
  return getOption(state, 'uglifyPure', false);
};