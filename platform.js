import Game from "./game.js";

export const PlatformType = Object.freeze({
  NORMAL: Symbol("normal"),
  MOVING: Symbol("moving"),
  SUPER: Symbol("super"),
});

export class Platform {
  constructor(x, y, width, type) {
    this.platform = true;
    this.movingSpeed = 0.2;
    this.type = type;
    this.jumpMultiplier = type === PlatformType.SUPER ? 1.5 : 1;

    this.pos = {
      x: x,
      y: y,
    };

    this.v = {
      x: 0,
      y: 0,
    };

    this.dim = {
      x: width,
      y: 0.02,
    };

    if (type === PlatformType.MOVING) {
      this.v.x = Math.random() < 0.5 ? +this.movingSpeed : -this.movingSpeed;
    }
  }

  update(deltaTime) {
    this.pos.x += this.v.x * deltaTime;

    if (this.pos.x >= 1) {
      this.pos.x = 0 - this.dim.x;
    } else if (this.pos.x <= 0 - this.dim.x) {
      this.pos.x = 1;
    }
  }

  draw(ctx) {
    if (this.type === PlatformType.NORMAL) {
      ctx.fillStyle = "green";
    } else if (this.type === PlatformType.MOVING) {
      ctx.fillStyle = "black";
    } else if (this.type === PlatformType.SUPER) {
      ctx.fillStyle = "yellow";
    }

    const cameraY = Game.getInstance().cameraY;
    const adjustedY = this.pos.y - cameraY;

    const pos = Game.toScreen({ x: this.pos.x, y: adjustedY });
    const dim = Game.toScreen(this.dim);

    ctx.fillRect(pos.x, pos.y, dim.x, dim.y);
  }
}
