"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Plain Three.js rim (no R3F). Rotation is scrubbed by scroll.
export default function Wheel3D() {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = box.current!; let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch { return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); el.appendChild(renderer.domElement);
    const scene = new THREE.Scene(); const cam = new THREE.PerspectiveCamera(35, 1, 0.1, 50); cam.position.set(0, 0, 6);
    const metal = new THREE.MeshStandardMaterial({ color: 0xb9bcc2, metalness: 1, roughness: 0.28 });
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.28, 32, 96), metal));
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.3, 48).rotateX(Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xd7263d, metalness: 0.6, roughness: 0.3 })));
    for (let i = 0; i < 10; i++) { const s = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.16, 0.12), metal); s.position.set(Math.cos((i / 10) * Math.PI * 2) * 0.95, Math.sin((i / 10) * Math.PI * 2) * 0.95, 0); s.rotation.z = (i / 10) * Math.PI * 2; g.add(s); }
    g.rotation.y = -0.6; scene.add(g);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 3); key.position.set(3, 3, 5); scene.add(key);
    const rim = new THREE.PointLight(0xd7263d, 40, 12); rim.position.set(-3, -1, 2); scene.add(rim);
    const size = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); };
    size(); addEventListener("resize", size);
    const ctx = gsap.context(() => { gsap.to(g.rotation, { z: Math.PI * 3, y: 0.5, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 } }); });
    const tick = () => renderer.render(scene, cam); gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); ctx.revert(); removeEventListener("resize", size); renderer.dispose(); el.innerHTML = ""; };
  }, []);
  return <div ref={box} className="h-[420px] w-full" aria-hidden />;
}
