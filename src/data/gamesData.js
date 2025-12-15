// src/data/gamesData.js
import lostecho from "../assets/covers/lost-echo.png";
import pigeon from "../assets/covers/pigeon.png";
import pawtions from "../assets/covers/pawtion.png";
import inDev from "../assets/covers/indev-img.png";
import talemas from "../assets/covers/talemas.png";
import friday13th from "../assets/covers/friday13th.png";
export const gamesData = [
  // Released Games
  {
    id: "lost-echo",
    title: "Lost Echo",
    description: "Atmospheric horror exploration prototype created as a team project. Focused on mood, environmental storytelling, and pacing.",
    cover: lostecho,
    link: "https://bardirty.itch.io/lost-echo",
    isReleased: true,
  },
  {
    id: "pigeon-race",
    title: "Pigeon Race",
    description: "Stylized arcade racing game set in an ancient Rome-inspired world. Developed during Sosnowiec GameJam 2024.",
    cover: pigeon,
    link: "https://stachue.itch.io/pigeon-race",
    isReleased: true,
  },

  {
    id: "pawtions",
    title: "Pawtions",
    description: "Small potion-crafting game inspired by Potion Craft. Developed during a game jam with focus on UX and tactile interactions.",
    cover: pawtions,
    link: "https://bardirty.itch.io/pawtions",
    isReleased: true,
  },

  {
    id: "talemas",
    title: "Talemas",
    description: "Story-driven Christmas platformer created during a game jam. Focused on narrative flow, atmosphere, and level design.",
    cover: talemas,
    link: "https://bardirty.itch.io/talemas",
    isReleased: true,
  },

  {
    id: "friday13th-jam",
    title: "Friday The 13th",
    description: "Document inspection simulator inspired by Papers, Please. Created during a game jam with multiple endings.",
    cover: friday13th,
    link: "https://jyutgreh.itch.io/friday-the-13th",
    isReleased: true,
  },
  // In Development Games
  {
    id: "project-metroidvania",
    title: "Untitled Metroidvania",
    description: "2D Metroidvania project developed in Unity. Focused on exploration, progression systems, and combat mechanics.",
    cover: inDev,
    link: null,
    isReleased: false,
  },
  {
    id: "ant-diploma-project",
    title: "Hive Crown",
    description: "Action-RPG diploma project. Focused on combat systems, progression design, and scalable architecture.",
    cover: inDev,
    link: null,
    isReleased: false,
  },
  {
    id: "lis-psvita-demake",
    title: "Life is Strange — PS Vita Demake",
    description: "Technical demake of Life is Strange for PS Vita. Focused on performance optimization, memory constraints, and handheld adaptation.",
    cover: inDev,
    isReleased: false,
  },
];
