import React, { useState } from "react";
import "./AdditiveContent.css";
import { additiveData } from "../../data/additiveData";
import AdditiveFloppyViewer from "./AdditiveFloppyViewer";

export default function AdditiveContent() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="additive-bg">
      
      {selected ? (
        <AdditiveFloppyViewer
          project={selected}
          onClose={() => setSelected(null)}
        />
      ) : (
        <>
          <h2 className="additive-title">Additive Projects</h2>

          <div className="additive-grid">
            {additiveData.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onSelect={() => setSelected(p)}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}

function ProjectCard({ project, onSelect }) {
  return (
    <div className="additive-card" onClick={onSelect}>
      <img src={project.cover} className="additive-cover" alt="" />

      <div className="additive-info">
        <div className="additive-name">{project.title}</div>
        <div className="additive-desc">{project.description}</div>
      </div>
    </div>
  );
}
