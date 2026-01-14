import React from 'react';
import { motion } from 'framer-motion';
import { Github, Triangle, Globe, BoxIcon } from 'lucide-react';

export function TrustSection() {
  const logos = [
    { name: 'GitHub', icon: Github },
    { name: 'Vercel', icon: Triangle },
    { name: 'Stripe', icon: BoxIcon },
    { name: 'Airbnb', icon: Globe } // Using Globe as Airbnb proxy
  ];

  return (
    <section className="relative z-10 border-y border-white/5 bg-white/[0.02] py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="mb-8 font-mono text-sm uppercase tracking-widest text-slate-500">
          Securing Codebases for Teams at
        </p>

        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
          {logos.map((logo) => (
            <motion.div
              key={logo.name}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 text-white"
            >
              <logo.icon className="h-8 w-8" strokeWidth={1.5} />
              <span className="text-xl font-bold tracking-tight">{logo.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
