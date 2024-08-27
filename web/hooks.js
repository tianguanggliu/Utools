class UtoolsClass extends EventTarget {
  constructor() {
      super();
      this.registerEventHooks();
  }

  enableToggle = true;

  dispatchCustomEvent(event, detail) {
    if (detail != null) {
        return this.dispatchEvent(new CustomEvent(event, { detail }));
    }
    return this.dispatchEvent(new CustomEvent(event));
  }

  registerEventHooks() {
    const utools = this;
    const processMouseDown = LGraphCanvas.prototype.processMouseDown;
    LGraphCanvas.prototype.processMouseDown = function (e) {
      const res = processMouseDown.apply(this, arguments);
      utools.dispatchCustomEvent("on-utools-mousedown", { originalEvent: e });
      return res;
    };
  }
}

window.Utools = new UtoolsClass();
