let sc = require('styled-components')

const First = sc.div`color: red;`

for (let i = 0; i < 2; i++) {
  const Comp = sc.div`color: blue;`
  sc = { div: s => () => null }
}

while (false) {
  const InWhile = sc.div`color: blue;`
  sc = { div: s => () => null }
}

do {
  const InDo = sc.div`color: blue;`
  sc = { div: s => () => null }
} while (false)

const list = [1]
for (const item of list) {
  const InOf = sc.div`color: blue;`
  sc = { div: s => () => null }
}

const bag = { a: 1 }
for (const key in bag) {
  const InIn = sc.div`color: blue;`
  sc = { div: s => () => null }
}

const After = sc.div`color: green;`
