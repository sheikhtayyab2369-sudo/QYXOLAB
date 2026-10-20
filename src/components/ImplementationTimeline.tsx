"use client";

import { motion } from "framer-motion";
import { Sparkles, Hammer, Rocket, ArrowRight } from "lucide-react";

interface Pillar {
  step: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  icon: typeof Sparkles;
  highlight?: boolean;
}

const PILLARS: Pillar[] = [
  {
    step: "01",
    tag: "IDEATION & CONCEPTS",
    title: "Imagine",
    subtitle: "Curiosity & Foundational Logic",
    description:
      "Students discover foundational AI, computational thinking, and machine learning logic through interactive curricula integrated directly into your school timetable.",
    points: [
      "Aligned with CBSE, ICSE & International Boards",
      "Zero preparation burden on existing faculty",
      "Interactive coding & simulation environments",
    ],
    icon: Sparkles,
  },
  {
    step: "02",
    tag: "TURNKEY HARDWARE LAB",
    title: "Build",
    subtitle: "Hands-On Robotics & IoT",
    description:
      "We deploy physical hardware kits, sensors, microcontrollers, and edge AI workstations to your campus—led weekly by our dedicated STEM engineers.",
    points: [
      "Custom branded robotics lab on your campus",
      "80% practical fabrication & 20% theory",
      "Dedicated industry engineers teaching on site",
    ],
    icon: Hammer,
    highlight: true,
  },
  {
    step: "03",
    tag: "REAL-WORLD IMPACT",
    title: "Innovate",
    subtitle: "Capstones & Prestigious Credentials",
    description:
      "Students build autonomous robots, compete in national Olympiads, and present live working capstones to parents—earning verifiable STEM credentials.",
    points: [
      "Bi-annual campus Parent Demo Day exhibitions",
      "National Olympiad & hackathon mentorship",
      "Verifiable STEM.org aligned student certifications",
    ],
    icon: Rocket,
  },
];

export default function ImplementationTimeline() {
  return (
    <section
      id="roadmap"
      className="relative z-20 w-full max-w-full overflow-x-clip bg-black text-white py-24 px-5 sm:px-8 md:px-10 border-t border-white/10 scroll-mt-12"
    >
      <span id="timeline" className="sr-only" />
      <span id="implementation" className="sr-only" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="font-mono text-xs uppercase tracking-widest text-lime-400 mb-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-lime-400 animate-pulse" />
            <span>// OUR METHODOLOGY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5">
            Imagine. Build. <span className="text-lime-400">Innovate.</span>
          </h2>
          <p className="text-white/60 text-lg sm:text-xl leading-relaxed">
            A simple, battle-tested 3-stage framework that transforms students
            from passive technology consumers into world-class creators and builders.
          </p>
        </div>

        {/* 3-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className={`relative group rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 border ${
                  pillar.highlight
                    ? "bg-zinc-950/80 border-lime-400/40 shadow-[0_0_30px_rgba(163,230,53,0.08)] hover:border-lime-400/70 hover:shadow-[0_0_40px_rgba(163,230,53,0.15)]"
                    : "bg-zinc-950/50 border-white/10 hover:border-white/30 hover:bg-zinc-950/80 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                }`}
              >
                <div>
                  {/* Top Bar: Step number & Tag */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white/30 group-hover:text-lime-400 transition-colors">
                      {pillar.step}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-lime-400/90 px-2.5 py-1 rounded-full bg-lime-400/10 border border-lime-400/20">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lime-400 group-hover:scale-110 transition-transform">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="font-mono text-xs text-white/50 mb-4">
                    {pillar.subtitle}
                  </p>

                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Key Takeaways / Points */}
                <div className="pt-6 border-t border-white/10 space-y-2.5">
                  {pillar.points.map((point) => (
                    <div key={point} className="flex items-start gap-2.5 text-xs text-white/75">
                      <span className="size-1.5 rounded-full bg-lime-400 shrink-0 mt-1.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout: Turnkey Promise */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 shrink-0">
              <span className="font-mono font-bold text-sm">100%</span>
            </div>
            <div>
              <div className="font-bold text-white text-base sm:text-lg">
                Zero Faculty Burden Turnkey Guarantee
              </div>
              <div className="text-white/50 text-xs sm:text-sm">
                We supply the trainers, hardware, lesson plans, software licenses, and support.
              </div>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-lime-400 hover:text-black font-mono font-semibold text-xs uppercase tracking-wider text-white transition-all duration-300 shrink-0"
          >
            <span>Request School Proposal</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
