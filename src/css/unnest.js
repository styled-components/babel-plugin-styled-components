import { prependSelector } from './utils/unnestUtils'

const unnest = node => {
  const rules = []

  // Recursively call unnest rule and return block without them
  const unnestBlock = (blockNode, selectorPath) => {
    for (const rule of blockNode.rules) {
      unnestRule(rule, selectorPath)
    }

    return Object.assign({}, blockNode, {
      rules: []
    })
  }

  // Unnest deep block and selector on rule
  const unnestRule = (ruleNode, selectorPath) => {
    const selector = (
      selectorPath ?
        prependSelector(ruleNode.selector, selectorPath) :
        ruleNode.selector
    )

    const rule = Object.assign({}, ruleNode, {
      selector
    })

    // Push first then unnest to preserve sorting
    rules.push(rule)

    // Unnest deep block and set it on new rule
    const block = unnestBlock(ruleNode.block, selector.value)
    rule.block = block
  }

  if (node.type === 'Rule') {
    unnestRule(node)
  } else if (node.type === 'Block') {
    const rule = {
      type: 'Rule',
      loc: node.loc,
      selector: {
        type: 'SelectorLiteral',
        loc: [0, 0],
        interpolations: [],
        value: '&'
      }
    }

    // See above: Push first then unnest to preserve sorting
    rules.push(rule)

    // See above: Unnest deep block and set it on new rule
    const block = unnestBlock(node)
    rule.block = block
  }

  // Return resulting rules array
  return rules
}

export default unnest
