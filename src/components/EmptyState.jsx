import React from 'react';
import { FolderSearch } from 'lucide-react';
import { motion } from 'framer-motion';

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
    >
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
        <FolderSearch className="h-10 w-10 text-slate-500" />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-2xl font-bold text-slate-200">
        No Repositories Found
      </h3>

      {/* Description */}
      <p className="mb-8 max-w-md text-slate-400">
        We couldn't find any repositories in this account. Try refreshing or
        check your GitHub permissions.
      </p>

      {/* Action Button */}
      <button className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-95">
        Refresh Repositories
      </button>
    </motion.div>
  );
}
