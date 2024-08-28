import { injectCss } from './utils.js'

class UtoolsClass extends EventTarget {
  constructor() {
      super();
      this.registerEventHooks();
      injectCss(`${'../../extensions/ComfyUI-Utools'}/libs/viewer/viewer.min.css`).then(e => console.log(888888888888888));
  }

  disabledValue = 4;

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
