export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  mag() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  unit() {
    const magnitude = this.mag();
    return magnitude === 0 ? getNullVector() : div(this, magnitude);
  }

  mult(c) {
    return new Vector(this.x * c, this.y * c);
  }

  normal() {
    return new Vector(-this.y, this.x).unit();
  }

  drawVec(ctx, startX, startY, n, color) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + this.x * n, startY + this.y * n);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

export const sum = (v1, v2) => new Vector(v1.x + v2.x, v1.y + v2.y);

export const dist = (v1, v2) =>
  Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));

export const div = (v1, d) => new Vector(v1.x / d, v1.y / d);

export const substr = (v1, v2) => new Vector(v1.x - v2.x, v1.y - v2.y);

export const getNullVector = () => new Vector(0, 0);

export const dot = (v1, v2) => v1.x * v2.x + v1.y * v2.y;

export const round = (number, precision) => {
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
};

export const randInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
