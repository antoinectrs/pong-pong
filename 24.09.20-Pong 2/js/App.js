class App {
  constructor() {
    console.log("App lancée");
    const urlParameter = new URLSearchParams(window.location.search);
    this.ID = urlParameter.get("player");
    console.log(this.player);
    this.setup();
  }

  setup() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    // x, y, r, ctx
    this.ball = new Ball(
      window.innerWidth / 2,
      window.innerHeight / 2,
      40,
      this.ctx
    );

    // Ajouter player 1

    this.player1 = new Player(
      0,
      window.innerHeight / 2,
      20,
      200,
      this.ctx,
      this.ID
    );

    if(this.ID==2){
      this.player1.inactive=true;
    }

    // Ajouter player 2

    this.player2 = new Player(
      window.innerWidth - 20,
      window.innerHeight / 2,
      20,
      200,
      this.ctx,
      this.ID
    );

    if(this.ID==1){
      this.player2.inactive=true;
    }

    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));

    this.appHasStarted = false;
    DATABASE.ref("PONG_SORAYAANTOINE/POSITION").on(
      "value",
      this.onValueChanged.bind(this)
    );

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ball.move();
    this.ball.show();

    if (this.ID == 1) {
      this.player1.show();
      this.player1.move();
      this.player1.detect(this.ball);
    }

    if (this.ID == 2) {
      this.player2.show();
      this.player2.move();
      this.player2.detect(this.ball);
    }
    requestAnimationFrame(this.draw.bind(this));
  }
  onKeyDown(e) {
    // console.log(e.keyCode);
    if (e.keyCode == 38) {
      this.player2.direction = -1;
    }
    if (e.keyCode == 40) {
      this.player2.direction = 1;
    }
    if (e.keyCode == 65) {
      this.player1.direction = -1;
    }
    if (e.keyCode == 89) {
      this.player1.direction = 1;
    }
  }
  onKeyUp(e) {
    if (e.keyCode == 38 || e.keyCode == 40) {
      this.player2.direction = 0;
    }
    if (e.keyCode == 65 || e.keyCode == 89) {
      this.player1.direction = 0;
    }
  }
  onValueChanged(snapshot) {
    console.log("snapshot", snapshot.val());
    if (!this.appHasStarted) {
      this.appHasStarted = true;
      this.draw();
    }
    this.getBall(snapshot.val());
  }

  getBall(data) {
    if (this.ID != data.id) {
      this.ball.y = data.y;
      this.ball.speedX = data.vitesseX;
      this.ball.speedY = data.vitesseY;

      if (this.ID == 1) {
        this.ball.x = window.innerWidth;
      } else if (this.ID == 2) {
        this.ball.x = 0;
      }
    }
  }
}

window.onload = () => {
  new App();
};
