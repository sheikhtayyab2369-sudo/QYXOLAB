"use client";
import { useState } from "react";
import Image from "next/image";
import { Check, Sparkles, ArrowUpRight } from "lucide-react";

const PROGRAM_INTERESTS = [
  "Robotics Lab",
  "AI Curriculum",
  "Data Science Track",
  "Full STEM Partnership",
];

export default function Footer() {
  const [formData, setFormData] = useState({
    schoolName: "",
    contactPerson: "",
    email: "",
    cityStrength: "",
    phone: "",
  });

  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([
    "Robotics Lab",
    "AI Curriculum",
  ]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleProgram = (prog: string) => {
    setSelectedPrograms((prev) =>
      prev.includes(prog) ? prev.filter((p) => p !== prog) : [...prev, prog]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          programs: selectedPrograms,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send request. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="contact"
      className="relative z-20 w-full max-w-full overflow-x-clip bg-black text-white pt-24 pb-12 px-5 sm:px-8 md:px-10 border-t border-white/10 scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Split Two Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-white/10">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Monospace Tag */}
              <div className="text-lime-400 font-mono text-xs uppercase tracking-widest mb-4">
                {"// BRING US TO YOUR CAMPUS"}
              </div>

              {/* Massive Headline */}
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
                Ready to build the future at your school?
              </h2>

              {/* Description */}
              <p className="text-white/70 text-lg max-w-xl mb-8 leading-relaxed">
                Schedule a free 45-minute live Robotics &amp; AI demonstration at your school
                campus for your management and students.
              </p>
            </div>

            {/* Feasibility Indicator */}
            <div className="pt-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs text-white/60">
                <span className="size-2 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
                <span>IN-PERSON CAMPUS LAB FEASIBILITY VISITS AVAILABLE NATIONWIDE</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols) — Clean B2B Demo Request Form */}
          <div className="lg:col-span-5">
            {isSubmitted ? (
              <div className="border border-lime-400/40 bg-zinc-950 p-8 flex flex-col justify-center items-center text-center space-y-4">
                <div className="size-12 rounded-full bg-lime-400/10 border border-lime-400 flex items-center justify-center text-lime-400">
                  <Sparkles className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Campus Demo Requested</h3>
                <p className="text-sm text-white/70 max-w-sm">
                  Thank you. Our Academic Partnerships Director will contact your office within
                  4 business hours to confirm kit logistics and dates.
                </p>
                <div className="font-mono text-xs text-lime-400 bg-lime-400/10 px-3 py-1.5 rounded border border-lime-400/20">
                  [ INQUIRY PROTOCOL: LOGGED // TICKET #QYXO-2026 ]
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-mono uppercase text-white/50 underline underline-offset-4 hover:text-white pt-2 cursor-pointer"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. School / Institution Name */}
                <div>
                  <label htmlFor="schoolName" className="sr-only">
                    School / Institution Name
                  </label>
                  <input
                    id="schoolName"
                    type="text"
                    required
                    placeholder="School / Institution Name"
                    value={formData.schoolName}
                    onChange={(e) =>
                      setFormData({ ...formData, schoolName: e.target.value })
                    }
                    className="w-full bg-zinc-950/80 border border-white/15 px-4 py-3.5 rounded-xl text-white placeholder:text-white/35 focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 focus:outline-none transition-all text-sm"
                  />
                </div>

                {/* 2. Contact Person & Designation */}
                <div>
                  <label htmlFor="contactPerson" className="sr-only">
                    Contact Person &amp; Designation
                  </label>
                  <input
                    id="contactPerson"
                    type="text"
                    required
                    placeholder="Contact Person & Designation (Principal / Director / Coordinator)"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPerson: e.target.value })
                    }
                    className="w-full bg-zinc-950/80 border border-white/15 px-4 py-3.5 rounded-xl text-white placeholder:text-white/35 focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 focus:outline-none transition-all text-sm"
                  />
                </div>

                {/* 3. Official Email Address */}
                <div>
                  <label htmlFor="email" className="sr-only">
                    Official Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Official Email Address (e.g. principal@school.edu)"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-zinc-950/80 border border-white/15 px-4 py-3.5 rounded-xl text-white placeholder:text-white/35 focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 focus:outline-none transition-all text-sm"
                  />
                </div>

                {/* 4. City & Approximate Student Strength */}
                <div>
                  <label htmlFor="cityStrength" className="sr-only">
                    City &amp; Approximate Student Strength
                  </label>
                  <input
                    id="cityStrength"
                    type="text"
                    required
                    placeholder="City & Approximate Student Strength (e.g. Austin, 1,200 Students)"
                    value={formData.cityStrength}
                    onChange={(e) =>
                      setFormData({ ...formData, cityStrength: e.target.value })
                    }
                    className="w-full bg-zinc-950/80 border border-white/15 px-4 py-3.5 rounded-xl text-white placeholder:text-white/35 focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 focus:outline-none transition-all text-sm"
                  />
                </div>

                {/* 5. Phone / WhatsApp Number */}
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-zinc-950/80 border border-white/15 px-4 py-3.5 rounded-xl text-white placeholder:text-white/35 focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 focus:outline-none transition-all text-sm"
                  />
                </div>

                {/* 6. Program Interest Checkboxes */}
                <div className="pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                    Program Interests:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {PROGRAM_INTERESTS.map((prog) => {
                      const isSelected = selectedPrograms.includes(prog);
                      return (
                        <button
                          type="button"
                          key={prog}
                          onClick={() => toggleProgram(prog)}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer select-none text-left transition-all ${
                            isSelected
                              ? "border-lime-400/80 bg-lime-400/10 text-white shadow-[0_0_15px_rgba(163,230,53,0.15)]"
                              : "border-white/15 bg-zinc-950/60 text-white/70 hover:border-white/30"
                          }`}
                        >
                          <span
                            className={`size-4 shrink-0 rounded-md border flex items-center justify-center transition-colors ${
                              isSelected
                                ? "border-lime-400 bg-lime-400 text-black"
                                : "border-white/30"
                            }`}
                          >
                            {isSelected && <Check className="size-3 stroke-[3]" />}
                          </span>
                          <span className="truncate">{prog}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="text-red-400 text-xs font-mono bg-red-950/40 border border-red-500/40 px-3.5 py-2.5 rounded-xl">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full bg-lime-400 text-black font-mono font-bold text-xs uppercase tracking-wider py-4 rounded-full hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.45)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer mt-3 flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? "Saving to Database..." : "Request Free Campus Demo"}</span>
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-sm text-white/40 font-mono gap-4">
          <div className="flex items-center gap-3">
            <div className="size-6 rounded-md overflow-hidden border border-white/20 bg-black shrink-0">
              <Image
                src="/logo-icon.png"
                alt="QYXO Labs Emblem"
                width={24}
                height={24}
                className="size-full object-contain"
              />
            </div>
            <div>
              © 2026{" "}
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  if (window.location.hash) {
                    window.history.pushState(null, "", window.location.pathname);
                  }
                }}
                className="text-white/70 hover:text-lime-400 transition-colors cursor-pointer"
              >
                Q Y X O Labs
              </button>
              . All rights reserved.
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              if (window.location.hash) {
                window.history.pushState(null, "", window.location.pathname);
              }
            }}
            className="text-xs uppercase tracking-widest text-lime-400 hover:text-lime-300 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Back to top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
