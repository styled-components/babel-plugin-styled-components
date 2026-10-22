const fs = require('fs')
const os = require('os')
const path = require('path')
const babel = require('@babel/core')
const jsxSyntax = require('@babel/plugin-syntax-jsx').default
const modulesCommonjs =
  require('@babel/plugin-transform-modules-commonjs').default

const css = i => `
  display: flex; /* layout */
  color: ${'${p => p.theme.c' + i + '}'};
  padding: ${i % 7}px ${'${gap}'}px;
  // a line comment that should go
  background: url("https://example.com/img${i}.png"); // trailing comment
  &:hover {
    opacity: 0.${i % 9};
    transform: translate(${i}px, calc(100% - ${'${off}'}px));
  }
  @media (min-width: ${400 + i}px) {
    grid-template-columns: repeat(auto-fill, minmax(${i}px, 1fr));
  }
`

function file(nStyled, nCss, nOther) {
  const lines = [
    `import React, { useState, useEffect } from 'react'`,
    `import styled, { css, keyframes, createGlobalStyle, withTheme } from 'styled-components'`,
    `import { format } from './util'`,
    `const gap = 4, off = 2`,
    'const spin = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`',
    'const Global = createGlobalStyle`body { margin: 0; }`',
  ]
  for (let i = 0; i < nStyled; i++) {
    switch (i % 5) {
      case 0:
        lines.push(`export const Box${i} = styled.div\`${css(i)}\``)
        break
      case 1:
        lines.push(
          `const Btn${i} = styled(Box${i - 1}).attrs({ role: 'button' })\`${css(i)}\``
        )
        break
      case 2:
        lines.push(`const mixin${i} = css\`${css(i)}\``)
        break
      case 3:
        lines.push(
          `const Obj${i} = styled.span({ color: 'red', padding: ${i} })`
        )
        break
      case 4:
        lines.push(
          `const Cfg${i} = styled.a.withConfig({ shouldForwardProp: p => p !== 'x' })\`${css(i)}\``
        )
        break
    }
  }
  for (let i = 0; i < nOther; i++) {
    lines.push(`function helper${i}(a, b) {
  const [s, setS] = useState(a)
  useEffect(() => { setS(format(b, a.map(x => x * ${i}).filter(Boolean).join(','))) }, [a, b])
  return Math.max(...[a.length, b.length, ${i}].map(Number)) + JSON.parse(JSON.stringify({ v: s })).v
}`)
  }
  for (let i = 0; i < nCss; i++) {
    switch (i % 4) {
      case 0:
        lines.push(`const P${i} = p => <p css="flex: ${i}; color: red;">A</p>`)
        break
      case 1:
        lines.push(
          `const T${i} = p => <div css={\`margin: \${p.m}px; color: \${gap};\`}>{p.children}</div>`
        )
        break
      case 2:
        lines.push(
          `const O${i} = p => <span css={{ color: p.color, padding: ${i}, [gap]: 1 }}>x</span>`
        )
        break
      case 3:
        lines.push(
          `const C${i} = p => <Box0 css={css\`width: \${p.w}px;\`}>y</Box0>`
        )
        break
    }
  }
  lines.push(
    `export default function App() { return <><Global />${nStyled ? '<Box0 />' : ''}</> }`
  )
  return lines.join('\n') + '\n'
}

// Writes small.js, medium.js, large.js, and large-cjs.js (large after the commonjs transform) into dir.
// Returns the written file names.
function generateInputs(dir) {
  const write = (name, code) => fs.writeFileSync(path.join(dir, name), code)
  write('small.js', file(10, 2, 5))
  write('medium.js', file(60, 12, 40))
  const large = file(400, 80, 300)
  write('large.js', large)
  const cjs = babel.transformSync(large, {
    babelrc: false,
    configFile: false,
    filename: 'large.js',
    plugins: [jsxSyntax, modulesCommonjs],
  }).code
  write('large-cjs.js', cjs)
  return fs.readdirSync(dir).sort()
}

if (require.main === module) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'styled-bench-inputs-'))
  generateInputs(dir)
  console.log(dir)
}

module.exports = { generateInputs }
