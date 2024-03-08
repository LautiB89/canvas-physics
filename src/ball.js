import { Vector, substr, dist, getNullVector, sum, dot } from "./math";
import { balls, variables } from "./variables";

export class Ball {
  constructor(x, y, r, m, canvas) {
    this.pos = new Vector(x, y);
    this.r = r;
    this.m = m || 1; // Avoided 0 mass due to bugs
    this.invM = 1 / m;
    this.vel = getNullVector();
    this.acc = getNullVector();
    this.color = "rgb(169,53,53)";
    this.mouseAttached = false;
    this.mousePos = getNullVector();

    canvas.addEventListener("mousedown", (event) => {
      this.mousePos = new Vector(event.pageX, event.pageY);
      if (dist(this.pos, this.mousePos) <= this.r) {
        this.mouseAttached = true;
      }
    });
    canvas.addEventListener("mousemove", (event) => {
      this.mousePos = new Vector(event.pageX, event.pageY);
    });
    canvas.addEventListener("mouseleave", () => {
      this.mouseAttached = false;
      this.acc = getNullVector();
    });
    canvas.addEventListener("mouseup", () => {
      this.mouseAttached = false;
      this.acc = getNullVector();
    });
    balls.push(this);
  }

  handleWallsColision(canvas) {
    if (this.pos.x + this.r >= canvas.width) {
      this.pos.x = canvas.width - this.r;
      this.vel.x = -Math.abs(this.vel.x) * (1 - variables.friction);
    }
    if (this.pos.x - this.r <= 0) {
      this.pos.x = this.r;
      this.vel.x = Math.abs(this.vel.x) * (1 - variables.friction);
    }
    if (this.pos.y + this.r >= canvas.height) {
      this.pos.y = canvas.height - this.r;
      this.vel.y = -Math.abs(this.vel.y) * (1 - variables.friction);
    }
    if (this.pos.y - this.r <= 0) {
      this.pos.y = this.r;
      this.vel.y = Math.abs(this.vel.y) * (1 - variables.friction);
    }
  }

  updatePosition(canvas) {
    this.handleWallsColision(canvas);
    if (this.mouseAttached) {
      const dir = substr(this.mousePos, this.pos);
      this.acc = dir.unit().mult(dir.mag() / 10);
    }
    this.vel = sum(this.vel, this.acc).mult(1 - variables.friction);
    this.pos = sum(this.pos, this.vel);
  }

  showVectors(ctx) {
    this.acc.drawVec(ctx, this.pos.x, this.pos.y, 100, "green");
    this.vel.drawVec(ctx, this.pos.x, this.pos.y, 10, "blue");
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();

    if (variables.showMass) {
      ctx.fillStyle = "black";
      ctx.font = "20px Georgia";
      ctx.fillText(this.m, this.pos.x - 5, this.pos.y + 5);
    }
  }
}

export const detectBallsCollision = (ball1, ball2) => {
  if (ball1.r + ball2.r >= substr(ball2.pos, ball1.pos).mag()) {
    return true;
  } else {
    return false;
  }
};

export const penetrationResolution = (ball1, ball2) => {
  const dist2To1 = substr(ball1.pos, ball2.pos);
  const penDepth = ball1.r + ball2.r - dist2To1.mag();
  const penResolution = dist2To1
    .unit()
    .mult(penDepth / (ball1.invM + ball2.invM));
  ball1.pos = sum(ball1.pos, penResolution.mult(ball1.invM));
  ball2.pos = sum(ball2.pos, penResolution.mult(-ball2.invM));
};

export const collisionResolution = (ball1, ball2) => {
  const normal = substr(ball1.pos, ball2.pos).unit();
  const relVel = substr(ball1.vel, ball2.vel);
  const sepVel = dot(relVel, normal);
  const newSepVel = -sepVel * variables.elasticity;
  const vSepDiff = newSepVel - sepVel;
  const impulse = vSepDiff / (ball1.invM + ball2.invM);
  const impulseVec = normal.mult(impulse);
  ball1.vel = sum(ball1.vel, impulseVec.mult(ball1.invM));
  ball2.vel = sum(ball2.vel, impulseVec.mult(-ball2.invM));
};
