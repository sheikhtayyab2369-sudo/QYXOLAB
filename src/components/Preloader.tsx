"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["IMAGINE.", "BUILD.", "INNOVATE."];

export default function Preloader() {
  const [wordIndex, setWordIndex] = useState(0);
  const [showWords, setShowWords] = useState(true);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Lock scrolling while preloader runs
    document.body.style.overflow = "hidden";

    // Sequentially flash 3 bold words:
    // 1. "IMAGINE." from 0 to 650ms
    // 2. "BUILD." from 650ms to 1300ms
    const t1 = setTimeout(() => {
      setWordIndex(1);
    }, 650);

    // 3. "INNOVATE." from 1300ms to 1950ms
    const t2 = setTimeout(() => {
      setWordIndex(2);
    }, 1300);

    // Fade out 3rd word (~1950ms to 2200ms)
    const t3 = setTimeout(() => {
      setShowWords(false);
    }, 1950);

    // Split curtain panels to reveal website underneath (~2.2 seconds total)
    const t4 = setTimeout(() => {
      setIsCurtainOpen(true);
      document.body.style.overflow = "";
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("preloader-curtain-open"));
      }
    }, 2200);

    // Remove preloader from DOM after transition completes (~3.3 seconds total)
    const t5 = setTimeout(() => {
      setIsFinished(true);
    }, 3300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      document.body.style.overflow = "";
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Left Curtain Panel */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isCurtainOpen ? "-100%" : "0%" }}
        transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
        className="absolute inset-y-0 left-0 w-[calc(50%+1px)] bg-black z-[101] will-change-transform"
      />

      {/* Right Curtain Panel */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isCurtainOpen ? "100%" : "0%" }}
        transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
        className="absolute inset-y-0 right-0 w-[calc(50%+1px)] bg-black z-[101] will-change-transform"
      />

      {/* Center Content */}
      <div className="fixed inset-0 z-[102] flex flex-col items-center justify-center gap-6">
        {showWords && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35 }}
            className="h-20 sm:h-24 w-auto flex items-center justify-center p-2"
          >
            <Image
              src="/ilm-logo.png"
              alt="Ilm Tech Logo"
              width={240}
              height={90}
              className="h-full w-auto object-contain drop-shadow-[0_0_35px_rgba(163,230,53,0.45)]"
              priority
            />
          </motion.div>
        )}

        {/* Sequentially Flashed 3 Bold Words */}
        <AnimatePresence mode="wait">
          {showWords && (
            <motion.div
              key={WORDS[wordIndex]}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white select-none text-center px-4"
            >
              {WORDS[wordIndex]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
