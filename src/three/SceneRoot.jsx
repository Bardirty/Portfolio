import { useEffect } from "react";
import * as THREE from "three";

export default function SceneRoot() {
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const canvas = renderer.domElement;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "0";
    document.body.appendChild(canvas);

    const bgGeo = new THREE.PlaneGeometry(2, 2);
    const bgMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.0); }`,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        float rand(vec2 p){ return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453); }
        void main(){
          vec3 top=vec3(0.01,0.04,0.13);
          vec3 mid=vec3(0.04,0.10,0.25);
          vec3 horizon=vec3(0.25,0.45,0.85);
          vec3 col=mix(mid,top,smoothstep(0.2,1.0,vUv.y));
          col=mix(col,horizon,smoothstep(0.65,1.0,vUv.y));
          col+=rand(vUv*uTime*0.1)*0.015;
          gl_FragColor=vec4(col,1.0);
        }
      `,
      depthWrite: false,
      depthTest: false
    });
    const bg = new THREE.Mesh(bgGeo, bgMat);
    scene.add(bg);

    const COUNT = 1200;
    const positions = new Float32Array(COUNT * 3);
    const origins = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 5;
      positions[ix] = origins[ix] = x;
      positions[ix + 1] = origins[ix + 1] = y;
      positions[ix + 2] = origins[ix + 2] = z;
      velocities[ix] = velocities[ix + 1] = velocities[ix + 2] = 0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(0.75, 0.85, 1.0),
      size: 0.055,
      transparent: true,
      opacity: 0.85
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouse = new THREE.Vector2(0, 0);
    let targetCamPos = new THREE.Vector3(0, 0, 14);

    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    const mouse3D = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();

    function animate(t) {
      const pos = geometry.attributes.position.array;
      bgMat.uniforms.uTime.value = t * 0.0005;

      raycaster.setFromCamera(mouse, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      raycaster.ray.intersectPlane(plane, mouse3D);

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        const px = pos[ix];
        const py = pos[ix + 1];
        const ox = origins[ix];
        const oy = origins[ix + 1];
        const dx = px - mouse3D.x;
        const dy = py - mouse3D.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 1.8) {
          const force = (1.8 - dist) * 0.025;
          velocities[ix] += (dx / dist) * force;
          velocities[ix + 1] += (dy / dist) * force;
        }

        velocities[ix] *= 0.92;
        velocities[ix + 1] *= 0.92;

        pos[ix] += velocities[ix];
        pos[ix + 1] += velocities[ix + 1];

        pos[ix] += (ox - px) * 0.02;
        pos[ix + 1] += (oy - py) * 0.02;
      }

      geometry.attributes.position.needsUpdate = true;

      targetCamPos.x = mouse.x * 1.5;
      targetCamPos.y = mouse.y * 1.5;

      camera.position.lerp(targetCamPos, 0.06);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}
