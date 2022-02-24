import { resolve } from 'path';
import { readFileSync } from 'fs';

var index = (function (api) {
  api.onGenerateFiles(function () {
    var env = api.env;
    var path = env === 'production' ? './src/.umi/index.ts' : './src/.umi/umi.ts';
    var content = readFileSync(resolve(path)).toString();
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

export default index;
