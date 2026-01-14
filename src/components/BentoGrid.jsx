import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';
import { ShieldCheck, GitPullRequest, Zap, History } from 'lucide-react';
const container = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const item = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0
  }
};
export function BentoGrid() {
  return <section className="relative z-10 px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl font-medium text-white md:text-5xl">
            Beyond Static Analysis
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Security tools shouldn't just find bugs. They should understand
            them.
          </p>
        </div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{
        once: true,
        margin: '-100px'
      }} className="grid grid-cols-1 gap-6 md:grid-cols-4 md:grid-rows-2 h-auto md:h-[600px]">
          {/* Large Card (2x2) */}
          <motion.div variants={item} className="md:col-span-2 md:row-span-2">
            <GlassCard className="h-full p-8 md:p-12 flex flex-col justify-between group">
              <div>
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="mb-4 font-serif text-3xl text-white">
                  Deep Logical Analysis
                </h3>
                <p className="text-lg leading-relaxed text-slate-400">
                  Standard scanners find missing semicolons. We find broken
                  business logic. Our AI understands your intent, not just your
                  syntax, identifying complex vulnerabilities that regex-based
                  tools miss entirely.
                </p>
              </div>
              <div className="mt-8 h-48 w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs text-slate-400">
                <div className="flex gap-2 mb-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/50" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                  <div className="h-3 w-3 rounded-full bg-green-500/50" />
                </div>
                <div className="space-y-1 opacity-70">
                  <p>
                    <span className="text-purple-400">analyzing</span>{' '}
                    payment_flow.ts...
                  </p>
                  <p className="text-green-400">✓ Syntax check passed</p>
                  <p className="text-yellow-400">
                    ⚠ Race condition detected in transaction commit
                  </p>
                  <p className="text-blue-400">
                    ℹ Suggesting atomic transaction wrapper...
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Wide Card (2x1) */}
          <motion.div variants={item} className="md:col-span-2 md:row-span-1">
            <GlassCard className="h-full p-8 flex flex-col justify-center relative overflow-hidden">
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                  <GitPullRequest className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-serif text-2xl text-white">
                  1-Click Webhook Sync
                </h3>
                <p className="text-slate-400 max-w-lg">
                  Connect any repo. We automatically inject a security gate into
                  your PRs. No manual configuration required.
                </p>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-500/10 to-transparent" />
            </GlassCard>
          </motion.div>

          {/* Small Card 1 (1x1) */}
          <motion.div variants={item} className="md:col-span-1 md:row-span-1">
            <GlassCard className="h-full p-8 flex flex-col justify-between">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 font-serif text-xl text-white">
                  Zero-Latency
                </h3>
                <p className="text-sm text-slate-400">
                  Powered by Groq LPU™ technology for near-instant code
                  reviews.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Small Card 2 (1x1) */}
          <motion.div variants={item} className="md:col-span-1 md:row-span-1">
            <GlassCard className="h-full p-8 flex flex-col justify-between">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                <History className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 font-serif text-xl text-white">
                  30-Day History
                </h3>
                <p className="text-sm text-slate-400">
                  Track your security health over time with persistent audit
                  logs.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>;
}