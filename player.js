import Game from "./game.js";
import InputManager from "./inputManager.js";

export default class Player {
  constructor() {
    this.gravityAccelY = -0.5;
    this.dragCoeffX = 60;
    this.dragCoeffY = 0.1;
    this.movementForce = 6;
    this.moveDownForce = 4;
    this.jumpImpulse = 0.5;

    this.pos = {
      x: 0,
      y: 0,
    };

    this.v = {
      x: 0,
      y: 0,
    };

    this.a = {
      x: 0,
      y: 0,
    };

    this.dim = {
      x: 0.02,
      y: 0.02,
    };
  }

  update(deltaTime) {
    const go = Game.getInstance().gameObjects;

    console.log(this.pos.x);

    for (const object of go) {
      if ("platform" in object) {
        if (
          this.pos.y - this.dim.y >= object.pos.y &&
          this.pos.y - this.dim.y + this.v.y * deltaTime <= object.pos.y &&
          this.pos.x + this.dim.x >= object.pos.x &&
          this.pos.x <= object.pos.x + object.dim.x
        ) {
          this.v.y = this.jumpImpulse;
        }
      }
    }

    if (this.pos.x >= 1) {
      this.pos.x = 0;
    } else if (this.pos.x <= 0) {
      this.pos.x = 1;
    }

    let forceX = 0;
    let forceY = this.gravityAccelY;

    const input = InputManager.getInstance();
    if (input.getKey("ArrowRight")) {
      forceX += this.movementForce;
    } else if (input.getKey("ArrowLeft")) {
      forceX -= this.movementForce;
    }

    if (input.getKey("ArrowDown")) {
      forceY -= this.moveDownForce;
    }

    forceX += -Math.sign(this.v.x) * this.dragCoeffX * this.v.x ** 2;
    forceY += -Math.sign(this.v.y) * this.dragCoeffY * this.v.y ** 2;

    this.a.x = forceX;
    this.a.y = forceY;

    this.v.x += this.a.x * deltaTime;
    this.v.y += this.a.y * deltaTime;

    this.pos.x += this.v.x * deltaTime;
    this.pos.y += this.v.y * deltaTime;
  }

  draw(ctx) {
    ctx.fillStyle = "red";

    const pos = Game.toScreen(this.pos);
    const dim = Game.toScreen(this.dim);

    ctx.fillRect(pos.x, pos.y, dim.x, dim.y);
  }
}
