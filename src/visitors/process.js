import pureAnnotation from './pure'
import minify from './minify'
import displayNameAndId from './displayNameAndId'
import templateLiterals from './templateLiterals'

export const processTaggedTemplate = t => {
  const minifyVisit = minify(t)
  const displayNameAndIdVisit = displayNameAndId(t)
  const templateLiteralsVisit = templateLiterals(t)
  const pureAnnotationVisit = pureAnnotation(t)
  return (path, state) => {
    minifyVisit(path, state)
    displayNameAndIdVisit(path, state)
    templateLiteralsVisit(path, state)
    pureAnnotationVisit(path, state)
  }
}

export const processCallExpression = t => {
  const displayNameAndIdVisit = displayNameAndId(t)
  const pureAnnotationVisit = pureAnnotation(t)
  return (path, state) => {
    displayNameAndIdVisit(path, state)
    pureAnnotationVisit(path, state)
  }
}
