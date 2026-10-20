"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Users,
  GraduationCap,
  Layers,
  Check,
  ArrowUpRight,
  Sparkles,
  Cpu,
  Award,
  BookOpen,
  Box,
} from "lucide-react";

interface ProgramDetail {
  id: string;
  shortName: string;
  tag: string;
  title: string;
  duration: string;
  durationDetail: string;
  ageBand: string;
  ageBandDetail: string;
  level: string;
  format: string;
  description: string;
  outcomes: string[];
  curriculum: { phase: string; title: string; desc: string }[];
  tools: string[];
  quickFacts: { label: string; value: string }[];
  isFlagship?: boolean;
}

const PROGRAMS_DATA: ProgramDetail[] = [
  {
    id: "robotics-mechatronics",
    shortName: "Robotics & AI",
    tag: "FLAGSHIP MODULE // 01",
    title: "Autonomous Robotics & AI Lab",
    duration: "12 weeks",
    durationDetail: "12 weeks · 2h/week",
    ageBand: "Grades 4–12",
    ageBandDetail: "Grades 4–12 (Ages 9–17)",
    level: "Beginner to Advanced",
    format: "In-person · On-Campus Lab",
    description:
      "A hands-on journey into robotics where students build with real components — sensors, motors, microcontrollers, LEDs, and wires. Students start coding in block-based interfaces for instant feedback, then graduate to Arduino IDE (C++) as their confidence grows. Along the way they engineer real-world projects like intruder alarms, obstacle-avoiding rovers, robotic arms, and line-following robots in an on-campus innovation studio built for curious young makers.",
    outcomes: [
      "Wire and test real working circuits & microcontrollers",
      "Program autonomous rovers in both mBlock and Arduino IDE (C++)",
      "Explore robotics tools, motor drivers & sensor arrays",
      "Read the physical environment using ultrasonic, IR & light sensors",
    ],
    curriculum: [
      {
        phase: "Step 01",
        title: "Introduction to Robotics & Microcontrollers",
        desc: "Introduction to Sensors, Micro Controllers (Arduino & ESP32) & Circuit Simulation.",
      },
      {
        phase: "Step 02",
        title: "First Circuits (Simple & Controllable)",
        desc: "LEDs, resistors, logic gates, and buttons on a breadboard (Physical & Circuit Simulations).",
      },
      {
        phase: "Step 03",
        title: "Motion Dynamics & Motors",
        desc: "Spin wheels, drive the robot, steer with differential power & PWM speed control.",
      },
      {
        phase: "Step 04",
        title: "Sensing the World",
        desc: "Ultrasonic distance calculation, IR line sensors, and ambient light tracking.",
      },
      {
        phase: "Step 05",
        title: "mBlock & Algorithmic Logic",
        desc: "Block-based code — make it blink, move, react, and execute logic conditionals.",
      },
      {
        phase: "Step 06",
        title: "Mini Project: Autonomous Obstacle Avoider",
        desc: "Combine sensors and dual motors into an autonomous self-driving rover.",
      },
      {
        phase: "Step 07",
        title: "Into Arduino IDE & Embedded C++",
        desc: "Read and write your first text-based sketches, registers, and serial debugging.",
      },
      {
        phase: "Step 08",
        title: "Smart Systems & Edge Automation",
        desc: "Build an intruder alarm, smart lighting array, and real-time temperature monitor.",
      },
      {
        phase: "Step 09",
        title: "Capstone Autonomous Build",
        desc: "Design, fabricate, wire, and calibrate a custom autonomous robot project.",
      },
      {
        phase: "Step 10",
        title: "Final Exhibition & Evaluation",
        desc: "Demo day — present live obstacle runs to parents, faculty, and technical judges.",
      },
    ],
    tools: [
      "Arduino Uno & ESP32 Kits",
      "mBlock & Visual Coding",
      "Tinkercad & Circuit Simulation",
      "Arduino IDE & Embedded C++",
      "Ultrasonic & IR Sensors",
      "DC Motors & Micro Servos",
      "Breadboards, LEDs & Jumpers",
    ],
    quickFacts: [
      { label: "Age band", value: "Grades 4–12" },
      { label: "Duration", value: "12 weeks · 2h/week" },
      { label: "Level", value: "Beginner to Advanced" },
      { label: "Format", value: "In-person · On-Campus Lab" },
    ],
    isFlagship: true,
  },
  {
    id: "applied-ai-vision",
    shortName: "AI & Computer Vision",
    tag: "AI TRACK // 02",
    title: "AI & Computer Vision",
    duration: "12 weeks",
    durationDetail: "12 weeks · 2h/week",
    ageBand: "Grades 6–12",
    ageBandDetail: "Grades 6–12 (Ages 11–17)",
    level: "Beginner to Intermediate",
    format: "In-person · On-Campus Lab",
    description:
      "A fun and practical introduction to artificial intelligence. Students learn how computers 'see' and 'think' by building face filters, color-tracking cameras, and smart object detectors using simple visual coding and beginner Python.",
    outcomes: [
      "Build real-time face and gesture recognition apps",
      "Teach computers to recognize everyday classroom objects",
      "Create interactive smart cameras with Python & OpenCV",
      "Understand how modern AI models learn and make decisions",
    ],
    curriculum: [
      {
        phase: "Weeks 1–3",
        title: "How Computers See",
        desc: "Exploring digital images, camera feeds, and basic image processing.",
      },
      {
        phase: "Weeks 4–6",
        title: "Face & Color Tracking",
        desc: "Writing code to follow colors, detect movement, and find faces.",
      },
      {
        phase: "Weeks 7–9",
        title: "Smart Object Detection",
        desc: "Training simple AI models to identify and sort real-world objects.",
      },
      {
        phase: "Weeks 10–12",
        title: "Interactive AI Project",
        desc: "Building a working smart-camera project to demonstrate at school.",
      },
    ],
    tools: [
      "Python 3",
      "OpenCV",
      "MediaPipe",
      "Teachable Machine",
      "AI Webcams",
      "Jupyter Notebooks",
    ],
    quickFacts: [
      { label: "Age band", value: "Grades 6–12" },
      { label: "Duration", value: "12 weeks · 2h/week" },
      { label: "Level", value: "Beginner to Intermediate" },
      { label: "Format", value: "In-person · On-Campus Lab" },
    ],
  },
  {
    id: "junior-data-scientist",
    shortName: "Data Science Track",
    tag: "ANALYTICS // 03",
    title: "Junior Data Scientist & Analytics Track",
    duration: "10 weeks",
    durationDetail: "10 weeks · 2h/week",
    ageBand: "Grades 7–12",
    ageBandDetail: "Grades 7–12 (Ages 12–18)",
    level: "Intermediate",
    format: "In-person · Lab Based",
    description:
      "Students learn to collect, clean, visualize, and model real-world datasets—turning raw school, climate, and demographic data into predictive insights. Guided by industry data scientists, students uncover statistical anomalies, build interactive dashboards, and forecast future trends.",
    outcomes: [
      "Clean, filter, and normalize real-world messy datasets",
      "Design publication-quality interactive charts in Python",
      "Train predictive linear and logistic regression models",
      "Deliver data-backed presentations to peers and school leaders",
    ],
    curriculum: [
      {
        phase: "Weeks 1–3",
        title: "Data Exploration & Pandas DataFrames",
        desc: "Importing CSVs, querying subsets, data cleaning, and handling null values.",
      },
      {
        phase: "Weeks 4–6",
        title: "Visual Storytelling with Matplotlib & Seaborn",
        desc: "Histograms, scatter correlation matrices, heatmaps, and dashboard layout.",
      },
      {
        phase: "Weeks 7–8",
        title: "Statistical Modeling & Predictive Scikit-Learn",
        desc: "Training regression models to predict exam scores and energy usage.",
      },
      {
        phase: "Weeks 9–10",
        title: "School Insight Report Capstone & Publishing",
        desc: "Publishing a comprehensive data report with interactive charts.",
      },
    ],
    tools: [
      "Python 3",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-Learn",
      "Jupyter Lab",
      "Google Colab",
    ],
    quickFacts: [
      { label: "Age band", value: "Grades 7–12" },
      { label: "Duration", value: "10 weeks · 2h/week" },
      { label: "Level", value: "Intermediate" },
      { label: "Format", value: "In-person · Lab Based" },
    ],
  },
  {
    id: "turnkey-stem-lab",
    shortName: "Turnkey STEM Lab",
    tag: "INSTITUTIONAL // 04",
    title: "Turnkey School STEM Innovation Lab Setup",
    duration: "Full Academic Year",
    durationDetail: "Annual Partnership · Turnkey",
    ageBand: "K-12 Campus",
    ageBandDetail: "Entire School Community",
    level: "All Levels (Grade 1–12)",
    format: "Dedicated On-Campus Facility",
    description:
      "End-to-end physical lab infrastructure setup inside your school, complete with anti-static workbenches, 30+ industrial-grade robotics kits, safety gear, 3D printing stations, and custom school branding—fully staffed weekly by our industry engineers with zero teacher workload.",
    outcomes: [
      "Complete architectural lab blueprint, branding & workbench installation",
      "Full hardware kit inventory maintained and restocked year-round",
      "Dedicated STEM engineers deployed weekly to conduct 80% practical classes",
      "Zero burden on school teachers with automated grading and curriculum plans",
    ],
    curriculum: [
      {
        phase: "Phase 01",
        title: "Campus Space Survey & Custom Lab Layout Design",
        desc: "Architectural floorplan, electrical planning, safety layout, and custom signage.",
      },
      {
        phase: "Phase 02",
        title: "Turnkey Hardware Delivery & Lab Commissioning",
        desc: "Unboxing workbenches, 30+ robotics kits, 3D printers, and testing stations.",
      },
      {
        phase: "Phase 03",
        title: "Weekly Engineering Classes & Timetable Execution",
        desc: "Our resident engineers conduct hands-on classes across all designated grades.",
      },
      {
        phase: "Phase 04",
        title: "Annual Parent Expo, Hackathons & Admissions Showcase",
        desc: "Celebrating student projects, boosting school admissions appeal and prestige.",
      },
    ],
    tools: [
      "30+ Proprietary Robotics Kits",
      "Creality 3D Printers",
      "Soldering & Assembly Stations",
      "Anti-Static Workbenches",
      "Safety Goggles & Toolsets",
      "Custom Wall Branding",
    ],
    quickFacts: [
      { label: "Age band", value: "Grades 1–12" },
      { label: "Duration", value: "Full Academic Year" },
      { label: "Level", value: "Turnkey Institutional" },
      { label: "Format", value: "On-Campus Facility" },
    ],
  },
];

