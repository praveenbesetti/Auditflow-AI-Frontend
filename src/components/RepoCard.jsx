import React from 'react';
import { GitFork, Lock, Shield, Star, Unlock, Code2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export function RepoCard({ repo, onClick }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{
        scale: 1.01,
        backgroundColor: 'rgba(255, 255, 255, 0.08)'
      }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onClick(repo)}
      className="group relative flex cursor-pointer flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-lg hover:shadow-blue-900/5"
    >
      <div>
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition-colors ${
                repo.isConnected
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  : 'bg-white/5 text-slate-400 group-hover:text-slate-300'
              }`}
            >
              {repo.isConnected ? (
                <Shield className="h-5 w-5" />
              ) : (
                <Code2 className="h-5 w-5" />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                {repo.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {repo.isPrivate ? (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <Lock className="h-3 w-3" /> Private
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <Unlock className="h-3 w-3" /> Public
                  </span>
                )}
                <span className="text-xs text-slate-600">•</span>
                <span className="text-xs text-slate-500">{repo.language}</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          {repo.isConnected ? (
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Active
            </div>
          ) : (
            <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-500 ring-1 ring-inset ring-white/10 group-hover:bg-white/10 group-hover:text-slate-400 transition-colors">
              Ready
            </div>
          )}
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
          {repo.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5" />
            {repo.stars}
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" />
            {repo.forks}
          </div>
          <div className="text-slate-600">Updated 2d ago</div>
        </div>
      </div>

      {/* Hover hint */}
      <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
        <Settings className="h-4 w-4 text-slate-400" />
      </div>
    </motion.article>
  );
}
