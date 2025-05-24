import { TAMX, TAMY } from "./config.js"

class Space {
  constructor() {
    this.element = document.getElementById("space");

    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    // Mantém proporção vertical, ajusta se menor que tamanho fixo
    this.element.style.width = `${Math.min(screenWidth, TAMX)}px`;
    this.element.style.height = `${Math.min(screenHeight, TAMY)}px`;
    this.element.style.backgroundPositionY = "0px";
  }

  move() {
    this.element.style.backgroundPositionY =
      `${parseInt(this.element.style.backgroundPositionY) + 1}px`;
  }
}


export const space = new Space()