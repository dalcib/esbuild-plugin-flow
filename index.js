var flowRemoveTypes = require('flow-remove-types')
var { readFileSync } = require('fs')

module.exports = (regexp = /$^/, force) => {
  return {
    name: 'flow',
    setup(build) {
      build.onLoad({ filter: regexp }, async (args) => {
        const source = readFileSync(args.path, 'utf8')
        let output = source
        if (force) {
          output = flowRemoveTypes('// @flow\n' + source, { pretty: true })
        } else {
          if (source.slice(0, 8) === '// @flow' || source.match(/^\/\*.*@flow.*\*\//s)) {
            output = flowRemoveTypes(source, { pretty: true })
          }
        }
        const contents = output.toString().replace(/static\s+\+/g, 'static ')
        return {
          contents,
          loader: 'jsx',
        }
      })
    },
  }
}
