// Regression: a non-computed object key (e.g. `position`) is a literal
// property name, never a binding reference, even when the local scope
// has a same-named binding. The css-prop object reducer must only rewrite
// computed keys (`[expr]`) into prop interpolations; plain keys stay literal.
import React from 'react'

const Outer = ({ position }) => (
  <div css={{ position: 'absolute', top: position }} />
)
