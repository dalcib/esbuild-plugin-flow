var flowRemoveTypes = require('flow-remove-types')
var { readFile } = require('fs').promises
var { resolve } = require('path')

module.exports = ({ include = [], packages = [], regexp = /$^/ } = { include: [] }) => {
  const paths = include.map((item) => resolve(item))

  return {
    name: 'flow',
    setup(build) {
      build.onResolve({ filter: regexp, namespace: 'file' }, (args) => ({
        path: resolve(args.resolveDir, args.path),
        namespace: 'flow',
      }))
      build.onResolve(
        {
          filter: packages.length ? new RegExp('^' + packages.join('|^')) : /$^/,
          namespace: 'file',
        },
        (args) => {
          return {
            path: require.resolve(args.path),
            namespace: 'flow',
          }
        }
      )
      build.onResolve({ filter: /.jsx?$/, namespace: 'file' }, (args) => {
        const resolvedPath = resolve(args.resolveDir, args.path)
        if (paths.some((item) => resolvedPath.startsWith(item))) {
          return {
            path: resolvedPath,
            namespace: 'flow',
          }
        }
      })
      build.onLoad({ filter: /.jsx?$/, namespace: 'flow' }, async (args) => {
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

//const isScoped = (path) => !!path.match(/^@[a-z\d][\w-.]+\/[a-z\d][\w-.]*/i)
//const isWinAbsPath = (path) => !!path.match(/[a-z]:\\.*/i)
//const isAbsPath = (path) => !!path.match(/^\//)
//const isRelativePath = (path) => path.startsWith('./') || path.startsWith('../')
//const isRegExp = (path) => path instanceof RegExp
//const isPackage = (path) =>
//  (!isWinAbsPath(path) && !isRelativePath(path) && !isAbsPath(path)) || isScoped(path)
