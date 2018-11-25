const addConfig = t => (path, state) => (...visitors) => {
  const withConfigProps = []
  visitors.forEach(visitor =>
    withConfigProps.push(...(visitor(t)(path, state) || []))
  )

  if (withConfigProps.length === 0) {
    return
  }

  if (path.node.tag) {
    // Replace x`...` with x.withConfig({ })`...`
    path.node.tag = t.callExpression(
      t.memberExpression(path.node.tag, t.identifier('withConfig')),
      [t.objectExpression(withConfigProps)]
    )
  } else {
    path.replaceWith(
      t.callExpression(
        t.callExpression(
          t.memberExpression(path.node.callee, t.identifier('withConfig')),
          [t.objectExpression(withConfigProps)]
        ),
        path.node.arguments
      )
    )
  }
}

export default addConfig
