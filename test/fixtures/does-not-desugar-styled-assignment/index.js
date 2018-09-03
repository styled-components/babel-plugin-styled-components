const domElements = ['div']

const styled = () => {}

// Shorthands for all valid HTML Elements
domElements.forEach(domElement => {
  styled[domElement] = styled(domElement)
})
