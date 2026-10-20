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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-full md:border transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-8 pointer-events-none",
        {
          "bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg md:top-4 md:max-w-4xl md:rounded-full md:shadow":
            scrolled && !open && isVisible,
          "bg-background/90": open && isVisible,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          },
        )}
      >
        {/* Left Brand Identity */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="group flex items-center gap-2.5 select-none cursor-pointer"
          aria-label="Q Y X O Labs Homepage - Back to Top"
        >
          <div className="relative flex items-center justify-center size-8 rounded-lg bg-black border border-white/20 overflow-hidden group-hover:border-lime-400 group-hover:shadow-[0_0_15px_rgba(163,230,53,0.35)] transition-all shrink-0">
            <Image
              src="/logo-icon.png"
              alt="QYXO Labs Logo Icon"
              width={32}
              height={32}
              className="size-full object-contain p-0.5 group-hover:scale-110 transition-transform duration-300"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold tracking-[0.2em] text-white text-base group-hover:text-lime-400 transition-colors">
              Q Y X O
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400">
              LABS
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link, i) => (
            <a
              key={i}
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className:
                  "text-xs font-mono font-medium tracking-wider uppercase text-zinc-300 hover:text-white hover:bg-white/10 transition-colors",
              })}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <Button
            size="sm"
            asChild
            className="ml-2 bg-lime-400 text-black hover:bg-lime-300 font-mono text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_20px_rgba(163,230,53,0.5)] transition-all cursor-pointer"
          >
            <a href="#contact">Partner With Us</a>
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="md:hidden size-9 border-white/15 bg-zinc-950/80 hover:bg-zinc-900 text-white cursor-pointer"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          <MenuToggleIcon open={open} className="size-5 text-white" duration={300} />
        </Button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "bg-background/95 supports-[backdrop-filter]:bg-background/90 backdrop-blur-2xl fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y border-white/10 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div
          data-slot={open ? "open" : "closed"}
          className={cn(
            "data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out",
            "flex h-full w-full flex-col justify-between gap-y-2 p-5",
          )}
        >
          <div className="grid gap-y-3 pt-2">
            {links.map((link) => (
              <a
                key={link.label}
                className={buttonVariants({
                  variant: "ghost",
                  className: "justify-start text-lg font-mono tracking-wide hover:text-lime-400 py-3",
                })}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pb-6">
            <Button
              className="w-full bg-lime-400 text-black hover:bg-lime-300 font-mono font-bold uppercase tracking-wider py-6 text-sm shadow-[0_0_20px_rgba(163,230,53,0.3)]"
              asChild
              onClick={() => setOpen(false)}
            >
              <a href="#contact">Partner With Us</a>
            </Button>
            <div className="flex items-center justify-between text-xs font-mono text-white/40 pt-2 px-1">
              <button
                type="button"
                onClick={handleLogoClick}
                className="flex items-center gap-2 hover:text-lime-400 transition-colors cursor-pointer text-left font-mono"
              >
                <div className="size-5 rounded overflow-hidden border border-white/20 bg-black shrink-0">
                  <Image
                    src="/logo-icon.png"
                    alt="QYXO Logo"
                    width={20}
                    height={20}
                    className="size-full object-contain"
                  />
                </div>
                <span>Q Y X O LABS</span>
              </button>
              <span>K-12 STEM ECOSYSTEM</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
