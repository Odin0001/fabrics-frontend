import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 30000;
const BALL_R = 2.8;
const HOLD_BALL = 2.5;
const MORPH_DUR = 2.5;
const HOLD_TEXT = 3.0;
const REV_DUR = 2.0;

function spherePt(r) {
  const u = Math.random(), v = Math.random();
  const th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1);
  const cr = r * Math.cbrt(0.7 + 0.3 * Math.random());
  return [
    cr * Math.sin(ph) * Math.cos(th),
    cr * Math.sin(ph) * Math.sin(th),
    cr * Math.cos(ph),
  ];
}

function buildTextTargets(word, count) {
  const cv = document.createElement("canvas");
  cv.width = 900;
  cv.height = 220;
  const cx = cv.getContext("2d");
  cx.fillStyle = "#fff";
  cx.font = "bold 170px Georgia, serif";
  cx.textAlign = "center";
  cx.textBaseline = "middle";
  cx.fillText(word, 450, 110);
  const data = cx.getImageData(0, 0, 900, 220).data;
  const pts = [];
  for (let y = 0; y < 220; y += 4)
    for (let x = 0; x < 900; x += 4) {
      const i = (y * 900 + x) * 4;
      if (data[i + 3] > 100)
        pts.push([(x - 450) / 900 * 14, -(y - 110) / 220 * 3.5, 0]);
    }
  const out = [];
  const step = pts.length / count;
  for (let i = 0; i < count; i++)
    out.push(pts[Math.floor(i * step) % pts.length]);
  return out;
}

function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function WoolToArtia() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;

    // ── renderer (attach directly to canvas element) ──────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H, false); // false = don't set CSS size
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.01, 200);
    camera.position.set(0, 0, 11);

    // ── ball particle positions ───────────────────────────────────────────
    const ballPos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const [x, y, z] = spherePt(BALL_R);
      ballPos[i * 3] = x;
      ballPos[i * 3 + 1] = y;
      ballPos[i * 3 + 2] = z;
    }

    // ── text targets ──────────────────────────────────────────────────────
    const textTargets = buildTextTargets("ARTIA", PARTICLE_COUNT);

    // ── particle colours (warm browns → creams) ───────────────────────────
    const col = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = Math.random();
      col[i * 3]     = 0.5 + t * 0.45;
      col[i * 3 + 1] = 0.22 + t * 0.38;
      col[i * 3 + 2] = 0.04 + t * 0.18;
    }

    // ── particle mesh ─────────────────────────────────────────────────────
    const cur = new Float32Array(ballPos);
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(cur, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 1,
    });
    const particleMesh = new THREE.Points(pGeo, pMat);
    scene.add(particleMesh);

    // ── wool strands ──────────────────────────────────────────────────────
    const strandGroup = new THREE.Group();
    scene.add(strandGroup);
    const strands = [];

    for (let s = 0; s < 90; s++) {
      const pts2 = [];
      const th0 = Math.random() * Math.PI * 2;
      const ph0 = Math.acos(2 * Math.random() - 1);
      const wind = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 4);
      const seg = 70;
      const r = BALL_R * (0.97 + Math.random() * 0.05);

      for (let i = 0; i <= seg; i++) {
        const t = i / seg;
        const th = th0 + wind * t * Math.PI;
        const ph = ph0 + t * Math.PI * (0.3 + Math.random() * 0.7);
        const n = 0.07 * Math.sin(t * 15 + s * 0.7);
        pts2.push(
          new THREE.Vector3(
            (r + n) * Math.sin(ph) * Math.cos(th),
            (r + n) * Math.sin(ph) * Math.sin(th),
            (r + n) * Math.cos(ph)
          )
        );
      }

      const geo = new THREE.BufferGeometry().setFromPoints(pts2);
      const brown = new THREE.Color().setHSL(
        0.07 + Math.random() * 0.04,
        0.7 + Math.random() * 0.2,
        0.25 + Math.random() * 0.2
      );
      const mat = new THREE.LineBasicMaterial({
        color: brown,
        transparent: true,
        opacity: 0.9,
      });
      const line = new THREE.Line(geo, mat);
      strandGroup.add(line);
      strands.push(line);
    }

    // ── state machine ─────────────────────────────────────────────────────
    let state = "ball";
    let timer = 0;
    let prev = performance.now();
    let animId;
    let morphStartRotY = 0;
    let morphStartRotX = 0;

    function tick() {
      animId = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = (now - prev) / 1000;
      prev = now;
      timer += dt;

      const pa = pGeo.attributes.position;

      if (state === "ball") {
        particleMesh.rotation.y += 0.009;
        strandGroup.rotation.y += 0.009;
        strandGroup.rotation.x = Math.sin(timer * 0.4) * 0.06;
        particleMesh.rotation.x = Math.sin(timer * 0.4) * 0.06;
        if (timer > HOLD_BALL) {
          morphStartRotY = particleMesh.rotation.y;
          morphStartRotX = particleMesh.rotation.x;
          state = "morphing"; timer = 0; 
        }
      }
      else if (state === "morphing") {
        const p = Math.min(timer / MORPH_DUR, 1);
        const e = ease(p);
        strands.forEach(l => { l.material.opacity = Math.max(0, (1 - e * 2) * 0.9); });
        particleMesh.rotation.y = morphStartRotY * (1 - e);
        particleMesh.rotation.x = morphStartRotX * (1 - e);
        strandGroup.rotation.y = particleMesh.rotation.y;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const [tx, ty] = textTargets[i];
          pa.array[i * 3]     = ballPos[i * 3]     * (1 - e) + tx * e;
          pa.array[i * 3 + 1] = ballPos[i * 3 + 1] * (1 - e) + ty * e;
          pa.array[i * 3 + 2] = ballPos[i * 3 + 2] * (1 - e * 0.95);
        }
        pa.needsUpdate = true;
        if (p >= 1) { state = "text"; timer = 0; }
      }
      else if (state === "text") {
        particleMesh.rotation.y = 0;
        particleMesh.rotation.x = Math.sin(timer * 0.3) * 0.025;
        strands.forEach(l => { l.material.opacity = 0; });
        if (timer > HOLD_TEXT) { state = "reversing"; timer = 0; }
      }
      else if (state === "reversing") {
        const p = Math.min(timer / REV_DUR, 1);
        const e = ease(p);
        strands.forEach(l => { l.material.opacity = e * 0.9; });
        strandGroup.rotation.y += 0.009;
        particleMesh.rotation.y += 0.009;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const [tx, ty] = textTargets[i];
          pa.array[i * 3]     = tx * (1 - e) + ballPos[i * 3]     * e;
          pa.array[i * 3 + 1] = ty * (1 - e) + ballPos[i * 3 + 1] * e;
          pa.array[i * 3 + 2] = ballPos[i * 3 + 2] * e;
        }
        pa.needsUpdate = true;
        if (p >= 1) { state = "ball"; timer = 0; }
      }

      renderer.render(scene, camera);
    }

    tick();

    // ── resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-[50vh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* The canvas fills the container — Three.js renders directly onto it */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />

      
    </div>
  );
}