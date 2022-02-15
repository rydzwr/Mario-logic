import Player from "/player.js";
import Platform from "/platform.js";

export default class Game {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.screenW = window.innerWidth;
    this.screenH = window.innerHeight;
    this.cameraY = this.screenH / 2;

    window.addEventListener(
      "resize",
      () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.screenW = window.innerWidth;
        this.screenH = window.innerHeight;
      },
      true
    );

    this.ctx = this.canvas.getContext("2d");
    this.gameObjects = [];
    this.previousTime = Date.now();
  }

  setup() {
    this.player = new Player();
    this.gameObjects.push(this.player);

    for (let y = -1; y < 0; y += 0.2) {
      const x = Math.random() * 0.8;
      const platform = new Platform(x, y, 0.2);
      this.gameObjects.push(platform);
    }

    this.player.pos = {
      x: this.gameObjects[1].pos.x + 0.1,
      y: -0.9,
    };
  }

  gameLoop() {
    const current = Date.now();
    const deltaTime = (current - this.previousTime) / 1000;
    this.previousTime = current;

    this.update(deltaTime);
    this.draw();

    requestAnimationFrame(() => {
      this.gameLoop();
    });
  }

  update(deltaTime) {
    for (const object of this.gameObjects) {
      object.update(deltaTime);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const object of this.gameObjects) {
      this.ctx.save();
      object.draw(this.ctx);
      this.ctx.restore();
    }
  }

  static getInstance() {
    if (Game.instance === undefined) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  static toScreen(worldVector) {
    return {
      x: worldVector.x * Game.instance.screenW,
      y: -worldVector.y * Game.instance.screenW,
    };
  }
}
