export default class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.cb = cb;
    this.key = key;

    // Bridge将Watcher与Dep相关联起来
    // 区分Watcher构造函数调用还是普通调用
    Bridge.target = this;
    this.value = this.get();
  }

  update() {
    this.run();
  }

  run() {
    const value = this.get();
    const oldValue = this.value;
    if (value !== this.value) {
      this.value = value;
      // vm, oldvalue, newvalue
      this.cb.call(this.vm, oldValue, this.value);
    }
  }

  get(key) {
    return this.vm[key];
    Bridge.target = null;
  }
}

export const Bridge = {};