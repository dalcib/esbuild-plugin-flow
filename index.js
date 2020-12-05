var flowRemoveTypes = require('flow-remove-types')
var { readFile } = require('fs').promises

module.exports = (regexp = /$^/) => {
  return {
    name: 'flow',
    setup(build) {
      build.onLoad({ filter: regexp }, async (args) => {
        const source = await readFile(args.path, 'utf8')
        let output = source
        if (source.slice(0, 8) === '// @flow' || source.match(/^\/\*.*@flow.*\*\//s)) {
          output = flowRemoveTypes(source, { pretty: true })
        }
        return {
          contents: output.toString(),
          loader: 'js',
        }
      })
    },
  }
}
