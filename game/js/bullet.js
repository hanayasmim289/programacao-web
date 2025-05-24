import { space } from "./space.js";

class Bullet {
  constructor(x, y) {
    this.element = document.createElement("div");
    this.element.className = "bullet";
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
    space.element.appendChild(this.element);
    this.speed = 10;
  }

  move() {
    this.element.style.top = `${parseInt(this.element.style.top) - this.speed}px`;
  }

  outOfScreen() {
    return parseInt(this.element.style.top) < 0;
  }
}

const bullets = [];

export const createBullet = (x, y) => {
  bullets.push(new Bullet(x, y));
};

export const moveBullets = () => {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].move();
    if (bullets[i].outOfScreen()) {
      space.element.removeChild(bullets[i].element);
      bullets.splice(i, 1);
    }
  }
};

export const getBullets = () => bullets;
