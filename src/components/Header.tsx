"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";

const links = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Implementation", href: "#roadmap" },
  { label: "Lab Stack", href: "#stack" },
];

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    // Reveal header after preloader effect finishes
    const handleReveal = () => setIsVisible(true);
    window.addEventListener("preloader-curtain-open", handleReveal);

    // Fallback timer (2400ms) to ensure header shows even if preloader is skipped
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2400);

    return () => {
      window.removeEventListener("preloader-curtain-open", handleReveal);
      clearTimeout(timer);
    };
  }, []);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-8 pointer-events-none",
        scrolled && !open
          ? "bg-black/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50"
          : "bg-transparent border-b border-transparent",
        {
          "bg-black/95": open && isVisible,
        },
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <nav
          className={cn(
            "flex w-full items-center justify-between transition-all duration-300",
            scrolled ? "h-16 md:h-16" : "h-16 md:h-20",
          )}
        >
          {/* Left Brand Identity */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-2.5 sm:gap-3 select-none cursor-pointer py-1"
            aria-label="Ilm Tech Homepage - Back to Top"
          >
            <div className="relative flex items-center justify-center size-9 md:size-10 shrink-0">
              <Image
                src="/ilm-emblem.png"
                alt="Ilm Tech Emblem"
                width={48}
                height={48}
                className="size-full object-contain drop-shadow-[0_0_14px_rgba(163,230,53,0.5)] group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex items-center gap-1 font-bold text-xl sm:text-2xl tracking-tight leading-none">
              <span className="text-white group-hover:text-zinc-200 transition-colors">
                Ilm
              </span>
              <span className="text-lime-400 group-hover:text-lime-300 transition-colors">
                Tech
              </span>
            </div>
          </Link>

          {/* Center Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:gap-2 md:flex">
            {links.map((link, i) => (
              <a
                key={i}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className:
                    "text-sm font-sans font-medium tracking-normal text-zinc-300 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-full transition-colors",
                })}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
            <Button
              size="sm"
              asChild
              className="ml-3 bg-lime-400 text-black hover:bg-lime-300 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-[0_0_18px_rgba(163,230,53,0.35)] hover:shadow-[0_0_24px_rgba(163,230,53,0.55)] transition-all cursor-pointer"
            >
              <a href="#contact">Partner With Us</a>
            </Button>
          </div>

          {/* Mobile Hamburger Toggle with 44px minimum tap target */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center size-11 rounded-xl border border-white/15 bg-zinc-950/80 hover:bg-zinc-900 active:scale-95 text-white cursor-pointer transition-all"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
          >
            <MenuToggleIcon open={open} className="size-5 text-white" duration={300} />
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "bg-black/95 supports-[backdrop-filter]:bg-black/90 backdrop-blur-2xl fixed top-16 right-0 bottom-0 left-0 z-50 flex flex-col overflow-y-auto border-t border-white/10 md:hidden transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div
          data-slot={open ? "open" : "closed"}
          className={cn(
            "data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out",
            "flex min-h-[calc(100vh-4rem)] w-full flex-col justify-between gap-y-6 p-6 pb-12",
          )}
        >
          <div className="grid gap-y-2 pt-2">
            {links.map((link) => (
              <a
                key={link.label}
                className="flex items-center justify-between text-lg font-sans font-semibold tracking-wide text-zinc-200 hover:text-lime-400 py-3.5 px-4 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors"
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                <span>{link.label}</span>
                <span className="text-zinc-600 text-sm">→</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
            <Button
              className="w-full bg-lime-400 text-black hover:bg-lime-300 font-sans font-bold uppercase tracking-wider py-6 text-sm shadow-[0_0_20px_rgba(163,230,53,0.3)] rounded-full cursor-pointer"
              asChild
              onClick={() => handleNavClick("#contact")}
            >
              <a href="#contact">Partner With Us</a>
            </Button>
            <div className="flex items-center justify-between text-xs font-mono text-white/50 pt-2 px-1">
              <button
                type="button"
                onClick={handleLogoClick}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer text-left"
              >
                <div className="size-6 rounded overflow-hidden shrink-0">
                  <Image
                    src="/ilm-emblem.png"
                    alt="Ilm Tech Logo"
                    width={24}
                    height={24}
                    className="size-full object-contain drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]"
                  />
                </div>
                <div className="flex items-center gap-1 font-bold text-sm tracking-tight">
                  <span className="text-white">Ilm</span>
                  <span className="text-lime-400">Tech</span>
                </div>
              </button>
              <span className="tracking-wider text-[10px]">K-12 STEM LABS</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
