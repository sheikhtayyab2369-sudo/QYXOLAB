"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse tracking for interactive tilt
    let targetRotX = 0.2;
    let targetRotY = -0.3;
    let rotX = 0.2;
    let rotY = -0.3;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      targetRotY = normX * 0.9;
      targetRotX = -normY * 0.7;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const normX = touch.clientX / window.innerWidth - 0.5;
        const normY = touch.clientY / window.innerHeight - 0.5;
        targetRotY = normX * 1.1;
        targetRotX = -normY * 0.8;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // 3D Particles cloud around the AI core
    const PARTICLE_COUNT = 90;
    const particles: { x: number; y: number; z: number; size: number; speed: number; alpha: number }[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 90 + Math.random() * 220;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particles.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        size: Math.random() * 2.2 + 0.8,
        speed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth interpolation towards cursor
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      // Base auto-spin
      const currentRotY = rotY + time * 0.25;
      const currentRotX = rotX + Math.sin(time * 0.5) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Center visual right-aligned on desktop (70% width), centered on mobile
      const isMobile = width < 768;
      const centerX = isMobile ? width * 0.5 : width * 0.70;
      const centerY = isMobile ? height * 0.42 : height * 0.5;
      const focalLength = 560;

      // 3D Point Projection Helper
      const project = (x: number, y: number, z: number) => {
        // Rotate Y
        const cosY = Math.cos(currentRotY);
        const sinY = Math.sin(currentRotY);
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // Rotate X
        const cosX = Math.cos(currentRotX);
        const sinX = Math.sin(currentRotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const scale = focalLength / (focalLength + z2 + 350);
        return {
          x: centerX + x1 * scale,
          y: centerY + y2 * scale,
          scale,
          z: z2,
        };
      };

      // 1. Ambient Particle Cloud
      particles.forEach((p) => {
        // Slowly orbit in 3D
        const cos = Math.cos(p.speed);
        const sin = Math.sin(p.speed);
        const px = p.x * cos - p.z * sin;
        const pz = p.x * sin + p.z * cos;
        p.x = px;
        p.z = pz;

        const proj = project(p.x, p.y, p.z);
        if (proj.scale > 0) {
          const depthAlpha = Math.max(0.1, Math.min(1, proj.scale * 1.3));
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, p.size * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(163, 230, 53, ${p.alpha * depthAlpha * 0.8})`;
          ctx.fill();
        }
      });

      // 2. Futuristic Gimbal Rings (Robotic Arm Armature Lattice)
      const rings = [
        { radius: isMobile ? 120 : 185, segments: 48, tiltX: 0.4, tiltZ: 0.2, speed: 1.0, color: "rgba(163, 230, 53, " },
        { radius: isMobile ? 95 : 145, segments: 36, tiltX: -0.6, tiltZ: 0.8, speed: -1.3, color: "rgba(255, 255, 255, " },
        { radius: isMobile ? 70 : 105, segments: 32, tiltX: 0.9, tiltZ: -0.4, speed: 1.6, color: "rgba(190, 242, 100, " },
      ];

      rings.forEach((ring, ringIdx) => {
        const ringTime = time * ring.speed * 0.4;
        const pts: { x: number; y: number; scale: number; z: number }[] = [];

        for (let i = 0; i <= ring.segments; i++) {
          const angle = (i / ring.segments) * Math.PI * 2;
          // Apply initial tilt
          const baseCos = Math.cos(angle) * ring.radius;
          const baseSin = Math.sin(angle) * ring.radius;

          const rx = baseCos;
          const ry = baseSin * Math.cos(ring.tiltX) - Math.sin(ringTime) * 12;
          const rz = baseSin * Math.sin(ring.tiltZ) + Math.cos(ringTime) * 12;

          pts.push(project(rx, ry, rz));
        }

        // Render Ring Path with depth gradient
        for (let i = 0; i < pts.length - 1; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];

          const avgZ = (p1.z + p2.z) / 2;
          const alpha = Math.max(0.12, Math.min(0.9, (avgZ + 200) / 400));

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `${ring.color}${alpha})`;
          ctx.lineWidth = (ringIdx === 0 ? 1.8 : 1.2) * ((p1.scale + p2.scale) / 2);
          ctx.stroke();

          // Render caliper joints & status marks on the outermost robotic ring
          if (ringIdx === 0 && i % 12 === 0) {
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, 4.5 * p1.scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(163, 230, 53, ${Math.min(1, alpha + 0.3)})`;
            ctx.fill();

            // Caliper bracket crosshair
            ctx.beginPath();
            ctx.moveTo(p1.x - 7 * p1.scale, p1.y);
            ctx.lineTo(p1.x + 7 * p1.scale, p1.y);
            ctx.moveTo(p1.x, p1.y - 7 * p1.scale);
            ctx.lineTo(p1.x, p1.y + 7 * p1.scale);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      // 3. Central AI Quantum Core
      const coreProj = project(0, 0, 0);
      const coreRadius = (isMobile ? 32 : 46) * coreProj.scale;

      // Outer radial aura
      const radialGlow = ctx.createRadialGradient(
        coreProj.x,
        coreProj.y,
        coreRadius * 0.1,
        coreProj.x,
        coreProj.y,
        coreRadius * 3.2
      );
      radialGlow.addColorStop(0, "rgba(163, 230, 53, 0.45)");
      radialGlow.addColorStop(0.4, "rgba(163, 230, 53, 0.15)");
      radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(coreProj.x, coreProj.y, coreRadius * 3.2, 0, Math.PI * 2);
      ctx.fillStyle = radialGlow;
      ctx.fill();

      // Solid pulsing core
      const coreGradient = ctx.createRadialGradient(
        coreProj.x - coreRadius * 0.25,
        coreProj.y - coreRadius * 0.25,
        coreRadius * 0.1,
        coreProj.x,
        coreProj.y,
        coreRadius
      );
      coreGradient.addColorStop(0, "#ffffff");
      coreGradient.addColorStop(0.3, "#bef264");
      coreGradient.addColorStop(0.8, "#a3e635");
      coreGradient.addColorStop(1, "#365314");

      ctx.beginPath();
      ctx.arc(coreProj.x, coreProj.y, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.shadowColor = "#a3e635";
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 4. Robotic Coordinates Telemetry HUD (Subtle surrounding markings)
      if (!isMobile) {
        ctx.font = "10px monospace";
        ctx.fillStyle = "rgba(163, 230, 53, 0.55)";
        ctx.fillText(
          `[AXIS: ${(currentRotX * (180 / Math.PI)).toFixed(1)}° / ${(currentRotY * (180 / Math.PI)).toFixed(1)}°]`,
          centerX - 100,
          centerY + (isMobile ? 140 : 210)
        );
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.fillText("AI CORE // AUTONOMOUS LAB ROBOTICS", centerX - 100, centerY + (isMobile ? 155 : 225));
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const { scrollY } = useScroll();
  const scrollPromptOpacity = useTransform(scrollY, [0, 60], [0.6, 0]);

  return (
    <section className="sticky top-0 z-0 h-screen w-full max-w-full overflow-hidden bg-black">
      {/* Background / Right-Aligned 3D Visual Container */}
      <div className="fixed inset-0 z-0 h-full w-full pointer-events-none">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          style={{ objectPosition: "70% center" }}
        />

        {/* Subtle bottom-to-top black gradient overlay on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:hidden pointer-events-none" />

        {/* Subtle horizontal gradient overlay on desktop for crisp contrast */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Foreground Typography Container */}
      <div className="relative z-10 flex h-screen flex-col justify-end overflow-hidden px-5 pb-16 sm:px-8 md:justify-center md:px-10 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3, ease: "easeOut" }}
          className="relative z-10 max-w-2xl will-change-transform"
        >
          {/* Badge Above Heading */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 font-mono text-xs uppercase tracking-widest mb-5">
            <span className="size-1.5 rounded-full bg-lime-400 animate-pulse" />
            <span>B2B STEM &amp; AI INFRASTRUCTURE FOR SCHOOLS</span>
          </div>

          {/* Main H1 Heading */}
          <h1 className="select-none text-white font-bold font-sans tracking-tight leading-[1.08] text-4xl sm:text-6xl lg:text-[64px] mb-6">
            Future-Proofing Schools with <span className="text-lime-400">AI &amp; Robotics</span>.
          </h1>

          {/* Subtitle Paragraph */}
          <p className="font-sans leading-relaxed tracking-wide text-white/80 text-lg sm:text-xl mb-9 max-w-xl">
            We partner with progressive K-12 institutions to deploy turnkey Robotics labs,
            hands-on Artificial Intelligence curricula, and real-world Data Science
            programs—taught directly on your campus by industry engineers.
          </p>

          {/* Hero Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-lime-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-lime-300 transition-all duration-300 shadow-[0_0_25px_rgba(163,230,53,0.35)] hover:shadow-[0_0_35px_rgba(163,230,53,0.55)] hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              <span>Book a Free Campus Demo</span>
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#programs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/5 text-white/90 font-mono font-semibold text-xs uppercase tracking-wider hover:bg-white/10 hover:border-lime-400/40 transition-all duration-300 text-center"
            >
              <FileText className="size-3.5 text-lime-400" />
              <span>Explore Curricula</span>
            </a>
          </div>
        </motion.div>

        {/* Minimalist Scroll-Down Prompt */}
        <motion.div
          style={{ opacity: scrollPromptOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0, duration: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/60">
              SCROLL TO EXPLORE
            </span>
            <div className="w-4 h-7 rounded-full border border-white/25 flex items-start justify-center p-1">
              <span className="size-1 rounded-full bg-lime-400 animate-bounce" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
