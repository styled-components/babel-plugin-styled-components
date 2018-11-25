// shamelessly copied and modified
// from https://github.com/emotion-js/emotion/blob/master/packages/babel-plugin-emotion/src/utils/source-maps.js
import { SourceMapGenerator } from 'source-map'
import convert from 'convert-source-map'

function getGeneratorOpts(file) {
  return file.opts.generatorOpts ? file.opts.generatorOpts : file.opts
}

function makeSourceMapGenerator(file) {
  const generatorOpts = getGeneratorOpts(file)
  const filename = generatorOpts.sourceFileName
  const generator = new SourceMapGenerator({
    file: filename,
    sourceRoot: generatorOpts.sourceRoot,
  })

  generator.setSourceContent(filename, file.code)
  return generator
}

export function getSourceMap(offset, state) {
  const { line, column } = offset
  const generator = makeSourceMapGenerator(state.file)
  const generatorOpts = getGeneratorOpts(state.file)
  if (generatorOpts.sourceFileName) {
    generator.addMapping({
      generated: {
        line: 1,
        column: 0,
      },
      source: generatorOpts.sourceFileName,
      original: offset,
    })
    return convert.fromObject(generator).toComment({ multiline: true })
  }
  return ''
}
