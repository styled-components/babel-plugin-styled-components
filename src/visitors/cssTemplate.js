import { useCssTemplate } from '../utils/options'
import { isStyled, isCSSHelper, isInjectGlobalHelper, isExtend } from '../utils/detectors'
import { makePlaceholder, splitByPlaceholders } from '../css/placeholderUtils'

const CSS_PLACEHOLDER = '{css}'

// Replace the first instance of {css}. Remove any other instances.
// There is an issue with replacing all instances and multiple interpolations
export const templateCss = (cssTemplate, css) => {
  if (cssTemplate.indexOf(CSS_PLACEHOLDER) === -1) {
    return css;
  }
  return cssTemplate.replace(CSS_PLACEHOLDER, css).split(CSS_PLACEHOLDER).join('')
}

export const templateValues = (cssTemplate, values) => splitByPlaceholders(
  templateCss(
    cssTemplate,
    values.join(makePlaceholder(321))
  ),
  false
)

const applyCssTemplate = (cssTemplate, node) => {
  const templateLiteral = node.quasi
  const quasisLength = templateLiteral.quasis.length
  
  const rawValuesPrepended = templateValues(cssTemplate, templateLiteral.quasis.map(x => x.value.raw))
  const cookedValuesPrepended = templateValues(cssTemplate, templateLiteral.quasis.map(x => x.value.cooked))

  for (let i = 0; i < quasisLength; i++) {
    const element = templateLiteral.quasis[i]

    element.value.raw = rawValuesPrepended[i]
    element.value.cooked = cookedValuesPrepended[i]
  }
}

export default ({ node }, state) => {
  const { styled, css, injectGlobal } = useCssTemplate(state);
  const templateStyled = styled && (isStyled(node.tag, state) || isExtend(node.tag, state));
  const templateCssHelper = css && isCSSHelper(node.tag, state);
  const templateInjectGlobal = injectGlobal && isInjectGlobalHelper(node.tag, state);
  if (templateStyled) {
    applyCssTemplate(styled, node)
  } else if (templateCssHelper) {
    applyCssTemplate(css, node)
  } else if (templateInjectGlobal) {
    applyCssTemplate(injectGlobal, node)
  }
}
