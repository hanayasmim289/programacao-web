import { TAMX } from "./config.js";
import { space } from "./space.js";

const directions = [
  "./assets/png/playerLeft.png",    // esquerda
  "./assets/png/player.png",        // central
  "./assets/png/playerRight.png"    // direita
];

class Ship {
  constructor() {
    this.element = document.createElement("img");
    this.element.id = "ship";
    this.direction = 1; // central
    this.element.src = directions[this.direction];
    this.element.style.bottom = "20px";
    this.element.style.left = `${TAMX / 2 - 25}px`;
    space.element.appendChild(this.element);

    this.speed = 5;  // velocidade do movimento lateral
    this.movingDirection = 0;  // -1 (esq), 0 parado, +1 (dir)
  }

  changeDirection(giro) {
    const newDir = this.direction + giro;
    if (newDir >= 0 && newDir <= 2) {
      this.direction = newDir;
      this.element.src = directions[this.direction];
      this.movingDirection = (giro === 0) ? 0 : (giro > 0 ? 1 : -1);
    }
  }

  stop() {
    this.movingDirection = 0;
    this.direction = 1;
    this.element.src = directions[1];
  }

  move() {
    if (this.movingDirection === 0) return;

    let leftPx = parseInt(this.element.style.left);
    leftPx += this.speed * this.movingDirection;

    if (leftPx < 0) leftPx = 0;
    if (leftPx > TAMX - this.element.width) leftPx = TAMX - this.element.width;

    this.element.style.left = `${leftPx}px`;
  }
}

export const ship = new Ship();
