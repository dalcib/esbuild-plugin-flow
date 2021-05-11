const esbuild = require('esbuild')
const assert = require('assert').strict
const fs = require('fs')
const flow = require('../index')

const reFlow = /: number|: string|: boolean|: \?number/

async function test(id, file, conf, force) {
  const result = await esbuild.build({
    entryPoints: [file],
    write: false,
    plugins: [flow(conf, force)],
    outfile: `tests/bundle${id}.js`,
    bundle: true,
  })

  const bundle = result.outputFiles[0].text
  const isFlow = !!bundle.match(reFlow)
  try {
    assert(isFlow === false, new Error())
    console.log('✅', id, conf, force)
  } catch (e) {
    console.error('❌', id, conf, force, ' ', e, isFlow)
  }
}

test(1, 'tests/main.js', /\.jsx?$/)
test(2, 'tests/main.js', /\.flow\.jsx?$/)
test(3, 'tests/mainTestPkg.js', /node_modules\\flow-pkg.*\.jsx?$|\.flow\.jsx?$/)
test(4, 'tests/mainforce.js', /\.jsx?$/, true)
