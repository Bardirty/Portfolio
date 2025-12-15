import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


function createLabelTexture(text) {
  const canvas = document.createElement("canvas");

  const scale = 4;
  const W = 512;
  const H = 256;

  canvas.width = W * scale;
  canvas.height = H * scale;

  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);

  ctx.fillStyle = "#c5c5c5";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#222";
  ctx.font = "bold 48px 'Courier New'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  function wrapText(text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let line = "";

    words.forEach((word) => {
      const testLine = line + word + " ";
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxWidth && line.length > 0) {
        lines.push(line);
        line = word + " ";
      } else {
        line = testLine;
      }
    });
    lines.push(line);
    return lines;
  }

  const maxLineWidth = 420;
  const lines = wrapText(text, maxLineWidth);

  const lineHeight = 48;

  const startY = H / 2 - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, i) => {
    ctx.fillText(line.trim(), W / 2, startY + i * lineHeight);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

export default function AdditiveFloppyViewer({ project, onClose }) {
  const mountRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      20
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x88b7ff, 1.4);
    rimLight.position.set(-4, 3, -2);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));

    const loader = new GLTFLoader();
    let floppy = null;

    loader.load("/models/floppy.glb", (gltf) => {
  floppy = gltf.scene;
  scene.add(floppy);

  let labelMesh = null;

  floppy.traverse((child) => {
    if (child.isMesh) {
      if (child.name.toLowerCase() === "label") {
        labelMesh = child;
      }

      if (child.material) {
        child.material.metalness = 0.22;
        child.material.roughness = 0.28;
        child.material.envMapIntensity = 1.3;
      }
    }
  });

  if (!labelMesh) {
    console.warn("⚠ Label mesh NOT FOUND. Check Blender mesh name!");
    return;
  }

  console.log("✓ Label found:", labelMesh);
  const texture = createLabelTexture(project.title);

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });

  const planeGeo = new THREE.PlaneGeometry(1, 1);
  const plane = new THREE.Mesh(planeGeo, material);

  plane.position.copy(labelMesh.position);
  plane.rotation.copy(labelMesh.rotation);
  plane.scale.copy(labelMesh.scale);
  plane.scale.multiplyScalar(8);

  plane.position.z += 0.001;
  plane.position.y += 4;

  labelMesh.visible = false;

  labelMesh.parent.add(plane);

  console.log("✓ Correct local transform applied");
});
    let raf;
    let baseSpeed = 0.018;

    let currentRot = { x: 0.3, y: 0, z: 0 };
    let targetRot = { x: 0.3, y: 0, z: 0 };

    const animate = () => {
      if (floppy) {
        const hover = hoverRef.current;

        if (!hover) {
          targetRot = {
            x: 0.25,
            y: (currentRot.y + baseSpeed) % (Math.PI * 2),
            z: 0,
          };
        } else {
          targetRot = { x: 0, y: 0, z: 0 };
        }

        const s = 0.1;
        currentRot.x += (targetRot.x - currentRot.x) * s;
        currentRot.y += (targetRot.y - currentRot.y) * s;
        currentRot.z += (targetRot.z - currentRot.z) * s;

        floppy.rotation.set(currentRot.x, currentRot.y, currentRot.z);
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    animate();
    const resize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [project]);

  return (
    <div className="floppy-view">
      <button className="floppy-close" onClick={onClose}>×</button>

      <div className="floppy-content">
        <div
          className="floppy-left"
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
        >
          <div ref={mountRef} className="floppy-canvas"></div>
        </div>

        <div className="floppy-right">
          <div className="floppy-title">{project.title}</div>
          <div className="floppy-description">{project.description}</div>

          {project.isReleased ? (
            <a
              href={project.link}
              target="_blank"
              className="floppy-play"
              onMouseEnter={() => (hoverRef.current = true)}
              onMouseLeave={() => (hoverRef.current = false)}
            >
              Open Project
            </a>
          ) : (
            <div className="floppy-dev-label">In Development</div>
          )}
        </div>
      </div>
    </div>
  );
}
