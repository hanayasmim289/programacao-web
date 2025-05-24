import { TAMX, PROB_ENEMY_SHIP } from "./config.js";
import { space } from "./space.js";

const ENEMY_TYPES = [
    "./assets/png/enemyShip.png",
    "./assets/png/enemyUFO.png",
    "./assets/png/meteorBig.png",
    "./assets/png/meteorSmall.png",
];

class EnemyShip {
  constructor() {
    this.element = document.createElement("img");
    this.element.className = "enemy-ship";
    this.element.src = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)]
    this.element.style.top = "-40px";
    this.element.style.left = `${parseInt(Math.random() * (TAMX - 40))}px`;
    space.element.appendChild(this.element);
    this.speed = 2 + (Math.random()*3)

  }

  move() {
    this.element.style.top = `${parseInt(this.element.style.top) + this.speed}px`;
  }

  outOfScreen() {
    return parseInt(this.element.style.top) > 900;
  }
}

export const enemyShips = [];

export const createRandomEnemyShip = () => {
  if (Math.random() < PROB_ENEMY_SHIP) {
    enemyShips.push(new EnemyShip());
  }
};

export const moveEnemyShips = () => {
  for (let i = enemyShips.length - 1; i >= 0; i--) {
    enemyShips[i].move();

    if (enemyShips[i].outOfScreen()) {
      space.element.removeChild(enemyShips[i].element);
      enemyShips.splice(i, 1);
    }
  }
};
