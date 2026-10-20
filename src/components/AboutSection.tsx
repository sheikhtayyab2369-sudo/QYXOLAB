"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

interface WordItem {
  text: string;
  isHighlight: boolean;
}

const WORDS: WordItem[] = [
  { text: "Traditional", isHighlight: false },
  { text: "textbooks", isHighlight: false },
  { text: "cannot", isHighlight: false },
  { text: "prepare", isHighlight: false },
  { text: "students", isHighlight: false },
  { text: "for", isHighlight: false },
  { text: "an", isHighlight: false },
  { text: "automated", isHighlight: false },
  { text: "world.", isHighlight: false },
  { text: "We", isHighlight: false },
  { text: "transform", isHighlight: false },
  { text: "K-12", isHighlight: false },
  { text: "schools", isHighlight: false },
  { text: "into", isHighlight: false },
  { text: "Innovation", isHighlight: true },
  { text: "Hubs", isHighlight: true },
  { text: "by", isHighlight: false },
  { text: "bringing", isHighlight: false },
  { text: "industrial-grade", isHighlight: false },
  { text: "Robotics,", isHighlight: true },
  { text: "Artificial", isHighlight: true },
  { text: "Intelligence,", isHighlight: true },
  { text: "and", isHighlight: false },
  { text: "Data", isHighlight: true },
  { text: "Science", isHighlight: true },
  { text: "directly", isHighlight: false },
  { text: "into", isHighlight: false },
  { text: "your", isHighlight: false },
  { text: "classrooms.", isHighlight: false },
  { text: "Built", isHighlight: false },
  { text: "to", isHighlight: false },
  { text: "pioneer", isHighlight: true },
  { text: "next-generation", isHighlight: true },
  { text: "STEM", isHighlight: true },
  { text: "education,", isHighlight: true },
  { text: "we", isHighlight: false },
  { text: "provide", isHighlight: false },
  { text: "the", isHighlight: false },
  { text: "complete", isHighlight: false },
  { text: "ecosystem—", isHighlight: false },
  { text: "custom", isHighlight: true },
  { text: "hardware", isHighlight: true },
  { text: "kits,", isHighlight: true },
  { text: "certified", isHighlight: true },
  { text: "instructors,", isHighlight: true },
  { text: "and", isHighlight: false },
  { text: "project-based", isHighlight: true },
  { text: "curricula", isHighlight: true },
  { text: "—empowering", isHighlight: false },
  { text: "your", isHighlight: false },
  { text: "students", isHighlight: false },
  { text: "to", isHighlight: false },
  { text: "build", isHighlight: false },
  { text: "autonomous", isHighlight: false },
  { text: "machines,", isHighlight: false },
  { text: "train", isHighlight: false },
  { text: "neural", isHighlight: false },
  { text: "networks,", isHighlight: false },
  { text: "and", isHighlight: false },
  { text: "lead", isHighlight: false },
  { text: "the", isHighlight: false },
  { text: "future.", isHighlight: false },
];

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlight: boolean;
}

function Word({ word, progress, range, isHighlight }: WordProps) {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mx-1.5 my-1 inline-block">
      {/* Base layer */}
      <span className="text-white/20 select-none">{word}</span>

      {/* Animated overlay layer */}
      <motion.span
        style={{ opacity }}
        className={`absolute left-0 top-0 select-none ${
          isHighlight ? "text-lime-400 drop-shadow-[0_0_15px_rgba(163,230,53,0.35)]" : "text-white"
        }`}
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalWords = WORDS.length;
  const step = 1 / totalWords;

  return (
    <section
      id="about"
      className="relative z-20 w-full max-w-full overflow-x-clip bg-black text-white"
    >
      {/* Scroll track container with 250vh */}
      <div ref={containerRef} className="relative w-full h-[250vh] bg-black">
        {/* Sticky viewport container */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center bg-black py-8 px-5 sm:px-8 md:px-10">
          <div className="w-full max-w-6xl mx-auto">
            {/* Top Info Row: Category badge & live reading progress bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
              <div className="font-mono text-xs sm:text-sm uppercase tracking-widest text-lime-400 flex items-center gap-2">
                <span className="size-2 rounded-full bg-lime-400 animate-pulse" />
                <span>[ 01 // THE EDUCATIONAL PARADIGM SHIFT ]</span>
              </div>

              {/* Progress Bar Tracking Word Scrub */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  SCROLL READ
                </span>
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
                    className="h-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.8)]"
                  />
                </div>
              </div>
            </div>

            {/* Word-by-Word Scroll Scrubbing Paragraph with fixed responsive scale */}
            <p className="flex flex-wrap font-bold text-white/20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[52px] leading-[1.25] tracking-tight">
              {WORDS.map((item, i) => {
                const start = 0.04 + (i / totalWords) * 0.88;
                const end = Math.min(0.98, start + step * 2.2);

                return (
                  <Word
                    key={`${item.text}-${i}`}
                    word={item.text}
                    progress={scrollYProgress}
                    range={[start, end]}
                    isHighlight={item.isHighlight}
                  />
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
