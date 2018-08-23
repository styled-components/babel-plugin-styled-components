const VALID_TOP_LEVEL_IMPORT_PATHS = [
  'styled-components',
  'styled-components/no-tags',
  'styled-components/native',
  'styled-components/primitives',
]

export const isValidTopLevelImport = x =>
  VALID_TOP_LEVEL_IMPORT_PATHS.includes(x)

const importLocalName = (name, state) => {
  let localName = name === 'default' ? 'styled' : name

  state.file.path.traverse({
    ImportDeclaration: {
      exit(path) {
        const { node } = path

        if (isValidTopLevelImport(node.source.value)) {
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

export const isStyled = types => (tag, state) => {
  if (
    types.isCallExpression(tag) &&
    types.isMemberExpression(tag.callee) &&
    tag.callee.property.name !== 'default' /** ignore default for #93 below */
  ) {
    // styled.something()
    return isStyled(types)(tag.callee.object, state)
  } else {
    return (
      (types.isMemberExpression(tag) &&
        tag.object.name === importLocalName('default', state)) ||
      (types.isCallExpression(tag) &&
        tag.callee.name === importLocalName('default', state)) ||
      /**
       * #93 Support require()
       * styled-components might be imported using a require()
       * call and assigned to a variable of any name.
       * - styled.default.div``
       * - styled.default.something()
       */
      (state.styledRequired &&
        types.isMemberExpression(tag) &&
        types.isMemberExpression(tag.object) &&
        tag.object.property.name === 'default' &&
        tag.object.object.name === state.styledRequired) ||
      (state.styledRequired &&
        types.isCallExpression(tag) &&
        types.isMemberExpression(tag.callee) &&
        tag.callee.property.name === 'default' &&
        tag.callee.object.name === state.styledRequired)
    )
  }
}

export const isCSSHelper = types => (tag, state) =>
  types.isIdentifier(tag) && tag.name === importLocalName('css', state)

export const isCreateGlobalStyleHelper = types => (tag, state) =>
  types.isIdentifier(tag) &&
  tag.name === importLocalName('createGlobalStyle', state)

export const isInjectGlobalHelper = types => (tag, state) =>
  types.isIdentifier(tag) && tag.name === importLocalName('injectGlobal', state)

export const isKeyframesHelper = types => (tag, state) =>
  types.isIdentifier(tag) && tag.name === importLocalName('keyframes', state)

export const isHelper = types => (tag, state) =>
  isCSSHelper(types)(tag, state) || isKeyframesHelper(types)(tag, state)
