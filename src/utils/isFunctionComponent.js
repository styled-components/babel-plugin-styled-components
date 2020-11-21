/**
 * Adapted from https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types/blob/master/src/isStatelessComponent.js
 */

import { isStyled } from '../utils/detectors'

const traversed = Symbol('traversed')

function isJSXElementOrReactCreateElement(
  path,
  filterFn = null // optional filter function to match only certain kinds of React elements
) {
  let visited = false

  path.traverse({
    CallExpression(path2) {
      const callee = path2.get('callee')

      if (
        callee.matchesPattern('React.createElement') ||
        callee.matchesPattern('React.cloneElement') ||
        callee.node.name === 'cloneElement'
      ) {
        if (visited) {
          return
        }
        visited = filterFn ? filterFn(path2) : true
      }
    },
    JSXElement(path2) {
      if (visited) {
        return
      }
      visited = filterFn ? filterFn(path2) : true
    },
  })

  return visited
}

function isReturningJSXElement(path, state, filterFn = null, iteration = 0) {
  // Early exit for ArrowFunctionExpressions, there is no ReturnStatement node.
  if (
    path.node.init &&
    path.node.init.body &&
    isJSXElementOrReactCreateElement(path, filterFn)
  ) {
    return true
  }

  if (iteration > 20) {
    throw Error('babel-plugin-styled-components: infinite loop detected.')
  }

  let visited = false

  path.traverse({
    ReturnStatement(path2) {
      // We have already found what we are looking for.
      if (visited) {
        return
      }

      const argument = path2.get('argument')

      // Nothing is returned
      if (!argument.node) {
        return
      }

      if (isJSXElementOrReactCreateElement(path2, filterFn)) {
        visited = true
        return
      }

      if (argument.node.type === 'CallExpression') {
        const name = argument.get('callee').node.name
        const binding = path.scope.getBinding(name)

        if (!binding) {
          return
        }

        // Prevents infinite traverse loop.
        if (binding.path[traversed]) {
          return
        }

        binding.path[traversed] = true

        if (
          isReturningJSXElement(binding.path, state, filterFn, iteration + 1)
        ) {
          visited = true
        }
      }
    },
  })

  return visited
}

/**
 * IMPORTANT: This function assumes that the given path is a VariableDeclarator or FunctionDeclaration,
 * and will return false positives otherwise. If a more robust version is needed in the future,
 * see https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types/blob/master/src/isStatelessComponent.js
 *
 * Returns true if the given path is a React function component definition
 * @param {Path<VariableDeclarator | FunctionDeclaration>} path
 */
export function isFunctionComponent(
  path,
  state,
  types,
  mustConsumeStyledComponent = false // only return true if the component might render a styled component
) {
  let filterFn
  if (mustConsumeStyledComponent) {
    filterFn = reactElementPath => {
      // look up the component and check if it's a styled component
      const componentId = reactElementPath.isJSXElement()
        ? reactElementPath.node.openingElement.name
        : reactElementPath.node.arguments[0]
      const binding = reactElementPath.scope.getBinding(componentId.name)
      if (binding && binding.path.isVariableDeclarator()) {
        const { init } = binding.path.node
        if (isStyled(types)(init.callee, state, true /* includeIIFE */)) {
          return true
        }
      }
      return false
    }
  }

  return isReturningJSXElement(path, state, filterFn)
}
