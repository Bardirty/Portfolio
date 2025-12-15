import React, { useState, useEffect } from "react";
import "./AboutContent.css";
import About3D from "./About3D";

import avatar from "../../assets/avatar.png";
import iconGithub from "../../assets/icons/github.svg";
import iconLinkedIn from "../../assets/icons/linkedin.svg";
import iconItch from "../../assets/icons/itch.svg";

export default function AboutContent() {
  const [pause3D, setPause3D] = useState(true);

  useEffect(() => {
    // Запускаем 3D с небольшой задержкой для плавности
    const timer = setTimeout(() => setPause3D(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const timeline = [
    {
      year: "2023 — now",
      title: "Game Developer",
      desc: "Developing atmospheric games and interactive experiences. Working on gameplay systems, shaders, tools, and overall game feel.",
    },
    {
      year: "2022 — now",
      title: "Software Developer",
      desc: "Embedded systems, hardware prototyping, low-level C++ logic, and system-oriented programming.",
    },
    {
      year: "2021 — now",
      title: "Web & 3D Developer",
      desc: "Building interactive 3D web applications using React and Three.js with a focus on UI/UX and real-time graphics.",
    },
  ];


  const skills = [
  { name: "Unity", level: "core" },
  { name: "C#", level: "core" },
  { name: "C++ (Embedded)", level: "core" },
  { name: "C++ / OpenGL", level: "core" },
  
  { name: "Game Design", level: "secondary" },
  { name: "React", level: "secondary" },
  { name: "Three.js", level: "secondary" },
  { name: "Arduino", level: "secondary" },
  { name: "Tools Development", level: "secondary" },
];

  return (
    <div className="about-bg">
      {!pause3D && <About3D />}

      <div className="about-header">
        <img src={avatar} alt="avatar" className="about-avatar" />

        <div>
          <h1 className="about-title">Danil Bardakov</h1>
          <div className="about-subtitle">
            Game Developer • Software Developer
          </div>
        </div>
      </div>

      <p className="about-desc">
        I’m a game developer with a strong technical background, focused on building
        atmospheric and responsive interactive experiences. My work combines gameplay
        systems, real-time 3D rendering, shaders, and low-level programming with modern
        UI/UX engineering.
      </p>

      <div className="about-section-title">Core Skills</div>
      <div className="about-tags">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={`about-tag ${skill.level === "core" ? "core" : ""}`}
          >
            {skill.name}
          </div>
        ))}
      </div>

      <div className="about-section-title">Experience Timeline</div>
      <div className="timeline">
        {timeline.map((item, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-block">
              <div className="timeline-title">{item.title}</div>
              <div className="timeline-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="about-section-title">Links</div>
      <div className="about-links">
        <a
          href="https://github.com/Bardirty"
          target="_blank"
          rel="noreferrer"
          className="about-icon-link"
        >
          <img src={iconGithub} alt="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/danilbardakov/"
          target="_blank"
          rel="noreferrer"
          className="about-icon-link"
        >
          <img src={iconLinkedIn} alt="LinkedIn" />
        </a>
        <a
          href="https://bardirty.itch.io"
          target="_blank"
          rel="noreferrer"
          className="about-icon-link"
        >
          <img src={iconItch} alt="itch.io" />
        </a>
      </div>
    </div>
  );
}
