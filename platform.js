import Game from "./game.js";

export default class Platform {
  constructor(x, y, width) {
    // 30% of getting true
    this.random_boolean = Math.random() < 0.3;
    this.platform = true;

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

    this.moving = {
      moving: false,
    };

    this.super = {
      super: false,
    };

    this.normal = {
      normal: true,
    };
  }

  update(deltaTime) {
      this.normal = true;
    this.moving = this.random_boolean;
    this.super = this.random_boolean;
    const go = Game.getInstance().gameObjects;
    go[1].moving = false;
    go[1].super = false;

    if (this.moving === true) {
      this.pos.x += 0.0015;
      if (this.pos.x >= 1) {
        this.pos.x = 0;
      } else if (this.pos.x <= 0) {
        this.pos.x = 1;
      }
    }
  }

  draw(ctx) {

    if (this.moving === true || this.super === true) {
        this.normal = false;
    }

    if (this.normal === true) {
        ctx.fillStyle = "green";
    }else if (this.moving === true) {
        ctx.fillStyle = "black";
    }else if (this.super === true) {
        ctx.fillStyle = "yellow";
    }

    const pos = Game.toScreen(this.pos);
    const dim = Game.toScreen(this.dim);

    ctx.fillRect(pos.x, pos.y, dim.x, dim.y);
  }
}
