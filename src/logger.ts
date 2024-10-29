import Vue from 'vue/types/umd';

const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str: string): string => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, '');
const repeat = (str: string, n: number): string => {
  let res = '';
  while (n) {
    if (n % 2 === 1) {
      res += str;
    }
    if (n > 1) {
      str += str; // eslint-disable-line no-param-reassign
    }
    n >>= 1; // eslint-disable-line no-bitwise, no-param-reassign
  }
  return res;
};

const getComponentName = (vm: Vue): string => {
  if (vm.$root === vm) {
    return '<Root>';
  }

  const options = vm.$options;

  let name = options.name || options._componentTag;
  const file = options.__file;
  if (!name && file) {
    const match = file.match(/([^/\\]+)\.vue$/);
    if (match) {
      name = match[1];
    }
  }

  return name ? `<${classify(name)}>` : '<Anonymous>';
};

const getComponentTrace = (vm: Vue): string => {
  if (vm?._isVue && vm?.$parent) {
    const tree = [];
    let currentRecursiveSequence = 0;
    while (vm) {
      if (tree.length > 0) {
        const last = tree[tree.length - 1] as any;
        if (last.constructor === vm.constructor) {
          currentRecursiveSequence += 1;
          vm = vm.$parent; // eslint-disable-line no-param-reassign
          continue;
        } else if (currentRecursiveSequence > 0) {
          tree[tree.length - 1] = [last, currentRecursiveSequence];
          currentRecursiveSequence = 0;
        }
      }
      tree.push(vm);
      vm = vm.$parent; // eslint-disable-line no-param-reassign
    }

    const formattedTree = tree
      .map(
        (vm, i) =>
          `${
            (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) +
            (Array.isArray(vm) ? `${getComponentName(vm[0])}... (${vm[1]} recursive calls)` : getComponentName(vm))
          }`
      )
      .join('\n');

    return `\n\nfound in\n\n${formattedTree}`;
  }

  return `\n\n(found in ${getComponentName(vm)})`;
};

export default {
  install(Vue, options) {
    const genLog = (level, message, vm) => {
      const log = {
        level,
        message: message,
        component: {
          name: getComponentName(vm),
          trace: getComponentTrace(vm),
        },
        createdTime: Date.now(),
      };
      return log;
    };

    const captureLog = (log, vm) => {
      let cur = vm;
      while (cur) {
        const hook = cur.$options.loggerCaptured;
        if (typeof hook === 'function') {
          const capture = hook.call(cur, log) === false;
          if (capture) {
            if (!cur._logs_) cur._logs_ = [];
            cur._logs_.unshift(log);
            break;
          }
        }

        cur = cur.$parent;
      }
    };

    const addLog = (level, messsage, vm) => {
      const log = genLog(level, messsage, vm);
      captureLog(log, vm);
    };

    function getLogs(level?) {
      if (!level) return this._logs_ || [];
      return (this._logs_ || []).filter((t) => t.level === level);
    }

    function info(message) {
      addLog('info', message, this);
    }

    function warn(message) {
      addLog('warn', message, this);
    }

    function debug(message) {
      addLog('debug', message, this);
    }

    function error(error) {
      addLog('error', error.message, this);
    }

    Object.defineProperty(Vue.prototype, '$logger', {
      writable: false,
      get() {
        return {
          info: info.bind(this),
          warn: warn.bind(this),
          error: error.bind(this),
          debug: debug.bind(this),
          getLogs: getLogs.bind(this),
        };
      },
    });
  },
};
