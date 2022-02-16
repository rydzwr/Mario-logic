import { PlatformType, Platform } from "./platform.js";
import Player from "/player.js";

export default class Game {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.screenW = window.innerWidth;
    this.screenH = window.innerHeight;

    this.cameraY = 1;
    this.lastGeneratedY = 1;
    this.cameraMarginY = 0.3;

    this.score = 0;

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

    for (let y = 1; y >= 0; y -= 0.2) {
      const type = (y !== 0) ? this.getPlatformType() : PlatformType.NORMAL;
      const width = (Math.random() * 0.15) + 0.05;
      const x = Math.random() * (1 - width);
      const platform = new Platform(x, y, width, type);
      this.gameObjects.push(platform);
    }

    const firstPlatform = this.gameObjects[6];
    this.player.pos = {
      x: firstPlatform.pos.x + firstPlatform.dim.x / 2,
      y: 0.1,
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
    const player = this.gameObjects[0];
    if (player.pos.y > this.cameraY + this.cameraMarginY - 1) {
      this.cameraY += player.pos.y - (this.cameraY + this.cameraMarginY - 1);
    }

    for (const object of this.gameObjects) {
      object.update(deltaTime);
    }

    this.generateWorld();

    if (player.pos.y - this.cameraY + 1.1 < 0) {
      location.reload();
    }
  }

  getPlatformType() {
    const randomVal = Math.random();
    if (randomVal < 0.3) {
      return PlatformType.MOVING;
    } else if (randomVal < 0.4) {
      return PlatformType.SUPER;
    } else {
      return PlatformType.NORMAL;
    }
  }

  generateWorld() {
    if (this.cameraY - this.lastGeneratedY > 0.2) {
      const type = this.getPlatformType();
      const width = (Math.random() * 0.15) + 0.05;
      const x = Math.random() * (1 - width);
      const y = this.lastGeneratedY + 0.2;
      const platform = new Platform(x, y, width, type);
      this.gameObjects.push(platform);
      this.lastGeneratedY = y;
      this.score++;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "24px Arial";
    this.ctx.fillText("Score: " + this.score, 50, 50);
    

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
