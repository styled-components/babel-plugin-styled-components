import * as t from 'babel-types'

const importLocalName = (name, state) => {
  let localName = name === 'default' ? 'styled' : name

  state.file.path.traverse({
    ImportDeclaration: {
      exit(path) {
        const { node } = path

        if (node.source.value === 'styled-components') {
          for (const specifier of path.get('specifiers')) {
            if (specifier.isImportDefaultSpecifier()) {
              localName = specifier.node.local.name
            }

            if (
              specifier.isImportSpecifier() &&
              specifier.node.imported.name === name
            ) {
              localName = specifier.node.local.name
            }

            if (specifier.isImportNamespaceSpecifier()) {
              localName = specifier.node.local.name
            }
          }
        }
      },
    },
  })

  return localName
}

export const isStyled = (tag, state) => {
  if (
    t.isCallExpression(tag) &&
    t.isMemberExpression(tag.callee) &&
    tag.callee.property.name !== 'default' /** ignore default for #93 below */
  ) {
    // styled.something()
    return isStyled(tag.callee.object, state)
  } else {
    return (
      (t.isMemberExpression(tag) &&
        tag.object.name === importLocalName('default', state)) ||
      (t.isCallExpression(tag) &&
        tag.callee.name === importLocalName('default', state)) ||
      /**
       * #93 Support require()
       * styled-components might be imported using a require()
       * call and assigned to a variable of any name.
       * - styled.default.div``
       * - styled.default.something()
       */
      (state.styledRequired &&
        t.isMemberExpression(tag) &&
        t.isMemberExpression(tag.object) &&
        tag.object.property.name === 'default' &&
        tag.object.object.name === state.styledRequired) ||
      (state.styledRequired &&
        t.isCallExpression(tag) &&
        t.isMemberExpression(tag.callee) &&
        tag.callee.property.name === 'default' &&
        tag.callee.object.name === state.styledRequired)
    )
  }
}

export const isCSSHelper = (tag, state) =>
  t.isIdentifier(tag) && tag.name === importLocalName('css', state)

export const isInjectGlobalHelper = (tag, state) =>
  t.isIdentifier(tag) && tag.name === importLocalName('injectGlobal', state)

export const isKeyframesHelper = (tag, state) =>
  t.isIdentifier(tag) && tag.name === importLocalName('keyframes', state)

export const isHelper = (tag, state) =>
  isCSSHelper(tag, state) || isKeyframesHelper(tag, state)
