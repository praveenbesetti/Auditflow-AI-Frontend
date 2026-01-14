import React from 'react';
import { motion } from 'framer-motion';
export function AnimatedBackground() {
  return <div className="fixed inset-0 z-0 overflow-hidden bg-[#020617]">
      {/* Mesh Gradients */}
      <div className="absolute inset-0 opacity-30">
        <motion.div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600 blur-[120px]" animate={{
        x: [0, 100, 0],
        y: [0, 50, 0],
        scale: [1, 1.2, 1]
      }} transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut'
      }} />
        <motion.div className="absolute top-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600 blur-[120px]" animate={{
        x: [0, -100, 0],
        y: [0, 100, 0],
        scale: [1, 1.1, 1]
      }} transition={{
        duration: 25,
        repeat: Infinity,
        ease: 'easeInOut'
      }} />
        <motion.div className="absolute bottom-[-10%] left-[20%] h-[600px] w-[600px] rounded-full bg-indigo-600 blur-[120px]" animate={{
        x: [0, 50, 0],
        y: [0, -50, 0],
        scale: [1, 1.3, 1]
      }} transition={{
        duration: 30,
        repeat: Infinity,
        ease: 'easeInOut'
      }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" style={{
      maskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
    }} />

      {/* Noise Overlay for texture (optional but adds "extreme" feel) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
    </div>;
}