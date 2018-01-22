import * as t from 'babel-types'
import { getModuleName } from "./options"

const importAllLocalNames = (name, state) => {
  let localNames = {
    default: name === 'default' ? 'styled' : name
  }
  let moduleNames = getModuleName(state)
  if (typeof moduleNames === "string") moduleNames  = [ moduleNames ]

  state.file.path.traverse({
    ImportDeclaration: {
      exit(path) {
        const { node } = path

        if (moduleNames.includes(node.source.value)) {
          for (const specifier of path.get('specifiers')) {
            if (
              (specifier.isImportDefaultSpecifier()) ||
              (specifier.isImportSpecifier() && specifier.node.imported.name === name) ||
              (specifier.isImportNamespaceSpecifier())) {
              localNames[node.source.value] = specifier.node.local.name
            }
          }
        }
      }
    }
  })

  return localNames
}

const importLocalName = (name, state, moduleName) => {
  const localNames = importAllLocalNames(name, state)
  return localNames[moduleName] || localNames.default
}
  

export const isStyled = (tag, state) => {
  if (t.isCallExpression(tag) && t.isMemberExpression(tag.callee) && tag.callee.property.name !== 'default' /** ignore default for #93 below */) {
    // styled.something()
    return isStyled(tag.callee.object, state)
  } else {
    const localNames = Object.values(importAllLocalNames('default', state))

    return (
      (t.isMemberExpression(tag) && localNames.includes(tag.object.name)) ||
      (t.isCallExpression(tag) && localNames.includes(tag.callee.name)) ||

      /**
       * #93 Support require()
       * styled-components might be imported using a require()
       * call and assigned to a variable of any name.
       * - styled.default.div``
       * - styled.default.something()
       */
      (state.styledRequired && t.isMemberExpression(tag) && t.isMemberExpression(tag.object) && tag.object.property.name === 'default' && tag.object.object.name === state.styledRequired) ||
      (state.styledRequired && t.isCallExpression(tag) && t.isMemberExpression(tag.callee) && tag.callee.property.name === 'default' && tag.callee.object.name === state.styledRequired)
    )
  }
}

export const isCSSHelper = (tag, state) => (
  t.isIdentifier(tag) &&
  tag.name === importLocalName('css', state, 'styled-components')
)

export const isInjectGlobalHelper = (tag, state) => (
  t.isIdentifier(tag) &&
  tag.name === importLocalName('injectGlobal', state, 'styled-components')
)

export const isKeyframesHelper = (tag, state) => (
  t.isIdentifier(tag) &&
  tag.name === importLocalName('keyframes', state, 'styled-components')
)

export const isHelper = (tag, state) => (
  isCSSHelper(tag, state) ||
  isKeyframesHelper(tag, state)
)
