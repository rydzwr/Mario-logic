class InputManager {
  static setup() {
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

  static getKey(code) {
    if (code in this.keyboardState) return this.keyboardState[code];
    return false;
  }
}

InputManager.setup();