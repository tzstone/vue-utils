// const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

const ejs = require('ejs');
const inquirer = require('inquirer');

// 实际业务中的所有模块
const moduleConfig = ['home', 'icon', 'theme'];

//选中的模块
const chooseModules = [];

function deelRouteName(name) {
  let routeName = name;

  const index = name.search(/[A-Z]/g);
  if (![0, -1].includes(index)) {
    routeName = name.slice(0, index) + '-' + name.slice(index);
  }

  const routePath = `./src/router/modules/${routeName.toLowerCase()}`;
  return routePath;
}

function init() {
  let entryDir = process.argv.slice(2);
  entryDir = [...new Set(entryDir)];
  if (entryDir && entryDir.length > 0) {
    for (const item of entryDir) {
      if (moduleConfig.includes(item)) {
        chooseModules.push(item);
      }
    }
    console.log('output: ', chooseModules);
    getContenTemplate();
  } else {
    promptModule();
  }
}

const getContenTemplate = async () => {
  const html = await ejs.renderFile(
    path.resolve(__dirname, 'router.config.template.ejs'),
    { chooseModules, deelRouteName },
    { async: true }
  );
  fs.writeFileSync(path.resolve(__dirname, '../dev.routerConfig.ts'), html);
};

function promptModule() {
  inquirer
    .prompt({
      type: 'checkbox',
      name: 'modules',
      message:
        '请选择启动的模块, 点击上下键选择, 按空格键确认(可以多选), 回车运行。注意: 直接敲击回车会全量编译, 速度较慢。',
      pageSize: 15,
      choices: moduleConfig.map((item) => {
        return {
          name: item,
          value: item,
        };
      }),
    })
    .then((answers) => {
      if (answers.modules.length === 0) {
        chooseModules.push(...moduleConfig);
      } else {
        chooseModules.push(...answers.modules);
      }
      getContenTemplate();
    });
}

init();
