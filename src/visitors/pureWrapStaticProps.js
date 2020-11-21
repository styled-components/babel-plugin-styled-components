import annotateAsPure from '@babel/helper-annotate-as-pure'
import template from '@babel/template'

import { usePureAnnotation } from '../utils/options'
import { isFunctionComponent } from '../utils/detectors'

const buildIIFE = template('(() => {BODY})();')

const visited = new WeakSet()

// For styled components and components that consume styled components, static properties can break tree-shaking
// (see https://github.com/styled-components/babel-plugin-styled-components/issues/245). So we check for static
// properties and wrap the component in an IIFE in that case, and add the PURE comment to the IIFE.
export default t => (componentPath, state, isStyledComponent = false) => {
  if (
    !usePureAnnotation(state) ||
    (!isStyledComponent &&
      !isFunctionComponent(
        componentPath,
        state,
        t,
        true /* mustConsumeStyledComponent */
      )) ||
    visited.has(componentPath.node) // this prevents the replaceWith() call below from potentially causing an infinite loop
  ) {
    return
  }
  visited.add(componentPath.node)

  const componentNameIdentifier = componentPath.node.id
  const staticProperties = []

  // Look for static property assignments:
  // For unexported function declarations, we look at siblings of the function node itself.
  // For arrow functions, exported functions, and styled components, we need to look at siblings of the
  // closest parent Statement.
  const statement =
    componentPath.parentPath && !componentPath.parentPath.isProgram()
      ? componentPath.getStatementParent()
      : componentPath
  checkSiblingsForStaticProps(statement)

  if (staticProperties.length) {
    replaceComponentWithIIFE()
  }

  // Check sibling nodes to see if any of them are static properties (e.g. displayName or defaultProps)
  function checkSiblingsForStaticProps(startPath) {
    if (!startPath.inList) {
      return
    }
    for (
      let nextSibling = startPath.getSibling(startPath.key + 1);
      nextSibling.node !== undefined;
      nextSibling = startPath.getSibling(nextSibling.key + 1)
    ) {
      if (nextSibling.isExpressionStatement()) {
        const { expression } = nextSibling.node
        if (
          t.isAssignmentExpression(expression) &&
          t.isMemberExpression(expression.left) &&
          expression.operator === '=' &&
          expression.left.object.name === componentNameIdentifier.name
        ) {
          staticProperties.push(nextSibling.node)
          // remove the static property assignment; we'll re-add it inside the IIFE at the end
          nextSibling.remove()
        }
      }
    }
  }

  // Wrap the function and its static properties in an IIFE and add the PURE comment
  function replaceComponentWithIIFE() {
    // get or construct the component node to put inside the IIFE depending on whether it's a
    // function declaration or variable declaration (i.e. styled component or arrow function)
    const componentNode = componentPath.isVariableDeclarator()
      ? t.variableDeclaration('const', [componentPath.node])
      : componentPath.node

    const componentAndStaticProperties = [
      componentNode,
      ...staticProperties,
      t.returnStatement(componentNameIdentifier),
    ]

    const iife = buildIIFE({
      BODY: componentAndStaticProperties,
    })
    // add the PURE comment
    annotateAsPure(iife.expression)

    // replace the original function node with the IIFE
    const declarator = t.variableDeclarator(
      componentNameIdentifier,
      iife.expression
    )

    const { parentPath } = componentPath
    if (parentPath.isExportDefaultDeclaration()) {
      parentPath.replaceWith(t.variableDeclaration('const', [declarator]))
      parentPath.insertAfter(
        t.exportDefaultDeclaration(componentNameIdentifier)
      )
    } else {
      componentPath.replaceWith(
        componentPath.isStatement()
          ? t.variableDeclaration('const', [declarator])
          : declarator
      )
    }
  }
}
