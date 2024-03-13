import {
  Ball,
  collisionResolution,
  detectBallsCollision,
  penetrationResolution,
} from "./ball";
import { randInt } from "./math";
import { setupControls } from "./setup";
import { balls, variables } from "./variables";

const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

for (let i = 0; i < 15; i++) {
  new Ball(
    randInt(100, canvas.width - 100),
    randInt(100, canvas.height - 100),
    randInt(20, 30),
    randInt(1, 10),
    canvas
  );
}

setupControls(document, canvas);

function mainLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ball loop (can be optimized)
  balls.forEach((ball, index) => {
    if (variables.showVectors) {
      ball.showVectors(ctx);
    }
    ball.draw(ctx, variables.showMass);
    for (let i = index + 1; i < balls.length; i++) {
      if (detectBallsCollision(ball, balls[i])) {
        penetrationResolution(ball, balls[i]);
        collisionResolution(ball, balls[i]);
      }
    }
    ball.updatePosition(canvas);
  });

  requestAnimationFrame(mainLoop);
}

window.addEventListener("load", () => {
  requestAnimationFrame(mainLoop);
});
