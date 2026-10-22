import React from 'react'

const gap = 4

const Static = () => <p css="color: red;" />

const Dynamic = p => (
  <div
    css={`
      margin: ${p.m}px;
      padding: ${gap}px;
    `}
  />
)

const Obj = p => <span css={{ color: p.color, padding: 1 }} />
