import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, GitCommit, Clock, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

const statusConfig = {
  REJECTED: {
    color: 'bg-red-500',
    shadow: 'shadow-[0_0_12px_rgba(239,68,68,0.6)]',
    textColor: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    icon: AlertCircle,
    label: 'Failed',
    pulse: true
  },
  WARNING: {
    color: 'bg-yellow-500',
    shadow: 'shadow-[0_0_8px_rgba(234,179,8,0.4)]',
    textColor: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    icon: AlertTriangle,
    label: 'Warning',
    pulse: false
  },
  PASSED: {
    color: 'bg-emerald-500',
    shadow: '',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    icon: CheckCircle2,
    label: 'Passed',
    pulse: false
  }
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export function AuditTimeline({ logs }) {
  if (logs.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
          <GitCommit className="h-8 w-8 text-slate-500" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-200">
          No Audit Activity Yet
        </h3>
        <p className="max-w-sm text-sm text-slate-400">
          Audit logs will appear here once you enable AI security monitoring on
          your repositories.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Live Security Feed
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Real-time audit results from your monitored repositories
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock className="h-4 w-4" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative ml-4 space-y-8 border-l-2 border-slate-800/50"
      >
        {logs.map((log) => {
          const config = statusConfig[log.status];
          const StatusIcon = config.icon;

          return (
            <motion.div key={log.id} variants={item} className="relative pl-8">
              {/* Status Dot */}
              <span
                className={`absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-4 border-[#0a0e27] ${config.color} ${config.shadow} ${
                  config.pulse ? 'animate-pulsey' : ''
                }`}
              />

              {/* Event Card */}
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all hover:border-blue-500/30 hover:bg-white/8">
                {/* Header */}
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-blue-400">
                        #{log.commitHash.substring(0, 7)}
                      </span>
                      <span className="text-xs text-slate-600">•</span>
                      <span className="text-xs text-slate-500">@{log.author}</span>
                    </div>
                    <h3 className="font-medium text-start text-slate-200 group-hover:text-white transition-colors">
                      {log.repoName}
                    </h3>
                    <p className="mt-1 text-sm text-start text-slate-400 font-mono">
                      {log.commitMessage}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs uppercase tracking-widest text-slate-500">
                      {new Date(log.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <div
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.bgColor} ${config.textColor} ring-1 ring-inset ${config.borderColor}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="mb-4 rounded-lg bg-black/20 p-3 border border-white/5">
                  <p className="line-clamp-2 text-sm italic leading-relaxed text-slate-400">
                    "{log.details}"
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${config.bgColor} ${config.textColor} border ${config.borderColor} hover:bg-blue-600 hover:text-white hover:border-blue-600`}
                    >
                      <FileText className="h-3 w-3" />
                      Full Report
                    </button>
                    <button className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-slate-700 hover:text-white">
                      <ExternalLink className="h-3 w-3" />
                      View on GitHub
                    </button>
                  </div>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-400 ring-1 ring-white/10">
                    {log.language}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
