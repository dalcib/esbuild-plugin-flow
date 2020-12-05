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
    plugins: [flow(/\.flow\.jsx?$/)],
  })
  .catch(() => process.exit(1));
```

## Options

The plugin needs a RegExp to define:

####  a) paths or packages to be included
```javascript
 /node_modules\\package.*\.jsx?$/
```

#### b) extentions
```javascript
 /\.flow\.jsx?$/
```

#### c) a combination of both
```javascript
 /node_modules\\package1.*\.jsx?$|node_modules\\package2.*\.jsx?$|\.flow\.jsx?$/
```

## Entry Point
Due to limitations of Esbuild, the entry point is not processed.

## Tests
For test, copy the folder `flow-pkg` to node_modules and run `node tests/test`