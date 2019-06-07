// Most of this code was taken from @satya164's babel-plugin-css-prop
// @see https://github.com/satya164/babel-plugin-css-prop
import { addDefault } from '@babel/helper-module-imports'
import { useCssProp } from '../utils/options'

const TAG_NAME_REGEXP = /^[a-z][a-z\d]*(\-[a-z][a-z\d]*)?$/

const getName = (node, t) => {
  if (typeof node.name === 'string') return node.name
  if (t.isJSXMemberExpression(node)) {
    return `${getName(node.object, t)}.${node.property.name}`
  }
  throw path.buildCodeFrameError(
    `Cannot infer name from node with type "${
      node.type
    }". Please submit an issue at github.com/styled-components/babel-plugin-styled-components with your code so we can take a look at your use case!`
  )
}

export default t => (path, state) => {
  if (!useCssProp(state)) return
  if (path.node.name.name !== 'css') return

  const program = state.file.path
  // state.customImportName is passed through from styled-components/macro if it's used
  // since the macro also inserts the import
  let importName = state.customImportName
  // Insert import if it doesn't exist yet
  const { bindings } = program.scope
  if (!importName || !bindings[importName.name]) {
    importName = addDefault(path, 'styled-components', {
      nameHint: importName ? importName.name : 'styled',
    })
  }
  if (!state.customImportName) state.customImportName = importName

  const elem = path.parentPath
  const name = getName(elem.node.name, t)
  const id = path.scope.generateUidIdentifier(
    'Styled' + name.replace(/^([a-z])/, (match, p1) => p1.toUpperCase())
  )

  const styled = t.callExpression(importName, [
    TAG_NAME_REGEXP.test(name) ? t.stringLiteral(name) : t.identifier(name),
  ])

  let css

  if (t.isStringLiteral(path.node.value)) {
    css = t.templateLiteral(
      [
        t.templateElement(
          { raw: path.node.value.value, cooked: path.node.value.value },
          true
        ),
      ],
      []
    )
  } else if (t.isJSXExpressionContainer(path.node.value)) {
    if (t.isTemplateLiteral(path.node.value.expression)) {
      css = path.node.value.expression
    } else if (
      t.isTaggedTemplateExpression(path.node.value.expression) &&
      path.node.value.expression.tag.name === 'css'
    ) {
      css = path.node.value.expression.quasi
    } else {
      css = t.templateLiteral(
        [
          t.templateElement({ raw: '', cooked: '' }, false),
          t.templateElement({ raw: '', cooked: '' }, true),
        ],
        [path.node.value.expression]
      )
    }
  }

  if (!css) return

  elem.node.attributes = elem.node.attributes.filter(attr => attr !== path.node)
  elem.node.name = t.jSXIdentifier(id.name)

  if (elem.parentPath.node.closingElement) {
    elem.parentPath.node.closingElement.name = t.jSXIdentifier(id.name)
  }

  css.expressions = css.expressions.reduce((acc, ex) => {
    if (
      Object.keys(bindings).some(key =>
        bindings[key].referencePaths.find(p => p.node === ex)
      ) ||
      t.isFunctionExpression(ex) ||
      t.isArrowFunctionExpression(ex)
    ) {
      acc.push(ex)
    } else {
      const name = path.scope.generateUidIdentifier('css')
      const p = t.identifier('p')

      elem.node.attributes.push(
        t.jSXAttribute(t.jSXIdentifier(name.name), t.jSXExpressionContainer(ex))
      )

      acc.push(t.arrowFunctionExpression([p], t.memberExpression(p, name)))
    }

    return acc
  }, [])

  // Add the tagged template expression and then requeue the newly added node
  // so Babel runs over it again
  const length = program.node.body.push(
    t.variableDeclaration('var', [
      t.variableDeclarator(id, t.taggedTemplateExpression(styled, css)),
    ])
  )

  program.requeue(program.get('body')[length - 1])
}
