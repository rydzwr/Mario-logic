class Game {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;

    this.screenW = document.body.clientWidth;
    this.screenH = document.body.clientHeight;
    this.cameraY = this.screenH / 2;

    window.addEventListener("resize", () => {
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        this.screenW = document.body.clientWidth;
        this.screenH = document.body.clientHeight;
    }, true);

    this.ctx = this.canvas.getContext("2d");
    this.gameObjects = [];
    this.previousTime = Date.now();
  }

  setup() {
    this.player = new Player();
    this.platform = new Platform(this.screenW / 2 - 100, this.screenH / 2 - 10, 200, 20);

    this.gameObjects.push(this.player, this.platform);
  }

  gameLoop() {
    const current = Date.now();
    const deltaTime = current - this.previousTime;
    this.previousTime = current;

    this.update(deltaTime);
    this.draw();

    requestAnimationFrame(() =>  { this.gameLoop(); });
  }

  update(deltaTime) {
    for (const object of this.gameObjects) {
      object.update(deltaTime);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const renderInfo = {
        screenW: this.screenW,
        screenH: this.screenH,
        cameraY: this.cameraY,
    }

    for (const object of this.gameObjects) {
      this.ctx.save();
      object.draw(this.ctx, renderInfo);
      this.ctx.restore();
    }
  }
}

const game = new Game();
game.setup();
game.gameLoop();
