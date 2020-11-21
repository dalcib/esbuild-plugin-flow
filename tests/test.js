const esbuild = require('esbuild')
const assert = require('assert').strict
const fs = require('fs')
const flow = require('../index')

const reFlow = /: number|: string|: boolean|: \?number/

async function test(id, file, conf) {
  const result = await esbuild.build({
    entryPoints: [file],
    write: false,
    plugins: [flow(conf)],
    outfile: `tests/bundle${id}.js`,
    bundle: true,
  })

  const bundle = result.outputFiles[0].text
  const isFlow = !!bundle.match(reFlow)
  try {
    assert(isFlow === false, new Error())
    console.log('OK:', id, conf)
  } catch (e) {
    console.error('Error', id, conf, ' ', e, isFlow)
  }
}

//test(0, 'tests/main.js') //expected error
test(1, 'tests/main.js', { include: ['.'] })
test(2, 'tests/main.js', { include: ['tests/file1.flow.js', 'tests/file2.flow.js'] })
test(3, 'tests/main.js', { regexp: /\.flow\.jsx?$/ })
test(4, 'tests/main.js', {
  include: ['tests/file1.flow.js', 'tests/file2.flow.js'],
  regexp: /\.flow\.jsx?$/,
})
test(5, 'tests/main.js', {
  include: ['tests/file1.flow.js', 'tests/file2.flow.js'],
  packages: ['flow-pkg'],
})
test(6, 'tests/mainTestPkg.js', {
  include: ['tests/file1.flow.js'],
  packages: ['flow-pkg'],
})
test(6, 'tests/mainTestPkg.js', {
  include: ['.'],
  packages: ['flow-pkg'],
})
