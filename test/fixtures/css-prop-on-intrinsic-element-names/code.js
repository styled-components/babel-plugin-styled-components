import styled from 'styled-components'
import Icons from './icons'

const Element = () => <button-ghost css="flex: 1">H</button-ghost>

const MultiHyphen = () => <my-foo-bar css="flex: 2">H</my-foo-bar>

const DigitSegment = () => <foo-1 css="flex: 3">H</foo-1>

const Svg = () => (
  <svg>
    <clipPath css="flex: 4" />
  </svg>
)

const Underscore = () => <foo_bar css="flex: 5">H</foo_bar>

const HyphenatedMember = () => <Icons.arrow-up css="flex: 6" />
