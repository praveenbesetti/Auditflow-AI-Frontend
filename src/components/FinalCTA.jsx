import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
export function FinalCTA() {
  return <section className="relative z-10 py-32 text-center">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }}>
          <h2 className="mb-8 font-serif text-5xl font-medium text-white md:text-7xl">
            Ready to fix your <br />
            <span className="text-purple-400">security debt?</span>
          </h2>

          <div className="flex flex-col items-center gap-6">
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-10 py-5 text-xl font-bold text-slate-900 transition-all hover:bg-purple-50">
              Join the Pro Plan
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <p className="text-slate-500">
              30-Day Money Back Guarantee. Cancel anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>;
}