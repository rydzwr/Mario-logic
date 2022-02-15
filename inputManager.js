export default class InputManager {
  constructor() {
    this.keyboardState = {};
    document.addEventListener(
      "keydown",
      (e) => (this.keyboardState[e.code] = true)
    );
    document.addEventListener(
      "keyup",
      (e) => (this.keyboardState[e.code] = false)
    );
  }

  getKey(code) {
    if (code in this.keyboardState) return this.keyboardState[code];
    return false;
  }

  static getInstance() {
    if (InputManager.instance === undefined) {
      InputManager.instance = new InputManager();
    }
    return InputManager.instance;
  }
}