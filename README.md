![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

# Interactive Portfolio Template

A modern, interactive developer portfolio built with **React + Vite**, featuring modular architecture, animated UI, and optional 3D support.
Designed for developers who want more than a static portfolio.

---

## ✨ Features

* 🎮 **Project showcase system** (grid + dynamic rendering)
* 🧩 **Modular architecture** (easy to extend)
* 🖥️ **Desktop-like UI experience**
* 🎵 Built-in **music player**
* 🌌 **Three.js ready** (3D scene support)
* ⚡ Fast development with **Vite**
* 🎨 Fully customizable content and styling

---

## Preview

<p align="center">
  <img src="README-assets/preview.gif" width="800"/>
</p>

---

## 📦 Installation

```bash
npm install
npm run dev
```

---

## 🛠 Project Structure

```
src/
│
├── components/       # UI components
│   ├── OS/           # Desktop-like system
│   ├── apps/         # App windows (projects, about, etc.)
│   ├── Intro/        # Intro screen
│
├── data/             # Editable content
│   ├── projectsData.js
│   ├── uiData.js
│
├── three/            # 3D logic (Three.js)
├── store/            # Global state
├── assets/           # Images, audio, etc.
│
├── App.jsx
├── main.jsx
```

---

## ✏️ Customization

### 1. Add your projects

Edit:

```
src/data/projectsData.js
```

Example:

```js
{
  id: "your-project",
  title: "Your Project",
  description: "Short description",
  cover: placeholder,
  link: "https://your-link.com",
  isReleased: true,
}
```

---

### 2. Replace assets

* Covers → `src/assets/covers/`
* Audio → `src/audio/`
* Icons → `public/`

---

### 3. Modify UI / behavior

* Desktop → `components/OS/`
* Apps → `components/apps/`
* Intro → `components/Intro/`

---

## 🚀 Deployment

### Vercel / Netlify (recommended)

Just connect your repo and deploy.

### GitHub Pages

Update `vite.config.js`:

```js
export default {
  base: '/your-repo-name/'
}
```

Then build:

```bash
npm run build
```

Deploy the `dist` folder.

---

## 🧠 Tech Stack

* React
* Vite
* JavaScript (ES6+)
* Three.js (optional)
* CSS Modules / custom styles

---

## 📌 Notes

* This is a **template**, not a finished portfolio
* Replace all placeholder data with your own
* Optimized for customization and experimentation

---

## 🤝 Contributing

Feel free to fork and improve the project.

---

## 📄 License

MIT License

---

## 🌐 Live Demo

<p>
  <a href="https://bardirty.github.io/Portfolio/">
    <img src="https://img.shields.io/badge/🚀_Open_Portfolio-000?style=for-the-badge">
  </a>
</p>

---

## 👤 Author

Created by **Danil Bardakov**
