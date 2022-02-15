import Game from "./game.js";

export default class Platform {
  constructor(x, y, width) {
    this.platform = true;

    this.pos = {
      x: x,
      y: y,
    };

    this.dim = {
      x: width,
      y: 0.02,
    };
  }

  update(deltaTime) {}

  draw(ctx) {
    ctx.fillStyle = "green";

    const pos = Game.toScreen(this.pos);
    const dim = Game.toScreen(this.dim);

    ctx.fillRect(pos.x, pos.y, dim.x, dim.y);
  }
}
