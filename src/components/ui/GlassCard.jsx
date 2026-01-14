import React from "react";
import { motion } from "framer-motion";

export function GlassCard({ children, className = "", hoverEffect = true }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
            }
          : {}
      }
      transition={{ duration: 0.3 }}
    >
      {/* Gradient Border Overlay */}
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none" />

      {/* Inner Content */}
      <div className="relative z-10 h-full">{children}</div>

      {/* Subtle sheen effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
