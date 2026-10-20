"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles, Building2 } from "lucide-react";

interface Sponsor {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
  websiteUrl: string;
  displayUrl: string;
  description: string;
  badge: string;
}

const SPONSORS: Sponsor[] = [
  {
    id: "ec-services",
    name: "EC Services Private Ltd.",
    category: "Official Corporate Sponsor",
    logoUrl: "/sponsors/ec-services.png",
    websiteUrl: "https://www.ecservices.pk/",
    displayUrl: "www.ecservices.pk",
    description:
      "Premier corporate and technical engineering services provider supporting next-generation STEM infrastructure, student labs, and academic innovation across campuses.",
    badge: "Corporate & Engineering Services",
  },
  {
    id: "pie-technologies",
    name: "Pie Technologies",
    category: "Official Technology Sponsor",
    logoUrl: "/sponsors/pie-technologies.png",
    websiteUrl: "https://www.pie-technologies.com/",
    displayUrl: "www.pie-technologies.com",
    description:
      "A vibrant, highly innovative service provider company for software development, cloud computing, cybersecurity, system integration, and advanced IT training.",
    badge: "Cloud, AI & Software Innovation",
  },
];

export default function SponsorsSection() {
  return (
    <section
      id="sponsors"
      className="relative z-20 w-full max-w-full overflow-x-clip bg-black text-white py-24 px-5 sm:px-8 md:px-10 border-t border-white/10 scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="text-lime-400 font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
              <span>{"// CORPORATE SPONSORS & PARTNERS"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Backed by Leading Innovators
            </h2>
          </div>
          <p className="text-white/60 text-sm sm:text-base max-w-md leading-relaxed">
            Proudly supported by visionary industry partners empowering students with hands-on robotics, AI curriculum, and cutting-edge lab technology.
          </p>
        </div>

        {/* Sponsors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
          {SPONSORS.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl border border-white/15 bg-zinc-950/70 p-7 sm:p-9 hover:border-lime-400/50 hover:bg-zinc-950/90 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden"
            >
              {/* Ambient Card Glow on Hover */}
              <div className="pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-lime-400/[0.04] blur-3xl group-hover:bg-lime-400/[0.12] transition-colors duration-300" />

              <div>
                {/* Top Bar: Tag & External Link Icon */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 font-mono text-[11px] uppercase tracking-wider">
                    <Sparkles className="size-3" />
                    <span>{sponsor.category}</span>
                  </span>

                  <span className="size-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/50 group-hover:text-lime-400 group-hover:border-lime-400/40 group-hover:scale-105 transition-all">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>

                {/* Logo Container */}
                <div className="h-32 w-full rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center p-6 mb-6 group-hover:border-lime-400/30 group-hover:bg-white/[0.04] transition-all">
                  <Image
                    src={sponsor.logoUrl}
                    alt={`${sponsor.name} Logo`}
                    width={sponsor.id === "pie-technologies" ? 260 : 180}
                    height={90}
                    className="max-h-16 sm:max-h-18 w-auto object-contain filter transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Company Name & Details */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">
                  {sponsor.name}
                </h3>
                <div className="text-lime-400/90 font-mono text-xs mb-3">
                  {sponsor.badge}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {sponsor.description}
                </p>
              </div>

              {/* Bottom URL Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50 group-hover:text-lime-400 transition-colors">
                <span className="flex items-center gap-1.5">
                  <Building2 className="size-3.5" />
                  <span>{sponsor.displayUrl}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-lime-400 font-bold group-hover:underline">
                  <span>Visit website</span>
                  <span>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
