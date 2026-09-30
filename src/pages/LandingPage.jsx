import React from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { HeroSection } from '../components/HeroSection';
import { BentoGrid } from '../components/BentoGrid';
import { TrustSection } from '../components/TrustSection';
import { FinalCTA } from '../components/FinalCTA';
import { LOGIN_URL } from '../components/api.js/configUrls';
import { Link } from 'react-router-dom';

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
            <Link to="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link to="/features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/docs" className="hover:text-white transition-colors">
              Docs
            </Link>
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
        <section id="pricing" className="relative z-10 scroll-mt-20 px-4 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">Simple plans</p>
              <h2 className="mt-3 font-serif text-4xl font-medium text-white md:text-5xl">Start with five pushes free</h2>
              <p className="mt-4 text-slate-400">Paid plans are being prepared and cannot be purchased yet.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex flex-col rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-6">
                <h3 className="text-lg font-semibold text-white">Free</h3>
                <p className="mt-4 text-3xl font-bold text-white">$0</p>
                <p className="mt-1 text-sm text-slate-400">5 pushes total</p>
                <p className="mt-6 flex-1 text-sm leading-6 text-slate-300">Connect a GitHub repository, choose branches, and review up to five pushes.</p>
                <a href={LOGIN_URL} className="mt-8 inline-flex justify-center rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400">Connect GitHub</a>
              </div>
              <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 opacity-75">
                <h3 className="text-lg font-semibold text-white">Pro</h3>
                <p className="mt-4 text-3xl font-bold text-white">INR 499<span className="text-sm font-normal text-slate-400"> / month</span></p>
                <p className="mt-1 text-sm text-slate-400">50 pushes per month</p>
                <p className="mt-6 flex-1 text-sm leading-6 text-slate-300">More review capacity for an individual developer.</p>
                <button disabled className="mt-8 cursor-not-allowed rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-slate-500">Coming soon</button>
              </div>
              <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 opacity-75">
                <h3 className="text-lg font-semibold text-white">Pro Ultra</h3>
                <p className="mt-4 text-3xl font-bold text-white">INR 999<span className="text-sm font-normal text-slate-400"> / month</span></p>
                <p className="mt-1 text-sm text-slate-400">200 pushes per month</p>
                <p className="mt-6 flex-1 text-sm leading-6 text-slate-300">Higher review capacity and priority audit history.</p>
                <button disabled className="mt-8 cursor-not-allowed rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-slate-500">Coming soon</button>
              </div>
              <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 opacity-75">
                <h3 className="text-lg font-semibold text-white">Organization</h3>
                <p className="mt-4 text-3xl font-bold text-white">Usage based</p>
                <p className="mt-1 text-sm text-slate-400">For teams</p>
                <p className="mt-6 flex-1 text-sm leading-6 text-slate-300">Centralized repository monitoring and team usage controls.</p>
                <button disabled className="mt-8 cursor-not-allowed rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-slate-500">Coming soon</button>
              </div>
            </div>
          </div>
        </section>
        <FinalCTA />
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-[#020617] py-12 text-center text-sm text-slate-600">
        <div className="mx-auto max-w-7xl px-4">
          <p>© 2024 SecureAI Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>;
}