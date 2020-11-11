var flowRemoveTypes = require('flow-remove-types')
var { readFile } = require('fs').promises

module.exports = (packages = []) => ({
  name: 'flow',
  setup(build) {
    build.onLoad({ filter: /\.jsx?$/ }, async (args) => {
      console.log('path:', args.path)
      const source = await readFile(args.path, 'utf8')
      if (source.slice(0, 8) === '// @flow' || source.match(/^\/\*.*@flow.*\*\//s)) {
        const output = flowRemoveTypes(source, { pretty: true })
        return {
          contents: output.toString(),
          loader: 'js',
        }
      } else {
        return {
          contents: source,
          loader: 'js',
        }
      }
    })
  },
})
