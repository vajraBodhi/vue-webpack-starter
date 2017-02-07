import { Observer, observe } from './Observer';
import { Watcher } from './Watcher';

export default class Vue {
  constructor(options = {}) {
    this.$options = options;
    let data = this.$data = this.$options.data;

    Object.keys(data).forEach(key => this._proxy(key));
    observe(data);
  }

  _proxy(key) {
    let self = this;
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get: () {
        return this.$data[key];
      },
      set: (val) {
        this.$data[key] = val;
      }
    });
  }

  $watch(expr, fn) {
    new Watcher(this, expr, fn);
  }
}