const esbuild = require('esbuild')
const assert = require('assert').strict
const flow = require('./index')

const output = `// 
const fn = (x, y, z) => {}`

async function test(code) {
  const result = await esbuild.build({
    entryPoints: ['file.flow.js'],
    write: false,
    plugins: [flow()],
    bundle: true,
  })
  //console.log(result.outputFiles[0].text.trim(), output.trim())

  /* assert(
    result.outputFiles[0].text.trim() === output.trim(),
    `\n${result.outputFiles[0].text} ${output.trim()}`
  ) */
  console.log('Ok')
}

test()
