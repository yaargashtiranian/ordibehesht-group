"use client";

import { useEffect, useRef, useState } from "react";

export function Sculpture() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanup = () => {};
    async function init() {
      const T = await import("three");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      if (disposed) return;
      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try { renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); } catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setClearColor(0xffffff, 0);
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      element!.appendChild(renderer.domElement);
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(32, 1, .1, 100);
      camera.position.set(0, .35, 10);
      const pmrem = new T.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const environment = pmrem.fromScene(room, .04); room.dispose();
      scene.environment = environment.texture;
      const world = new T.Group(); scene.add(world);
      world.rotation.set(.16, -.5, -.18);
      const materials = [
        new T.MeshPhysicalMaterial({ color: "#105a5b", metalness: .66, roughness: .23, clearcoat: .45, side: T.DoubleSide }),
        new T.MeshPhysicalMaterial({ color: "#d1ac66", metalness: .85, roughness: .26, clearcoat: .4, side: T.DoubleSide }),
      ];
      const geometries: InstanceType<typeof T.BufferGeometry>[] = [];
      // Symbolic geographical texture; visual storytelling, not a geographic data product.
      const map = document.createElement("canvas"); map.width = 1024; map.height = 512;
      const ctx = map.getContext("2d")!;
      ctx.fillStyle = "#163f40"; ctx.fillRect(0, 0, 1024, 512);
      ctx.strokeStyle = "#53776d"; ctx.lineWidth = .6;
      for (let i = 0; i <= 24; i++) { ctx.beginPath(); ctx.moveTo(i * 1024 / 24, 0); ctx.lineTo(i * 1024 / 24, 512); ctx.stroke(); }
      for (let i = 0; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(0, i * 512 / 12); ctx.lineTo(1024, i * 512 / 12); ctx.stroke(); }
      const continents = [
        [[-168,70],[-135,72],[-110,60],[-80,57],[-53,48],[-66,30],[-82,25],[-100,19],[-117,32],[-130,53]],
        [[-80,12],[-60,7],[-36,-5],[-42,-24],[-67,-56],[-78,-20]],
        [[-18,35],[8,38],[32,31],[44,12],[51,2],[34,-30],[18,-35],[4,-9],[-15,9]],
        [[-10,36],[-8,59],[24,70],[48,55],[93,73],[164,60],[180,49],[140,35],[121,5],[100,8],[78,30],[55,24],[34,37]],
        [[112,-11],[135,-10],[153,-25],[145,-39],[116,-35]],
        [[-53,83],[-20,78],[-43,59],[-60,64]],
        [[48,-13],[51,-18],[47,-25],[43,-20]],
      ];
      ctx.fillStyle = "#bca36e";
      for (const points of continents) {
        ctx.beginPath(); points.forEach(([longitude, latitude], i) => { const x = (longitude + 180) / 360 * 1024; const y = (90 - latitude) / 180 * 512; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }); ctx.closePath(); ctx.fill();
      }
      const texture = new T.CanvasTexture(map); texture.colorSpace = T.SRGBColorSpace;
      const globeGeometry = new T.SphereGeometry(1.34, 64, 40); geometries.push(globeGeometry);
      const globeMaterial = new T.MeshStandardMaterial({ map: texture, metalness: .38, roughness: .48 });
      const globe = new T.Mesh(globeGeometry, globeMaterial); globe.rotation.y = .7; world.add(globe);
      const bands: InstanceType<typeof T.Group>[] = [];
      for (let band = 0; band < 3; band++) {
        const vertices: number[] = []; const indices: number[] = [];
        const rows = 96; const columns = 12;
        for (let i = 0; i <= rows; i++) {
          const t = i / rows; const longitude = t * Math.PI * 1.5 - .3;
          const halfWidth = Math.sin(t * Math.PI) * .27 + .006;
          for (let j = 0; j <= columns; j++) {
            const latitude = (j / columns * 2 - 1) * halfWidth;
            const r = 1.85;
            vertices.push(r * Math.cos(latitude) * Math.sin(longitude), r * Math.sin(latitude), r * Math.cos(latitude) * Math.cos(longitude));
            if (i < rows && j < columns) { const a = i * (columns + 1) + j; const b = a + columns + 1; indices.push(a, b, a + 1, b, b + 1, a + 1); }
          }
        }
        const geometry = new T.BufferGeometry(); geometry.setAttribute("position", new T.Float32BufferAttribute(vertices, 3)); geometry.setIndex(indices); geometry.computeVertexNormals(); geometries.push(geometry);
        const orbit = new T.Group(); orbit.rotation.set(.55 + band * .55, 0, band * Math.PI * 2 / 3);
        orbit.add(new T.Mesh(geometry, materials[band === 1 ? 1 : 0])); world.add(orbit); bands.push(orbit);
      }
      const orbitGeometry = new T.TorusGeometry(2.05, .007, 6, 120); geometries.push(orbitGeometry);
      const orbitLineMaterial = new T.MeshBasicMaterial({ color: "#b6a275", transparent: true, opacity: .6 });
      const line = new T.Mesh(orbitGeometry, orbitLineMaterial); line.rotation.x = 1.13; line.rotation.z = .4; world.add(line);
      const satelliteGeometry = new T.SphereGeometry(.065, 12, 10); geometries.push(satelliteGeometry);
      const satellite = new T.Mesh(satelliteGeometry, materials[1]); world.add(satellite);
      const key = new T.DirectionalLight("#fff4df", 4); key.position.set(-3, 4, 6); scene.add(key);
      const fill = new T.DirectionalLight("#d5fff2", 2); fill.position.set(4, -1, 3); scene.add(fill);
      let frame = 0; let previous = 0; let visible = true; let lostContext = false; let x = 0; let y = 0;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)");
      const resize = () => {
        if (!element!.clientWidth || !element!.clientHeight) return;
        renderer.setSize(element!.clientWidth, element!.clientHeight); camera.aspect = element!.clientWidth / element!.clientHeight; camera.updateProjectionMatrix(); renderer.render(scene, camera);
      };
      const observer = new ResizeObserver(resize); observer.observe(element!);
      const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "100px" }); intersection.observe(element!);
      const pointer = (event: PointerEvent) => { const r = element!.getBoundingClientRect(); x = ((event.clientX - r.left) / r.width - .5) * .6; y = ((event.clientY - r.top) / r.height - .5) * .35; };
      const lost = (event: Event) => { event.preventDefault(); lostContext = true; setReady(false); };
      const restored = () => { lostContext = false; resize(); setReady(true); };
      element!.addEventListener("pointermove", pointer); renderer.domElement.addEventListener("webglcontextlost", lost); renderer.domElement.addEventListener("webglcontextrestored", restored);
      const animate = (time: number) => {
        frame = requestAnimationFrame(animate);
        if (!visible || document.hidden || reduced.matches || lostContext || time - previous < 32) return;
        previous = time;
        const seconds = time * .001; const scroll = Math.max(0, -element!.getBoundingClientRect().top / innerHeight);
        world.rotation.y += (-.5 + x + scroll * .7 - world.rotation.y) * .04; world.rotation.x += (.16 + y - world.rotation.x) * .04;
        globe.rotation.y = .7 + seconds * .09;
        bands.forEach((orbit, i) => { orbit.rotation.y = seconds * (.14 + i * .025) + i * 2.1; orbit.scale.setScalar(1 + Math.sin(seconds * .9 + i * 2) * .025 + scroll * .06); });
        world.position.y = Math.sin(seconds * .8) * .08;
        const a = seconds * .55; satellite.position.set(Math.cos(a) * 2.05, Math.sin(a) * .85, Math.sin(a) * 1.83);
        renderer.render(scene, camera);
      };
      satellite.position.set(2.05, 0, 0); resize(); setReady(true); frame = requestAnimationFrame(animate);
      cleanup = () => {
        cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); element!.removeEventListener("pointermove", pointer);
        renderer.domElement.removeEventListener("webglcontextlost", lost); renderer.domElement.removeEventListener("webglcontextrestored", restored);
        geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); globeMaterial.dispose(); orbitLineMaterial.dispose(); texture.dispose(); environment.dispose(); pmrem.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
    }
    init().catch(() => { if (!disposed) setReady(false); });
    return () => { disposed = true; cleanup(); };
  }, []);
  return <div ref={host} className="sculpture" aria-hidden="true"><div className={`sculpture-fallback globe-fallback ${ready ? "is-hidden" : ""}`}><div className="fallback-earth" /><div className="fallback-band band-one" /><div className="fallback-band band-two" /><div className="fallback-band band-three" /></div><div className="sculpture-shadow" /></div>;
}
