// src/data/gamesData.js
import template from "../assets/covers/template.jpg";
import inDev from "../assets/covers/indev-img.png";
export const gamesData = [
  // Released Games
  {
    id: "temp-game",
    title: "Game Template",
    description: "Your description of game",
    cover: template,
    link: null, // URL for project in ""
    isReleased: true,
  },
  // In Development Games
  {
    id: "temp-indev-game",
    title: "Unreleased Game Template",
    description: "Your description of future game",
    cover: inDev,
    link: null,
    isReleased: false,
  },
];
