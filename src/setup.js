import { Ball } from "./ball";
import { Vector, randInt } from "./math";
import { balls, variables } from "./variables";

export const setupControls = (document, canvas) => {
  const showVectorsChecker = document.getElementById("showVectors");
  showVectorsChecker.checked = variables.showVectors;
  showVectorsChecker.addEventListener("change", () => {
    variables.showVectors = showVectorsChecker.checked;
  });

  const showMassChecker = document.getElementById("showMasses");
  showMassChecker.checked = variables.showMass;
  showMassChecker.addEventListener("change", () => {
    variables.showMass = showMassChecker.checked;
  });

  const updateMousePosition = (event) => {
    variables.mousePos = new Vector(event.pageX, event.pageY);
  };
  canvas.addEventListener("mousedown", updateMousePosition);
  canvas.addEventListener("mousemove", updateMousePosition);

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
  elasticitySlider.setAttribute("value", variables.elasticity * 100);
  elasticitySlider.addEventListener("change", () => {
    variables.elasticity = elasticitySlider.value / 100;
  });

  const frictionSlider = document.getElementById("frictionSlider");
  frictionSlider.setAttribute("min", 0);
  frictionSlider.setAttribute("max", 100);
  frictionSlider.setAttribute("value", variables.friction * 20000);
  frictionSlider.addEventListener("change", () => {
    variables.friction = frictionSlider.value / 20000;
  });
};
