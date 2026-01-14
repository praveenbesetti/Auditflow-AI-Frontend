import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
export function HeroSection() {
  return <section className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-4 pt-20 text-center">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      ease: 'easeOut'
    }} className="max-w-5xl">
        {/* Badge */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: 0.2
      }} className="mb-8 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-200 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
          AI Security Engineer v2.0 is live
        </motion.div>

        {/* Headline */}
        <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight text-white sm:text-7xl md:text-8xl">
          Audit Your Code at the <br />
          <span className="bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Speed of Thought.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400 sm:text-xl md:text-2xl leading-relaxed">
          The first AI security engineer that lives in your workflow. Detect
          logical flaws, fix vulnerabilities, and ship secure code—before your
          first cup of coffee.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-all hover:bg-slate-100">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-70 blur-lg transition-opacity group-hover:opacity-100" />
            <span className="relative flex items-center gap-2">
              Start Auditing for Free <ArrowRight className="h-5 w-5" />
            </span>
          </motion.button>

          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} className="flex items-center gap-3 rounded-full px-8 py-4 text-lg font-medium text-slate-300 transition-colors hover:text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors group-hover:bg-white/20">
              <Play className="h-4 w-4 fill-current" />
            </div>
            Watch 30s Demo
          </motion.button>
        </div>

        {/* Micro-copy */}
        <p className="mt-6 text-sm text-slate-500">
          No Credit Card. 1-Click GitHub Integration.
        </p>
      </motion.div>
    </section>;
}