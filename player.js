import Game from "./game.js";
import InputManager from "./inputManager.js";

export default class Player {
  constructor() {
    this.gravityAccelY = -0.5;
    this.dragCoeffX = 20;
    this.dragCoeffY = 0.5;
    this.frictionCoeffX = 0.05;
    this.movementForce = 4;
    this.moveDownForce = 2;
    this.jumpImpulse = 0.55;

    this.applyDownForce = false;
    this.prevDownInput = false;

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

    for (const object of go) {
      if ("platform" in object) {
        if (
          this.pos.y - this.dim.y >= object.pos.y &&
          this.pos.y - this.dim.y + this.v.y * deltaTime <= object.pos.y &&
          this.pos.x + this.dim.x >= object.pos.x &&
          this.pos.x <= object.pos.x + object.dim.x
        ) {
          this.v.y = this.jumpImpulse * object.jumpMultiplier;
          this.applyDownForce = false;
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

    const downPressed = input.getKey("ArrowDown");
    if (downPressed && !this.prevDownInput) {
      this.applyDownForce = true;
    }

    if (this.applyDownForce) {
      forceY -= this.moveDownForce;
    }
    
    this.prevDownInput = downPressed;

    forceX += -Math.sign(this.v.x) * this.dragCoeffX * this.v.x ** 2;
    forceY += -Math.sign(this.v.y) * this.dragCoeffY * this.v.y ** 2;

    forceX += -Math.sign(this.v.x) * this.frictionCoeffX;

    this.a.x = forceX;
    this.a.y = forceY;

    this.v.x += this.a.x * deltaTime;
    this.v.y += this.a.y * deltaTime;

    this.pos.x += this.v.x * deltaTime;
    this.pos.y += this.v.y * deltaTime;
  }

  draw(ctx) {
    ctx.fillStyle = "red";

    const cameraY = Game.getInstance().cameraY;
    const adjustedY = this.pos.y - cameraY;
  
    const pos = Game.toScreen({ x: this.pos.x, y: adjustedY});
    const dim = Game.toScreen(this.dim);

    ctx.fillRect(pos.x, pos.y, dim.x, dim.y);
  }
}
