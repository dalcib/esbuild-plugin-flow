(() => {
  var __defProp = Object.defineProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };

  // flow:C:\Users\Dalci\Playground\esbuild-plugin-flow\tests\file1.flow.js
  var require_file1_flow = __commonJS((exports) => {
    __export(exports, {
      fn: () => fn
    });
    const fn = (x, y) => {
      return x + y;
    };
  });

  // flow:C:\Users\Dalci\Playground\esbuild-plugin-flow\tests\file2.flow.js
  var require_file2_flow = __commonJS((exports) => {
    __export(exports, {
      fn: () => fn
    });
    const fn = (x, y, z) => {
    };
  });

  // tests/file3.js
  var require_file3 = __commonJS((exports) => {
    __export(exports, {
      fn: () => fn
    });
    const fn = (x, y) => x * y;
  });

  // tests/main.js
  const fn1 = require_file1_flow();
  const fn2 = require_file2_flow();
  const fn3 = require_file3();
  console.log(fn1(1, 2, 3));
  console.log(fn2(1, 2, 3));
  console.log(fn3(1, 2, 3));
})();
