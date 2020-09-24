class Player {
  constructor(x, y, w, h, ctx, id) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ID = id;
    this.color = "black";
    this.inactive = false;

    this.speed = 20;
    this.direction = 0;
  }

  show() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.w, this.h);
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    this.y += this.speed * this.direction;

    if (this.y < 0) {
      this.y = 0;
    }

    if (this.y + this.h > window.innerHeight) {
      this.y = window.innerHeight - this.h;
    }
  }

  detect(ball) {
    //checker si la balle touche les coordonnées du player
    // si true,  changer sa speedX (*-1)

    if (this.inactive==false && ball.x == this.x && this.y < ball.y && this.y + this.h > ball.y) {
      //console.log("youpi");
      ball.speedX *= -1;
    } else if (ball.speedX !=0 && ball.x < 0 || ball.x > window.innerWidth) {
      //console.log("LOSER");
      // alert("Game Over");
      // ball.x = window.innerWidth / 2;
      // ball.y = window.innerHeighth / 2;

      //4 cas de figures à verifier
      //1. --> this.ID == 1 && ball.x<0 --> loose
      //2. --> this.ID == 1 && ball.x>window.innerWidth --> send Firebase
      //3. --> this.ID == 2 && ball.x<0 --> send Firebase
      //4. --> this.ID == 2 && ball.x>window.innerWidth --> looser

      //  LOOSE CONDITION
      if (
        (this.ID == 1 && ball.x < 0) ||
        (this.ID == 2 && ball.x > window.innerWidth)
      ) {
        console.log("LOOSE");
        //alert("Game Over");
        ball.x = window.innerWidth / 2;
        ball.y = window.innerHeighth / 2;
      }
      if (
        (this.ID == 2 && ball.x < 0) ||
        (this.ID == 1 && ball.x > window.innerWidth)
      ) {
        console.log("SEND TO FIREBASE");
        const data = {
          vitesseX: ball.speedX,
          vitesseY: ball.speedY,
          y: ball.y,
          id: this.ID,
        };
        SEND_MESSAGE("PONG_SORAYAANTOINE/POSITION", data);
        ball.hide();
      }
    }
  }
}
