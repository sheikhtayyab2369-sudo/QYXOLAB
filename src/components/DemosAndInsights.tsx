"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, FileText, BookOpen, X, ArrowUpRight } from "lucide-react";

interface InsightCard {
  id: string;
  badge: "Video Demo" | "Case Study" | "Whitepaper";
  title: string;
  excerpt: string;
  cta: string;
  icon: typeof Play;
  videoUrl?: string;
  readTime?: string;
}

const INSIGHTS: InsightCard[] = [
  {
    id: "sign-language-ai",
    badge: "Video Demo",
    title: "Inside a Grade 8 AI Classroom: Building a Live Sign-Language Translator",
    excerpt:
      "Watch how 8th-grade students trained a computer vision model using Python and OpenCV in just 4 classroom sessions to translate hand gestures in real time.",
    cta: "Watch Video →",
    icon: Play,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    readTime: "4 MIN VIDEO",
  },
  {
    id: "admissions-case-study",
    badge: "Case Study",
    title: "How Partner Schools Increased STEM Admissions & Parent Engagement by 40%",
    excerpt:
      "A breakdown of how launching an on-campus Robotics & Data Science Innovation Lab transforms a school's academic reputation in its city.",
    cta: "Read Case Study →",
    icon: FileText,
    readTime: "6 MIN READ",
  },
  {
    id: "autonomous-rovers",
    badge: "Video Demo",
    title: "Autonomous Line-Following & Obstacle-Avoidance Rovers Built by 6th Graders",
    excerpt:
      "From wiring ultrasonic sensors to debugging C++ PID control loops—see our hands-on hardware methodology in action.",
    cta: "Watch Video →",
    icon: Play,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    readTime: "3 MIN VIDEO",
  },
  {
    id: "stem-integration-blueprint",
    badge: "Whitepaper",
    title: "Integrating AI & Data Science into K-12 Without Overloading Your Timetable",
    excerpt:
      "Our blueprint for principals and academic coordinators on slotting 1-hour weekly practical STEM labs into existing computer periods.",
    cta: "Read Article →",
    icon: BookOpen,
    readTime: "8 MIN READ",
  },
];

export default function DemosAndInsights() {
  const [activeModal, setActiveModal] = useState<InsightCard | null>(null);

  return (
    <section
      id="insights"
      className="relative z-10 bg-black text-white py-24 px-5 sm:px-8 md:px-10 border-t border-white/10 scroll-mt-12"
    >
      <span id="case-studies" className="sr-only" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-widest text-lime-400 mb-3">
            {"// CLASSROOM DEMOS & INSIGHTS"}
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Labs in Action &amp; Case Studies
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mb-12">
            Watch how our engineers teach complex AI and Robotics concepts in real school
            classrooms and read our implementation guides for Principals.
          </p>
        </div>

        {/* Content Cards Grid (4 Cards mixing Articles & Video Demos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {INSIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-white/10 bg-zinc-950/40 p-6 sm:p-8 flex flex-col justify-between hover:border-white/30 transition-all group relative overflow-hidden"
              >
                {/* Ambient Top Glow on Hover */}
                <div className="absolute -right-20 -top-20 size-40 rounded-full bg-lime-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Badge & Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase px-2.5 py-1 bg-lime-400/10 text-lime-400 w-fit">
                      {item.badge}
                    </span>
                    <div className="flex items-center gap-2 text-white/40 font-mono text-xs">
                      <Icon className="size-3.5 text-lime-400" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-lime-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                    {item.excerpt}
                  </p>
                </div>

                {/* Bottom CTA Row */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveModal(item)}
                    className="font-bold text-sm text-white underline underline-offset-4 decoration-lime-400 group-hover:text-lime-400 cursor-pointer transition-colors inline-flex items-center gap-1.5"
                  >
                    {item.cta}
                  </button>

                  <a
                    href="#contact"
                    className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 group-hover:border-lime-400/40 group-hover:bg-lime-400/10 group-hover:text-lime-400 transition-all"
                    aria-label="Inquire about this program"
                  >
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal for Video/Case Study Previews */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl border border-white/20 bg-zinc-950 p-6 sm:p-8 rounded-xl shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>

              <div className="mb-4">
                <span className="text-xs font-mono uppercase px-2.5 py-1 bg-lime-400/10 text-lime-400">
                  {activeModal.badge}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {activeModal.title}
              </h3>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                {activeModal.excerpt}
              </p>

              {activeModal.badge === "Video Demo" ? (
                <div className="relative aspect-video w-full rounded-lg bg-zinc-900 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                  <div className="size-16 rounded-full bg-lime-400/20 border border-lime-400 flex items-center justify-center text-lime-400 mb-4 animate-pulse">
                    <Play className="size-8 fill-lime-400 ml-1" />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-lime-400 mb-2">
                    [ LIVE CLASSROOM RECORDING READY ]
                  </p>
                  <p className="text-white/60 text-xs max-w-md">
                    Schedule a 15-minute feasibility call to receive uncut classroom footage
                    and student code repositories.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg bg-zinc-900/60 border border-white/10 p-5 space-y-3">
                  <div className="font-mono text-xs uppercase tracking-wider text-lime-400">
                    [ EXECUTIVE BRIEFING SUMMARY ]
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    This comprehensive PDF dossier details timetable allocation strategies,
                    NEP/CBSE/ICSE compliance alignments, and admissions ROI benchmarks for
                    forward-thinking schools.
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setActiveModal(null)}
                  className="bg-lime-400 text-black font-bold px-5 py-2.5 text-sm uppercase tracking-wider hover:bg-lime-300 transition text-center"
                >
                  Request Full Access &amp; Lab Tour
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
