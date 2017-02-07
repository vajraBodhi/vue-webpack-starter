import { Dep } from './Dep';
import { Watcher, Bridge } from './Watcher';


export default class Observer {
  constructor(value) {
    this.value = value;
    this.walk(value);
    // 原版dep在convert中作为一个变量保存，这样也可以避免这种私有变量形式
    this._dep = new Dep(); // dep是内部变量
  }

  walk(val) {
    Object.keys(val).forEach(key => this.convert(key, val[key]));
  }

  convert(key, val) {
    // 如果val是个对象，对进行Observe化处理
    var childObj = observe(val);
    Object.defineProperty(this.value, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        // Watcher 一开始时候会调用vm._data的get方法；
        // 用Bridge这个全局变量将Watcher与Observer关联起来
        if (Bridge.target) {
          this._dep.addSub(key, Bridge.target);
        }

        return val;
      },
      set: (v) => {
        if (val === v) {
          return;
        }
        val = v; // 因为get返回的是val，所以这里要保证set之后能get最新值

        childObj = observe(v);
        this._dep.notify(key);
      }
    });
  }
}

export function observe(value) {
  if (value && typeof value === 'object') {
    return new Observer(value);
  } else { // 如果value不是对象返回undefined
    return;
  }
}