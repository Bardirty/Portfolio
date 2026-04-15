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

![Preview](README-assets/preview.gif)

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

## 👤 Author

Created by **Danil Bardakov**

---

## 💀 Final Words

Make it yours.
Break it.
Rebuild it better.
