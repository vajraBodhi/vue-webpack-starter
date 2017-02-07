export default class Def {
  constructor() {
    this.subs = {};
  }

  addSub(key, sub) {
    if (!this.subs[key]) {
      this.subs[key] = [];
    }

    this.subs[key].push(sub);
  }

  notify(key) {
    if (!this.subs[key]) {
      return;
    }

    this.subs[key].forEach(sub => sub.update());
  }
}