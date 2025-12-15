import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GameDiskViewer({ game, onClose }) {
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
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const frontGeo = new THREE.RingGeometry(0.28, 1.38, 128);
    frontGeo.rotateX(-Math.PI / 2);

    const coverTex = new THREE.TextureLoader().load(game.cover);
    coverTex.colorSpace = THREE.SRGBColorSpace;

    const frontMat = new THREE.MeshBasicMaterial({
      map: coverTex,
      side: THREE.FrontSide,
    });

    const front = new THREE.Mesh(frontGeo, frontMat);
    front.position.z = 0.01;
    scene.add(front);

    const backGeo = new THREE.RingGeometry(0.28, 1.38, 128);
    backGeo.rotateX(Math.PI / 2);

    const pos = backGeo.attributes.position;
    const count = pos.count;
    const tangents = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      let tx = -z;
      let tz = x;
      const len = Math.hypot(tx, tz);

      tangents[i * 3] = tx / len;
      tangents[i * 3 + 1] = 0;
      tangents[i * 3 + 2] = tz / len;
    }
    backGeo.setAttribute("tangent", new THREE.BufferAttribute(tangents, 3));
    const cdMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uRotation: { value: 0 },
        uR: { value: 0.9 },
        uD: { value: 40.0 },
        uLightPos: { value: new THREE.Vector3(0, 0, 0) },
        uEyePos: { value: new THREE.Vector3(0, 0, 0) },
        uHilite: { value: new THREE.Color(1.0, 1.0, 0.95) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vTangent;
        varying vec3 vPos;
        attribute vec3 tangent;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vTangent = normalize(normalMatrix * tangent);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vPos = mvPos.xyz;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vTangent;
        varying vec3 vPos;
        uniform float uTime;
        uniform float uR;
        uniform float uD;
        uniform float uRotation;
        uniform vec3 uLightPos;
        uniform vec3 uEyePos;
        uniform vec3 uHilite;

        vec3 blend3(vec3 x) {
          vec3 y = 1.0 - x * x;
          return max(y, vec3(0.0));
        }

        void main() {
          vec3 L = normalize(uLightPos - vPos);
          vec3 V = normalize(uEyePos - vPos);
          vec3 H = normalize(L + V);

          float u = dot(vTangent, H) * uD;
          float w = dot(vNormal, H);
          float w_safe = (abs(w) < 1e-4) ? 1e-4 : w;

          float e = uR * u / w_safe;
          float c = exp(-e * e);

          vec3 anis = uHilite * c * 0.45;

          float absu = abs(u);
          vec3 cdiff = vec3(0.0);

          for (int n = 1; n < 8; n++) {
            float y = 2.0 * absu / float(n) - 1.0;
            cdiff += blend3(vec3(
              4.0 * (y - 0.75),
              4.0 * (y - 0.5),
              4.0 * (y - 0.25)
            ));
          }

          cdiff *= 1.6;

          float NdotL = max(dot(normalize(vNormal), L), 0.0);
          vec3 silver = vec3(0.72, 0.74, 0.76) * (0.6 * NdotL + 0.3);
          vec3 ambient = vec3(0.25, 0.28, 0.32);

          float fres = pow(1.0 - max(dot(normalize(V), normalize(vNormal)), 0.0), 3.0);
          vec3 fresnelCol = vec3(1.0, 1.0, 1.1) * fres * 0.25;

          vec3 color = ambient + silver + cdiff * 0.9 + anis + fresnelCol;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.FrontSide,
    });

    const back = new THREE.Mesh(backGeo, cdMat);
    back.position.z = -0.01;
    scene.add(back);
    const light = new THREE.PointLight(0xffffff, 1.4);
    light.position.set(3, 4, 5);
    scene.add(light);

    const tmp = new THREE.Vector3();
    function updateShaderUniforms() {
      cdMat.uniforms.uEyePos.value.set(0, 0, 0);
      tmp.copy(light.position).applyMatrix4(camera.matrixWorldInverse);
      cdMat.uniforms.uLightPos.value.copy(tmp);
    }
    let raf;
    let baseSpeed = 0.04;
    let target = { x: 0.25, y: 0, z: 0 };
    let current = { x: 0.25, y: 0, z: 0 };

    const animate = (t) => {
      cdMat.uniforms.uTime.value = t * 0.001;
      updateShaderUniforms();

      const hovered = hoverRef.current;

      if (!hovered) {
        target = { x: 0.5, y: 0, z: current.z + baseSpeed };
      } else {
        target = { x: Math.PI * 0.5, y: current.y - baseSpeed * 3, z: 0 };
      }

      const s = 0.1;
      current.x += (target.x - current.x) * s;
      current.y += (target.y - current.y) * s;
      current.z += (target.z - current.z) * s;

      front.rotation.set(current.x, current.y, current.z);
      back.rotation.set(current.x, current.y, current.z);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();
    const resize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);

      renderer.dispose();
      coverTex.dispose();
      frontGeo.dispose();
      backGeo.dispose();

      mount.removeChild(renderer.domElement);
    };
  }, [game]);
  return (
    <div 
      className="disk-view">
      <button className="disk-close" onClick={onClose}>×</button>

      <div className="disk-content">

        <div className="disk-left">
          <div ref={mountRef} className="disk-canvas"></div>
        </div>

        <div className="disk-right">

          <div className="disk-title">{game.title}</div>

          <div className="disk-description">
            {game.description || "No description provided."}
          </div>
          <div className="disk-divider"></div>

          {game.genre && (
            <div className="disk-meta">
              <span>Genre:</span> {game.genre}
            </div>
          )}

          {game.year && (
            <div className="disk-meta">
              <span>Year:</span> {game.year}
            </div>
          )}

          {game.isReleased ? (
            <a
              className="disk-play"
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"

              onMouseEnter={() => (hoverRef.current = true)}
              onMouseLeave={() => (hoverRef.current = false)}
            >
              Play on itch.io
            </a>
          ) : (
            <div className="disk-dev-label">In Development</div>
          )}

        </div>
      </div>
    </div>
  );

}
