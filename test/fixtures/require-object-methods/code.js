const sc = require('styled-components')

const Comp = sc.default.div`color: red;`
const has = sc.hasOwnProperty('css')
const text = String(sc.toString())
const Lookup = sc.__lookupGetter__`x`
const LookupSet = sc.__lookupSetter__`x`
const Proto = sc.__proto__`x`
const Bound = sc.bind`x`
const Applied = sc.apply`x`
const Called = sc.call`x`
const Len = sc.length`x`
const Named = sc.name`x`
const Args = sc.arguments`x`
const Caller = sc.caller`x`
