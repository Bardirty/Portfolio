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
    const timer = setTimeout(() => setPause3D(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const timeline = [
    {
      year: "2023 — now",
      title: "Title 1",
      desc: "Description",
    },
    {
      year: "2022 — now",
      title: "Title 2",
      desc: "Description",
    },
  ];


  const skills = [
  { name: "Core Skill", level: "core" },
  
  { name: "Secondary Skill", level: "secondary" },
];

  return (
    <div className="about-bg">
      {!pause3D && <About3D />}

      <div className="about-header">
        <img src={avatar} alt="avatar" className="about-avatar" />

        <div>
          <h1 className="about-title">FirstName LastName</h1>
          <div className="about-subtitle">
            Subtitle Skill • Subtitle Skill 
          </div>
        </div>
      </div>

      <p className="about-desc">
        About me text. Write info above
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
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="about-icon-link"
        >
          <img src={iconGithub} alt="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          className="about-icon-link"
        >
          <img src={iconLinkedIn} alt="LinkedIn" />
        </a>
        <a
          href="https://itch.io"
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
