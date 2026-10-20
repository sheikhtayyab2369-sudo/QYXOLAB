import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProgramsShowcase from "@/components/ProgramsShowcase";
import ImplementationTimeline from "@/components/ImplementationTimeline";
import SkillsAndTools from "@/components/SkillsAndTools";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-clip bg-black text-white selection:bg-lime-300 selection:text-lime-900 scrollbar-none">
      {/* Curtain Preloader with split panels & sequential keywords */}
      <Preloader />

      {/* Fixed Navigation Header */}
      <Header />

      {/* Main Content Sections with clean sticky & relative z-10 layering */}
      <main className="relative min-h-screen w-full max-w-full overflow-x-clip bg-black">
        {/* Ambient Glows securely clipped to prevent any horizontal page shift or overflow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-[25vh] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-lime-400/[0.04] blur-[140px] rounded-full" />
          <div className="absolute top-[140vh] -left-48 w-[600px] h-[400px] bg-lime-400/[0.025] blur-[150px] rounded-full" />
          <div className="absolute top-[260vh] -right-48 w-[600px] h-[400px] bg-lime-400/[0.03] blur-[160px] rounded-full" />
        </div>

        {/* Sticky Hero section */}
        <Hero />

        {/* Scroll-Scrubbed About section (word-by-word reveal replicating eshansingh.in) */}
        <AboutSection />

        {/* Programs Showcase section */}
        <ProgramsShowcase />

        {/* Implementation Timeline section with animated vertical scroll-linked line */}
        <ImplementationTimeline />

        {/* Hardware & Tech Stack ecosystem grid */}
        <SkillsAndTools />

        {/* Official Corporate Sponsors & Strategic Partners */}
        <SponsorsSection />

        {/* B2B Institutional Contact & Footer */}
        <Footer />
      </main>
    </div>
  );
}
