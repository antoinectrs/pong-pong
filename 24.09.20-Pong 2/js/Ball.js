class Ball {
  constructor(x, y, r, ctx) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speedX = 10;
    this.speedY = Math.random() * 10;
    this.color = "blue";
    this.ctx = ctx;
    console.log("Ball is ready");
  }

  show() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y > window.innerHeight || this.y < 0) {
      this.speedY *= -1;
    }

    //dès que detec player,devient vrai
    // if(this.x > window.innerWidth || this.x <0){
    //     this.speedX*= -1;
    // }
  }

  hide() {
    this.speedX = 0;
    this.speedY = 0;
    this.x = -50;
    this.y = -50;
  }
}
