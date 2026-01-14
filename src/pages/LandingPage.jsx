import React from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { HeroSection } from '../components/HeroSection';
import { BentoGrid } from '../components/BentoGrid';
import { TrustSection } from '../components/TrustSection';
import { FinalCTA } from '../components/FinalCTA';
import { LOGIN_URL } from '../components/api.js/configUrls';

export function LandingPage() {


  const handleLogin = () => {
    window.location.href = LOGIN_URL;
  };



  return <div className="relative min-h-screen w-full bg-[#020617] text-white selection:bg-purple-500/30">
      <AnimatedBackground />

      {/* Navigation (Simple) */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#020617]/50 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="h-6 w-6 rounded bg-gradient-to-tr from-purple-500 to-blue-500" />
            SecureAI
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Docs
            </a>
            <button className="rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition-colors"
              onClick={handleLogin}
              >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <main className="relative">
        <HeroSection />
        <TrustSection />
        <BentoGrid />
        <FinalCTA />
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-[#020617] py-12 text-center text-sm text-slate-600">
        <div className="mx-auto max-w-7xl px-4">
          <p>© 2024 SecureAI Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>;
}