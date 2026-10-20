"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cpu,
  Server,
  Bot,
  Brain,
  Scan,
  Binary,
  FileCode,
  Sparkles,
  Box,
  Blocks,
  GitBranch,
} from "lucide-react";

interface TechItem {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Code2;
  category: "Hardware & IoT" | "Languages & AI" | "Robotics & Data";
}

const CATEGORIES = [
  "All",
  "Hardware & IoT",
  "Languages & AI",
  "Robotics & Data",
] as const;

const TECH_STACK: TechItem[] = [
  {
    id: "python",
    title: "Python",
    subtitle: "Core AI Scripting, Automation & Algorithmic Logic",
    icon: Code2,
    category: "Languages & AI",
  },
  {
    id: "arduino-esp32",
    title: "Arduino & ESP32",
    subtitle: "Microcontroller Interfacing, Sensors & IoT Systems",
    icon: Cpu,
    category: "Hardware & IoT",
  },
  {
    id: "raspberry-pi-5",
    title: "Raspberry Pi 5",
    subtitle: "Edge Computing, Linux Robotics & Vision Processing",
    icon: Server,
    category: "Hardware & IoT",
  },
  {
    id: "ros2",
    title: "ROS2 (Robot Operating System)",
    subtitle: "Autonomous Navigation & Kinematics",
    icon: Bot,
    category: "Robotics & Data",
  },
  {
    id: "pytorch-tensorflow",
    title: "PyTorch & TensorFlow",
    subtitle: "Neural Networks, Deep Learning & Model Training",
    icon: Brain,
    category: "Languages & AI",
  },
  {
    id: "opencv",
    title: "OpenCV",
    subtitle: "Real-Time Computer Vision, Face & Object Tracking",
    icon: Scan,
    category: "Languages & AI",
  },
  {
    id: "pandas-numpy",
    title: "Pandas & NumPy",
    subtitle: "High-Performance Data Manipulation & Statistical Analysis",
    icon: Binary,
    category: "Robotics & Data",
  },
  {
    id: "jupyter",
    title: "Jupyter Notebooks",
    subtitle: "Interactive Data Science Labs & Visual Storytelling",
    icon: FileCode,
    category: "Robotics & Data",
  },
  {
    id: "scikit-learn",
    title: "Scikit-Learn",
    subtitle: "Predictive Modeling, Classification & Regression",
    icon: Sparkles,
    category: "Languages & AI",
  },
  {
    id: "cad-3d-printing",
    title: "3D CAD & Printing",
    subtitle: "Custom Mechanical Chassis & Rapid Prototyping",
    icon: Box,
    category: "Hardware & IoT",
  },
  {
    id: "scratch-blockly",
    title: "Scratch & Blockly",
    subtitle: "Visual Algorithmic Thinking for Junior Grades (Grades 3–5)",
    icon: Blocks,
    category: "Robotics & Data",
  },
  {
    id: "git-github",
    title: "Git & GitHub",
    subtitle: "Student Code Portfolios & Collaborative Version Control",
    icon: GitBranch,
    category: "Robotics & Data",
  },
];

const MARQUEE_ITEMS = [
  "PYTHON 3.12",
  "ROS2 JAZZY",
  "ARDUINO IDE",
  "ESP32-S3",
  "OPENCV 4.x",
  "TENSORFLOW LITE",
  "PYTORCH",
  "JUPYTERLAB",
  "PANDAS",
  "NUMPY",
  "RASPBERRY PI 5",
  "AUTODESK FUSION",
  "SCIKIT-LEARN",
  "MQTT TELEMETRY",
  "LINUX ROBOTICS",
  "GITHUB CLASSROOM",
];

export default function SkillsAndTools() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredTech =
    selectedCategory === "All"
      ? TECH_STACK
      : TECH_STACK.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="stack"
      className="relative z-20 w-full max-w-full overflow-x-clip bg-black text-white py-24 px-5 sm:px-8 md:px-10 border-t border-white/10 scroll-mt-12"
    >
      <span id="tech-stack" className="sr-only" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-widest text-lime-400 mb-3">
            {"// HARDWARE & SOFTWARE ECOSYSTEM"}
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Hardware Kits &amp; Tech Stack
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mb-12">
            Industry-standard hardware platforms, programming languages, and AI frameworks
            your students master inside our labs.
          </p>

          {/* Smooth Infinite Marquee Ticker */}
          <div className="relative overflow-hidden border-y border-white/10 py-3.5 mb-12 bg-zinc-950/40 rounded-xl">
            {/* Left and Right Gradient Fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

            <div className="flex select-none">
              <motion.div
                className="flex items-center gap-8 shrink-0 pr-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 24,
                }}
              >
                {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 shrink-0">
                    <span className="size-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/80">
                      {item}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-lime-400 text-black font-bold shadow-[0_0_20px_rgba(163,230,53,0.35)]"
                      : "bg-white/[0.04] text-white/70 border border-white/10 hover:border-lime-400/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categorized Interactive Grid (12 Cards) */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredTech.map((tech) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-zinc-950/60 hover:border-lime-400/50 hover:bg-zinc-950/90 transition-all duration-300 group relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                >
                  {/* Subtle top-right ambient hover glow */}
                  <div className="absolute -right-8 -top-8 size-24 rounded-full bg-lime-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Minimalist Icon Badge */}
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lime-400 group-hover:border-lime-400/50 group-hover:bg-lime-400/10 transition-colors shadow-inner">
                    <Icon className="size-5 text-lime-400" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-white text-base group-hover:text-lime-400 transition-colors truncate">
                        {tech.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                      {tech.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
