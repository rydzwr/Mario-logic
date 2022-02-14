class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
    this.gravity = 0.5;
  }

  update(deltaTime) {
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    //if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += this.gravity;
    //else this.velocity.y = 0;
  }

  draw(ctx, info) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

/*player.update()

function animate()
{
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platform.draw()

    if (keys.right.pressed && player.position.x < 400) 
    {
        player.velocity.x = 5
    }
    else if (keys.left.pressed && player.position > 100)
    {
        player.velocity.x = -5
    }
    else if (keys.up.pressed)
    {
        player.velocity.y = -5
    }
    else if (keys.down.pressed)
    {
        player.velocity.y = 5
    }
    else
    {
        player.velocity.x = 0

        if (keys.right.pressed)
        {
            platform.position.x -= 5
        }
        else if (keys.left.pressed)
        {
            platform.position.x += 5
        }
    }
        

    // Platform collision detection    
    if  (player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height + player.velocity.y >= platform.position.y 
        && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width)
    {
        player.velocity.y = 0
    }
}

animate()*/
