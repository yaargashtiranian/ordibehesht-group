"use client";

import { useEffect, useRef, useState } from "react";
import { BrandMark } from "./brand-mark";

export function Sculpture() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanup = () => {};
    async function init() {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      if (disposed || !element) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0xffffff, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0.3, 10);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const env = pmrem.fromScene(room, 0.04);
      scene.environment = env.texture;
      room.dispose();
      const group = new THREE.Group();
      scene.add(group);
      const teal = new THREE.MeshStandardMaterial({ color: "#075754", metalness: 0.78, roughness: 0.25 });
      const gold = new THREE.MeshStandardMaterial({ color: "#d4b477", metalness: 0.88, roughness: 0.24 });
      const shape = new THREE.Shape();
      const count = 90;
      // Tapered sculptural crescent, extruded into a solid metal ribbon.
      for (let i = 0; i <= count; i++) {
        const t = i / count;
        const angle = -0.12 + t * Math.PI * 1.25;
        const radius = 1.93;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
      }
      for (let i = count; i >= 0; i--) {
        const t = i / count;
        const angle = -0.12 + t * Math.PI * 1.25;
        const radius = 1.93 - Math.sin(t * Math.PI) * 0.83;
        shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      shape.closePath();
      const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.38, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: 0.06, bevelThickness: 0.06, curveSegments: 64 });
      const ribbons: InstanceType<typeof THREE.Mesh>[] = [];
      for (let i = 0; i < 3; i++) {
        const ribbon = new THREE.Mesh(geometry, i === 1 ? gold : teal);
        ribbon.rotation.z = i * Math.PI * 2 / 3;
        ribbon.position.set(Math.cos(i * Math.PI * 2 / 3) * 0.22, Math.sin(i * Math.PI * 2 / 3) * 0.22, i * 0.18);
        group.add(ribbon);
        ribbons.push(ribbon);
      }
      group.rotation.set(0.15, -0.34, -0.22);
      const key = new THREE.DirectionalLight("#fff4de", 5);
      key.position.set(-3, 4, 6); scene.add(key);
      const rim = new THREE.DirectionalLight("#d4fff7", 3);
      rim.position.set(4, -1, 3); scene.add(rim);
      let visible = true;
      let frame = 0;
      let previous = 0;
      let pointerX = 0;
      let pointerY = 0;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const resize = () => {
        const width = element.clientWidth;
        const height = element.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      const observer = new ResizeObserver(resize); observer.observe(element);
      const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "100px" });
      intersection.observe(element);
      const pointer = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.35;
        pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.18;
      };
      element.addEventListener("pointermove", pointer);
      const lost = (event: Event) => { event.preventDefault(); setReady(false); };
      renderer.domElement.addEventListener("webglcontextlost", lost);
      const animate = (time: number) => {
        frame = requestAnimationFrame(animate);
        if (!visible || document.hidden || reduced.matches || time - previous < 32) return;
        previous = time;
        if (!reduced.matches) {
          const rect = element.getBoundingClientRect();
          const scroll = Math.max(0, -rect.top / window.innerHeight);
          group.rotation.y += (-0.34 + pointerX + scroll * 0.8 - group.rotation.y) * 0.035;
          group.rotation.x += (0.15 + pointerY - group.rotation.x) * 0.035;
          group.rotation.z = -0.22 + Math.sin(time * 0.00016) * 0.06;
          group.position.y = Math.sin(time * 0.0007) * 0.055;
          ribbons.forEach((ribbon, i) => { ribbon.position.z = i * 0.18 + scroll * i * 0.3; });
        }
        renderer.render(scene, camera);
      };
      resize(); setReady(true); frame = requestAnimationFrame(animate);
      cleanup = () => {
        cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect();
        element.removeEventListener("pointermove", pointer);
        renderer.domElement.removeEventListener("webglcontextlost", lost);
        geometry.dispose(); teal.dispose(); gold.dispose(); env.dispose(); pmrem.dispose(); renderer.dispose();
        renderer.domElement.remove();
      };
    }
    init().catch(() => { if (!disposed) setReady(false); });
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div ref={host} className="sculpture" aria-hidden="true">
      <div className={`sculpture-fallback ${ready ? "is-hidden" : ""}`}><BrandMark /></div>
      <div className="sculpture-shadow" />
    </div>
  );
}
