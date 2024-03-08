import { Ball } from "./ball";
import { randInt } from "./math";
import { balls, variables } from "./variables";

export const setupControls = (document, canvas) => {
  const showVectorsChecker = document.getElementById("showVectors");
  showVectorsChecker.addEventListener("change", () => {
    variables.showVectors = showVectorsChecker.checked;
  });

  const showMassChecker = document.getElementById("showMasses");
  showMassChecker.addEventListener("change", () => {
    variables.showMass = showMassChecker.checked;
  });

  document.getElementById("ballGenerator").addEventListener("click", () => {
    new Ball(
      randInt(100, canvas.width - 100),
      randInt(100, canvas.height - 100),
      randInt(10, 15),
      randInt(0.1, 10),
      canvas
    );
  });

  document.getElementById("crazy").addEventListener("click", () => {
    balls.forEach((ball) => {
      ball.vel.x = randInt(-10, 10);
      ball.vel.y = randInt(-10, 10);
    });
  });

  const elasticitySlider = document.getElementById("elasticitySlider");
  elasticitySlider.setAttribute("min", 0);
  elasticitySlider.setAttribute("max", 100);
  elasticitySlider.setAttribute("value", variables.elasticity);
  elasticitySlider.addEventListener("change", () => {
    variables.elasticity = elasticitySlider.value / 100;
  });

  const frictionSlider = document.getElementById("frictionSlider");
  frictionSlider.setAttribute("min", 0);
  frictionSlider.setAttribute("max", 100);
  frictionSlider.setAttribute("value", variables.friction);
  frictionSlider.addEventListener("change", () => {
    variables.friction = frictionSlider.value / 20000;
  });
};
