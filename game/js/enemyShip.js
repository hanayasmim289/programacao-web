import { TAMX, PROB_ENEMY_SHIP } from "./config.js";
import { space } from "./space.js";

const ENEMY_TYPES = {
  enemyShip: {
    src: "./assets/png/enemyShip.png",
    width: 40,
    height: 40,
    points: 50,
    speedMin: 3,
    speedMax: 5,
  },
  ufo: {
    src: "./assets/png/enemyUFO.png",
    width: 45,
    height: 40,
    points: 20,
    speedMin: 2,
    speedMax: 4,
  },
  asteroidBig: {
    src: "assets/png/meteorBig.png",
    width: 50,
    height: 50,
    points: 10,
    speedMin: 1,
    speedMax: 3,
  },
  asteroidSmall: {
    src: "assets/png/meteorSmall.png",
    width: 30,
    height: 30,
    points: 100,
    speedMin: 4,
    speedMax: 6,
  }
};

let difficulty = 1;

class EnemyShip {
  constructor() {
    this.element = document.createElement("img");
    this.element.className = "enemy-ship";
    this.element.style.top = "-20px";
    this.element.style.left = `${parseInt(Math.random() * (TAMX))}px`;

    this.type = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)]
    this.element.src = this.type.src
    this.speed = this.type.speedMin + Math.random() * (this.type.speedMax + this.type.speedMin)/2;
    this.speed *= difficulty;
    space.element.appendChild(this.element);

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
