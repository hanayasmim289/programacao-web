import { FPS, TAMY } from "./config.js";
import { space } from "./space.js";
import { ship } from "./ship.js";
import { createRandomEnemyShip, moveEnemyShips, enemyShips } from "./enemyShip.js";
import { createBullet, moveBullets, getBullets } from "./bullet.js";

let gameRunning = false;
let gamePaused = false;

let score = 0;
let lives = 3;
let damaged = false;
let damageTimer = 0;

const possibleScores = [10, 20, 50, 100]

const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const spaceElement = document.getElementById("space");

// Inicializa vidas na HUD
function initLives() {
  livesDisplay.innerHTML = "";
  for (let i = 0; i < lives; i++) {
    const lifeIcon = document.createElement("img");
    lifeIcon.src = "./assets/png/life.png";
    livesDisplay.appendChild(lifeIcon);
  }
}

function updateScore(points) {
  score += points;
  scoreDisplay.textContent = `Score: ${String(score).padStart(6, '0')}`;
}

function updateLivesDisplay() {
  livesDisplay.innerHTML = "";
  for (let i = 0; i < lives; i++) {
    const lifeIcon = document.createElement("img");
    lifeIcon.src = "./assets/png/life.png";
    livesDisplay.appendChild(lifeIcon);
  }
}

function loseLife() {
  if (damaged) return; // não perde vida se estiver no efeito de dano
  lives--;
  damaged = true;
  damageTimer = 0;
  ship.element.src = "./assets/png/playerDamaged.png"; // mostrar nave danificada
  updateLivesDisplay();
  if (lives <= 0) {
    gameOver();
  }
}

function gameOver() {
  gameRunning = false;

  // Criar overlay de game over
  const overlay = document.createElement("div");
  overlay.id = "game-over-overlay";
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.8)";
  overlay.style.color = "white";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.fontSize = "40px";
  overlay.style.zIndex = "10000";

  overlay.innerHTML = `
    <div>GAME OVER</div>
    <button id="restart-btn" style="margin-top: 20px; padding: 10px 20px; font-size: 24px; cursor: pointer;">Restart</button>
  `;

  spaceElement.appendChild(overlay);

  document.getElementById("restart-btn").addEventListener("click", () => {
    location.reload();
  });
}

function startGame() {
  if (!gameRunning) {
    gameRunning = true;
    gamePaused = false;
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") ship.changeDirection(-1);
  else if (e.key === "ArrowRight") ship.changeDirection(1);
  else if (e.key === " ") {
    if (!gameRunning) {
      startGame();
    }
    else {
      // Criar tiro saindo do centro da nave (posição atual)
      const shipLeft = parseInt(ship.element.style.left);
      createBullet(shipLeft + ship.element.width / 2 - 2, TAMY - 60);
    }
  } else if (e.key === "p" || e.key === "P") {
    gamePaused = !gamePaused;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    ship.stop();
  }
});

function checkCollisions() {
  const bullets = getBullets();

  for (let i = enemyShips.length - 1; i >= 0; i--) {
    const enemy = enemyShips[i];
    const enemyRect = enemy.element.getBoundingClientRect();

    // Verificar colisão da nave com inimigo
    const shipRect = ship.element.getBoundingClientRect();

    if (
      shipRect.left < enemyRect.right &&
      shipRect.right > enemyRect.left &&
      shipRect.top < enemyRect.bottom &&
      shipRect.bottom > enemyRect.top
    ) {
      loseLife();
      // Remover inimigo da tela
      space.element.removeChild(enemy.element);
      enemyShips.splice(i, 1);
      continue;
    }

    // Verificar colisão com tiros
    for (let j = bullets.length - 1; j >= 0; j--) {
      const bullet = bullets[j];
      const bulletRect = bullet.element.getBoundingClientRect();

      if (
        bulletRect.left < enemyRect.right &&
        bulletRect.right > enemyRect.left &&
        bulletRect.top < enemyRect.bottom &&
        bulletRect.bottom > enemyRect.top
      ) {
        // Acertou inimigo!
        updateScore(enemy.points); // pontos para EnemyShip (ajustar para outros inimigos depois)

        // Remover inimigo e tiro
        space.element.removeChild(enemy.element);
        enemyShips.splice(i, 1);

        space.element.removeChild(bullet.element);
        bullets.splice(j, 1);
        break;
      }
    }
  }
}

function run() {
  if (!gameRunning || gamePaused) return;

  space.move();
  ship.move();

  createRandomEnemyShip();
  moveEnemyShips();

  moveBullets();

  checkCollisions();

  // Controle do tempo de dano da nave (5 segundos)
  if (damaged) {
    damageTimer++;
    if (damageTimer > FPS * 5) {
      damaged = false;
      ship.element.src = ship.element.src = [
        "./assets/png/playerLeft.png",
        "./assets/png/player.png",
        "./assets/png/playerRight.png"
      ][ship.direction];
    }
  }
}

setInterval(run, 1000 / FPS);

initLives();