type TabType = "overview" | "curriculum" | "tools" | "outcomes";

export default function ProgramsShowcase() {
  const [selectedProgramId, setSelectedProgramId] = useState<string>("robotics-mechatronics");
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const currentProgram =
    PROGRAMS_DATA.find((p) => p.id === selectedProgramId) || PROGRAMS_DATA[0];

  return (
    <section
      id="programs"
      className="relative z-20 w-full max-w-full overflow-x-clip bg-black text-white py-24 px-5 sm:px-8 md:px-10 scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-white/10">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-lime-400 mb-3 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-lime-400 animate-pulse" />
              <span>// CURRICULUM &amp; LAB ECOSYSTEM</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Programs Showcase
            </h2>
          </div>
          <p className="text-white/60 text-lg max-w-2xl">
            Explore our grade-wise, hands-on STEM modules designed to seamlessly integrate
            into your school&apos;s academic calendar.
          </p>
        </div>

        {/* Program Selector Pills (Scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {PROGRAMS_DATA.map((prog) => {
            const isSelected = prog.id === currentProgram.id;
            return (
              <button
                key={prog.id}
                onClick={() => {
                  setSelectedProgramId(prog.id);
                  setActiveTab("overview");
                }}
                className={`px-4 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider shrink-0 transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? "bg-lime-400 text-black font-bold border-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.35)] scale-[1.02]"
                    : "bg-zinc-950/60 text-white/70 border-white/15 hover:border-white/30 hover:text-white"
                }`}
              >
                {prog.shortName}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            FEATURED OUTLINE SHOWCASE (Exact Outlines Extracted from Reference Picture)
            ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProgram.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full"
          >
            {/* 1. TOP METADATA OUTLINE PILLS (4 Box Grid) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
              {/* Box 1: Duration */}
              <div className="rounded-2xl border border-white/15 bg-zinc-950/60 p-4 sm:p-5 flex items-center gap-3.5 hover:border-lime-400/40 transition-colors">
                <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lime-400 shrink-0">
                  <Clock className="size-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    DURATION
                  </div>
                  <div className="font-bold text-white text-sm sm:text-base mt-0.5">
                    {currentProgram.durationDetail}
                  </div>
                </div>
              </div>

              {/* Box 2: Age Band */}
              <div className="rounded-2xl border border-white/15 bg-zinc-950/60 p-4 sm:p-5 flex items-center gap-3.5 hover:border-lime-400/40 transition-colors">
                <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lime-400 shrink-0">
                  <Users className="size-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    AGE BAND
                  </div>
                  <div className="font-bold text-white text-sm sm:text-base mt-0.5">
                    {currentProgram.ageBand}
                  </div>
                </div>
              </div>

              {/* Box 3: Level */}
              <div className="rounded-2xl border border-white/15 bg-zinc-950/60 p-4 sm:p-5 flex items-center gap-3.5 hover:border-lime-400/40 transition-colors">
                <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lime-400 shrink-0">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    LEVEL
                  </div>
                  <div className="font-bold text-white text-sm sm:text-base mt-0.5">
                    {currentProgram.level}
                  </div>
                </div>
              </div>

              {/* Box 4: Format */}
              <div className="rounded-2xl border border-white/15 bg-zinc-950/60 p-4 sm:p-5 flex items-center gap-3.5 hover:border-lime-400/40 transition-colors">
                <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lime-400 shrink-0">
                  <Layers className="size-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    FORMAT
                  </div>
                  <div className="font-bold text-white text-sm sm:text-base mt-0.5">
                    {currentProgram.format}
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Line Divider */}
            <div className="w-full h-px bg-white/10 mb-10" />

            {/* 2. MAIN SPLIT CONTENT AREA (Left: Tabs & Detail // Right: School Callout Card) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* LEFT COLUMN (7 cols): Tabs, Paragraph, and 2x2 Outcome Outline Cards */}
              <div className="lg:col-span-7 flex flex-col">
                {/* Outline Tab Pill Bar */}
                <div className="inline-flex items-center gap-1.5 p-1 rounded-full border border-white/15 bg-zinc-950/80 mb-8 self-start">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      activeTab === "overview"
                        ? "bg-white text-black font-bold shadow-md"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("curriculum")}
                    className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      activeTab === "curriculum"
                        ? "bg-white text-black font-bold shadow-md"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Curriculum
                  </button>
                  <button
                    onClick={() => setActiveTab("tools")}
                    className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      activeTab === "tools"
                        ? "bg-white text-black font-bold shadow-md"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Tools
                  </button>
                  <button
                    onClick={() => setActiveTab("outcomes")}
                    className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      activeTab === "outcomes"
                        ? "bg-white text-black font-bold shadow-md"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Outcomes
                  </button>
                </div>

                {/* Tab Content Display */}
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Program Headline */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-xs text-lime-400 font-semibold tracking-wider">
                        {currentProgram.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
                      {currentProgram.title}
                    </h3>

                    {/* Detailed Paragraph (Matching depth of reference image) */}
                    <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-10 font-normal">
                      {currentProgram.description}
                    </p>

                    {/* 4 OUTLINE OUTCOME CARDS (2x2 Grid with Green Checkmarks) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentProgram.outcomes.map((outcome, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-white/15 bg-zinc-950/40 p-5 flex items-start gap-3.5 hover:border-lime-400/50 hover:bg-zinc-950/80 transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
                        >
                          <div className="size-6 rounded-full bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 shrink-0 mt-0.5">
                            <Check className="size-3.5 stroke-[2.5]" />
                          </div>
                          <span className="text-white/90 text-sm font-medium leading-snug">
                            {outcome}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "curriculum" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        Syllabus &amp; Milestones
                      </h3>
                      <span className="font-mono text-xs px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 font-semibold">
                        {currentProgram.curriculum.length} Modules · Road Map
                      </span>
                    </div>

                    {/* Vertical Timeline matching reference screenshot */}
                    <div className="relative pl-6 sm:pl-8 space-y-4">
                      {/* Vertical Connecting Line */}
                      <div className="absolute left-[18px] sm:left-[22px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-lime-400 via-lime-400/50 to-white/10" />

                      {currentProgram.curriculum.map((curr, idx) => (
                        <div
                          key={idx}
                          className="relative flex items-center gap-4 sm:gap-5 group"
                        >
                          {/* Numbered Circular Badge */}
                          <div className="size-9 sm:size-11 rounded-full bg-lime-400 text-black font-mono font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 border-2 border-black shadow-[0_0_12px_rgba(163,230,53,0.4)] z-10 transition-transform group-hover:scale-110">
                            {idx + 1}
                          </div>

                          {/* Outline Card matching reference screenshot */}
                          <div className="flex-1 rounded-2xl border border-white/15 bg-zinc-950/60 p-4 sm:p-5 hover:border-lime-400/50 hover:bg-zinc-950/90 transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                            <h4 className="text-base sm:text-lg font-bold text-white mb-1 tracking-tight group-hover:text-lime-400 transition-colors">
                              {curr.title}
                            </h4>
                            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                              {curr.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "tools" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      {currentProgram.tools.map((tool, idx) => (
                        <div
                          key={idx}
                          className="group rounded-2xl border border-white/15 bg-zinc-950/60 p-4 sm:p-5 flex items-center gap-4 hover:border-lime-400/50 hover:bg-zinc-950/90 transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
                        >
                          {/* 3D Box Icon matching reference screenshot */}
                          <div className="size-11 sm:size-12 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 shrink-0 group-hover:scale-105 group-hover:border-lime-400/60 transition-all">
                            <Box className="size-5 sm:size-6 text-lime-400" />
                          </div>

                          {/* Tool Name */}
                          <span className="text-white/95 font-semibold text-sm sm:text-base tracking-tight group-hover:text-lime-400 transition-colors">
                            {tool}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "outcomes" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Verified Student Deliverables
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentProgram.outcomes.map((outcome, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-white/15 bg-zinc-950/40 p-5 flex items-start gap-3.5 hover:border-lime-400/40 transition-colors"
                        >
                          <Award className="size-5 text-lime-400 shrink-0 mt-0.5" />
                          <span className="text-white/90 text-sm font-medium leading-relaxed">
                            {outcome}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* RIGHT COLUMN (5 cols): "Bring it to your school" Card with Outline & Dashed Facts */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/15 bg-zinc-950/70 p-7 sm:p-8 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
                  {/* Subtle Top-Right Ambient Glow */}
                  <div className="absolute -right-20 -top-20 size-48 rounded-full bg-lime-400/10 blur-3xl pointer-events-none" />

                  <div>
                    {/* Card Title */}
                    <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                      Bring it to your school
                    </h4>

                    {/* Card Subtitle */}
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      We&apos;ll tailor timing, cohort size, and format for your campus.
                    </p>

                    {/* Primary CTA Button */}
                    <a
                      href="#contact"
                      className="w-full py-4 px-6 rounded-2xl bg-lime-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all text-center flex items-center justify-center gap-2 mb-8 cursor-pointer"
                    >
                      <span>Request Enrollment</span>
                      <ArrowUpRight className="size-4" />
                    </a>

                    {/* Checkmark List */}
                    <div className="space-y-3.5 mb-8">
                      <div className="flex items-center gap-3 text-sm text-white/80">
                        <Check className="size-4 text-lime-400 shrink-0" />
                        <span>24-hour response from partnerships</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-white/80">
                        <Check className="size-4 text-lime-400 shrink-0" />
                        <span>Certified, background-checked mentors</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-white/80">
                        <Check className="size-4 text-lime-400 shrink-0" />
                        <span>Parent update dashboard included</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-white/80">
                        <Check className="size-4 text-lime-400 shrink-0" />
                        <span>Kit shipping &amp; setup handled</span>
                      </div>
                    </div>

                    {/* Dashed Outline Box: Quick facts */}
                    <div className="rounded-2xl border border-dashed border-white/20 p-5 bg-white/[0.02]">
                      <div className="font-mono text-xs uppercase tracking-wider text-lime-400 font-semibold mb-3.5 flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-lime-400 animate-pulse" />
                        <span>Quick facts</span>
                      </div>

                      <div className="space-y-2.5 font-mono text-xs">
                        {currentProgram.quickFacts.map((fact, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-4 text-white/70"
                          >
                            <span className="text-white/40">{fact.label}</span>
                            <span className="text-white font-medium text-right">
                              {fact.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
