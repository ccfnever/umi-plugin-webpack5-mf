// https://umijs.org/zh-CN/plugins/best-practice
import { IApi } from 'umi';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export default (api: IApi) => {
  api.onGenerateFiles(() => {
    const { env } = api
    const path = env === 'production' ? './src/.umi/index.ts' : './src/.umi/umi.ts';
    const content = readFileSync(resolve(path)).toString();
    api.writeTmpFile({
      path: 'index.ts',
      content: content.replace('@@/core', '../.umi/core'), // 兼容 dumi build
    });
    api.writeTmpFile({
      path: 'umi.ts',
      content: 'import("./index")',
    });
  });
};
