# esbuild-plugin-flow
Esbuild plugin to strip types for Flow files using [flow-remove-types](https://www.npmjs.com/package/flow-remove-types)

## Installation

```
npm i --dev https://github.com/dalcib/esbuild-plugin-flow 
```

## Usage

The esbuild [plugin API](https://esbuild.github.io/plugins/) isn't supported via CLI, so use a custom build script like so:

```js
const esbuild = require("esbuild");
const flow = require("esbuild-plugin-flow");

esbuild
  .build({
    entryPoints: ["index.js"],
    outfile: "dist/bundle.js",
    bundle: true,
    plugins: [
      flow({
        //include: ['.'],
        //packages: ['flow-package', 'other-flow/src/index.js']
        regexp: /\.flow\.jsx?$/,
      }),
    ],
  })
  .catch(() => process.exit(1));
```

## Options

The plugin needs a configuration object with at least one option defined. 

```
{
  include?: string[],
  packages?: string[],
  regexp?: RegExp
}
```
#### include
List of relative or absolute paths of files
Type: `string[]` Default: `[]`

#### packages
List of packages
Type: `string[]` Default: `[]`

#### regexp
RegExp to filter the files
Type `RegExp` Default `/$^/` 

To include all files use the option `{include: [.]}` or `{regexp: /.jsx?$/}`