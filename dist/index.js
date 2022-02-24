'use strict';

var path = require('path');
var fs = require('fs');

var index = (function (api) {
  api.onGenerateFiles(function () {
    var env = api.env;
    var path$1 = env === 'production' ? './src/.umi/index.ts' : './src/.umi/umi.ts';
    var content = fs.readFileSync(path.resolve(path$1)).toString();
    api.writeTmpFile({
      path: 'index.ts',
      content: content.replace('@@/core', '../.umi/core') // 兼容 dumi build

    });
    api.writeTmpFile({
      path: 'umi.ts',
      content: 'import("./index")'
    });
  });
});

module.exports = index;
