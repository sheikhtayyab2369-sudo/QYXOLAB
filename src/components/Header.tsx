"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Implementation", href: "#roadmap" },
  { label: "Lab Stack", href: "#stack" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const scrolled = useScroll(10);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Track active section on scroll to highlight nav items
  useEffect(() => {
    const sectionIds = ["about", "programs", "roadmap", "stack", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(`#${id}`);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (open) {
      setOpen(false);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (window.location.hash) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  const handleNavClick = (href: string) => {
    setOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 ease-out",
          scrolled && !open
            ? "bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50"
            : "bg-black/70 md:bg-transparent border-b border-white/5 md:border-transparent backdrop-blur-md md:backdrop-blur-none",
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <nav
            className={cn(
              "flex w-full items-center justify-between transition-all duration-300",
              scrolled ? "h-14 sm:h-16 md:h-16" : "h-14 sm:h-16 md:h-20",
            )}
          >
            {/* Left Brand Identity */}
            <Link
              href="/"
              onClick={handleLogoClick}
              className="group flex items-center gap-2 sm:gap-3 select-none cursor-pointer py-1 shrink-0"
              aria-label="Ilm Tech Homepage - Back to Top"
            >
              <div className="relative flex items-center justify-center size-8 sm:size-9 md:size-10 shrink-0">
                <Image
                  src="/ilm-emblem.png"
                  alt="Ilm Tech Emblem"
                  width={48}
                  height={48}
                  className="size-full object-contain drop-shadow-[0_0_14px_rgba(163,230,53,0.5)] group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <div className="flex items-center gap-1 font-bold text-lg sm:text-xl md:text-2xl tracking-tight leading-none">
                <span className="text-white group-hover:text-zinc-200 transition-colors">
                  Ilm
                </span>
                <span className="text-lime-400 group-hover:text-lime-300 transition-colors">
                  Tech
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links & CTA */}
            <div className="hidden items-center gap-1 lg:gap-2 md:flex">
              {links.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                        size: "sm",
                        className:
                          "text-sm font-sans font-medium tracking-normal px-3.5 py-2 rounded-full transition-colors cursor-pointer",
                      }),
                      isActive
                        ? "text-lime-400 bg-white/10"
                        : "text-zinc-300 hover:text-white hover:bg-white/10"
                    )}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
              <Button
                size="sm"
                asChild
                className="ml-3 bg-lime-400 text-black hover:bg-lime-300 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-[0_0_18px_rgba(163,230,53,0.35)] hover:shadow-[0_0_24px_rgba(163,230,53,0.55)] transition-all cursor-pointer"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                >
                  Partner With Us
                </a>
              </Button>
            </div>

            {/* Mobile Actions: Responsive Partner CTA + Hamburger Menu */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="px-3 sm:px-3.5 py-1.5 rounded-full bg-lime-400 text-black font-sans font-bold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(163,230,53,0.3)] active:bg-lime-300 transition-all cursor-pointer shrink-0"
              >
                <span>Partner</span>
                <span className="hidden min-[380px]:inline"> With Us</span>
              </a>

              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center size-9 sm:size-10 rounded-xl border border-white/15 bg-zinc-950/80 hover:bg-zinc-900 active:scale-95 text-white cursor-pointer transition-all shrink-0"
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={open}
              >
                <MenuToggleIcon open={open} className="size-5 text-white" duration={300} />
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Horizontal Sub-Header: Bulletproof flex-start alignment prevents left-side clipping on narrow phones */}
        <div className="md:hidden w-full border-t border-white/10 bg-black/90 backdrop-blur-xl px-3 py-1.5 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max justify-start min-[400px]:justify-center min-[400px]:mx-auto px-1">
            {links.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all shrink-0 cursor-pointer",
                    isActive
                      ? "bg-lime-400 text-black font-bold shadow-[0_0_12px_rgba(163,230,53,0.35)]"
                      : "text-zinc-300 hover:text-white bg-white/[0.05] border border-white/10 active:bg-white/15"
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer via Portal */}
      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto md:hidden">
            {/* Top Row with Logo & Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative size-8 shrink-0">
                  <Image
                    src="/ilm-emblem.png"
                    alt="Ilm Tech Emblem"
                    width={32}
                    height={32}
                    className="size-full object-contain drop-shadow-[0_0_12px_rgba(163,230,53,0.5)]"
                  />
                </div>
                <div className="flex items-center gap-1 font-bold text-xl tracking-tight">
                  <span className="text-white">Ilm</span>
                  <span className="text-lime-400">Tech</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="size-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white active:scale-95 transition-all"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-3 py-6">
              {links.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={cn(
                      "flex items-center justify-between text-lg font-sans font-semibold tracking-wide py-3.5 px-4 rounded-2xl border transition-colors cursor-pointer",
                      isActive
                        ? "bg-lime-400/10 border-lime-400/50 text-lime-400"
                        : "bg-white/[0.03] border-white/10 text-zinc-100 active:text-lime-400"
                    )}
                  >
                    <span>{link.label}</span>
                    <span className="text-zinc-500 text-sm">→</span>
                  </a>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleNavClick("#contact")}
                className="w-full bg-lime-400 text-black active:bg-lime-300 font-sans font-bold text-sm uppercase tracking-wider py-4 rounded-full shadow-[0_0_20px_rgba(163,230,53,0.35)] cursor-pointer"
              >
                Partner With Us
              </button>

              <div className="flex items-center justify-between text-xs text-white/50 pt-1 px-1">
                <span>K-12 STEM ECOSYSTEM</span>
                <span>© 2026 Ilm Tech</span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
