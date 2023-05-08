# 规范Git提交信息


## Commitizen
Commitizen 是一个能帮助人们遵守提交信息约定的工具。


```bash
# 安装
npm install commitizen -g
```
光安装这个，执行 git cz 和你执行 git commit 没有区别，还需要接着安装适配器。
   
```bash
# 适配器
# npm
commitizen init cz-conventional-changelog --save-dev --save-exact

# yarn
commitizen init cz-conventional-changelog --yarn --dev --exact

# pnpm
commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact
```
> 上面的命令做三件事：
> 1. 安装 `cz-conventional-changelog` 适配器
> 2. 将依赖保存到 `package.json` 的 `devDependencies` 字段下
> 3. `package.json`添加 `config.commitizen` 字段
   
接着添加`npm-script`方便使用：
   
```json
// package.json
{
  "scripts": {
    "commit": "cz"
  }
}
```

> 注意： 如果由于 husky 之类的原因而使用 precommit 钩子，则需要将脚本命名为“commit”以外的其他名称（例如“cm”：“cz”）。原因是因为 npm-scripts 有一个“功能”，它会自动运行名为 prexxx 的脚本，其中 xxx 是另一个脚本的名称。 本质上，如果您将脚本命名为“commit”，npm 和 husky 将运行“预提交”脚本两次，而解决方法是防止 npm 触发的预提交脚本。


目前为止已经可以通过`cz-conventional-changelog`的规范来生成提交信息了，如果想更改配置项，则通过在 `package.json` 的 `config.commitizen` 字段根据[cz-conventional-changelog文档](https://github.com/commitizen/cz-conventional-changelog)和[types的配置项文档](https://github.com/commitizen/conventional-commit-types/blob/HEAD/index.json)来修改。

## 添加校验
但是现在依然可以通过命令行等方式提交其它格式的信息，例如`git commit -m 'xxx'`。接下来就通过`git hooks`来校验提交信息。这里用到了[husky](https://typicode.github.io/husky/#/)，这是一个让你更容易使用 `git hooks`的库。

```bash
# 安装
yarn add husky --dev

# 启用 git hooks
npx husky install
# or
yarn husky install

# 设置安装后自动启用 Git 挂钩
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
# or
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'

```
```bash
# 安装
yarn add @commitlint/{cli,config-conventional} --dev

# 添加配置文件（如果需要的话）
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

测试一下commitlint：
```bash
# 检查您的最后一次提交，如果无效则返回错误，如果有效则返回正输出。
npx commitlint -- --from HEAD~1 --to HEAD --verbose
```
测试一下hook：

```bash
# 修改一个文件并添加到缓存区
git add .

# 提交到本地来测试下钩子会不会触发
git commit -m "foo: 这个提交不会成功的"
```



## 修改配置
前面介绍可以通过`package.json`的`config.commitizen`字段配置选项。接下来介绍一种更友好的操作，基于`Commitizen`按照`commitlint`的配置文件生成提交信息，它提供了一种更友好的交互方式。


```bash
# 安装
yarn add @commitlint/cz-commitlint --D

# 添加配置文件（如果需要的话）
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```
修改`commitizen`配置项：
   
```json
// package.json
{
 "config": {
    "commitizen": {
      "path": "./node_modules/@commitlint/cz-commitlint"
    }
  }
}
```
测试一波：
  
```bash
git add .
npm run commit
# or yarn
yarn commit
```

修改配置：
  
如果上面都没有问题，就可以通过`commitlint.config.js`来根据[文档](https://commitlint.js.org/#/reference-prompt)修改你想要的`@commitlint/cz-commitlint`相关的`prompt`配置了。



## 多个仓库使用Commitizen


1. 创建入口脚本文件
```js
// my-cli.js

#!/usr/bin/env node
"use strict";

const path = require('path');
const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap;

bootstrap({
  cliPath: path.join(__dirname, '../../node_modules/commitizen'),
  // this is new
  config: {
    "path": "./node_modules/@commitlint/cz-commitlint"
  }
});
```


2. 添加脚本到`package.json`

```json
// package.json
{
  "name": "kczx-commit",
  "bin": "./my-cli.js",
  "dependencies": {
    "@commitlint/cli": "^13.1.0",
    "@commitlint/config-conventional": "^13.1.0",
    "@commitlint/cz-commitlint": "^13.1.0",
    "commitizen": "^4.2.4"
  }
}
```
3. 发布到远程镜像仓库并使用
  
```bash
npm install --save-dev company-commit

./node_modules/.bin/company-commit
```
