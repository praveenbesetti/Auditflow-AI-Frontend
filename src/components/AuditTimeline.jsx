import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FileText, GitCommit, Clock, AlertCircle, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import axios from 'axios';
import { baseURL } from './api.js/BaseUrl';

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

export function AuditTimeline(log) {
  const [logs, setLogs] = useState([]);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Logs and update State
  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await axios.get(`${baseURL}api/audit-logs`, {
          params: { owner: "praveenbesetti" }
        });
        // Set the logs to response.data.data based on your API structure
        setLogs(response.data.data); // Append new logs to existing ones
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuditLogs();
  }, []);

  // 2. Secure Redirect Handler
  const handleViewOnGithub = (log) => {
    try {
      // Fallback to 'praveenbesetti' if log.owner is missing
      const owner = log.owner || "praveenbesetti";
      const repo = log.repoName;
      const hash = log.commitHash;

      if (!repo || !hash) {
        console.error("Missing repo or hash for redirect");
        return;
      }

      const githubUrl = `https://github.com/${owner}/${repo}/commit/${hash}`;

      // Open in new tab
      window.open(githubUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error("Error redirecting to GitHub:", error);
    }
  };

  if (loading) return <div className="text-center p-10 text-slate-400">Loading security feed...</div>;

  if (logs.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
        <GitCommit className="h-8 w-8 text-slate-500 mb-4" />
        <h3 className="text-lg font-semibold text-slate-200">No Audit Activity Yet</h3>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Live Security Feed
          </h2>
          <p className="mt-1 text-sm text-slate-400">Real-time audit results</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock className="h-4 w-4" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Timeline Feed */}
      <motion.div initial="hidden" animate="visible" className="relative ml-4 space-y-8 border-l-2 border-slate-800/50">
        {logs.map((log) => {
          const config = statusConfig[log.status] || statusConfig.PASSED;
          const StatusIcon = config.icon;

          return (
            <motion.div key={log._id} className="relative pl-8">
              <span className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-[#0a0e27] ${config.color} ${config.shadow} ${config.pulse ? 'animate-pulse' : ''}`} />

              <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md hover:border-blue-500/30">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1 flex flex-col items-start text-left">
                    {/* Row 1: Hash and Owner */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-blue-400">
                        #{log.commitHash.substring(0, 7)}
                      </span>
                      <span className="text-xs text-slate-600">•</span>
                      <span className="text-xs text-slate-500">@{log.owner || 'praveen'}</span>
                    </div>

                    {/* Row 2: Repo Name (Now directly below the hash) */}
                    <h3 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors">
                      {log.repoName}
                    </h3>

                    {/* Row 3: Filename */}
                    <p className="mt-0.5 text-xs font-mono text-slate-500">
                      {log.filename}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.bgColor} ${config.textColor} ring-1 ring-inset ${config.borderColor}`}>
                    <StatusIcon className="h-3 w-3" />
                    {config.label}
                  </div>
                </div>

                {/* Summary Snippet */}
                <div className="mb-4 rounded-lg bg-black/20 p-3 border border-white/5">
                  <p className="line-clamp-2 text-sm italic text-slate-400">
                    {log.summary?.substring(0, 150)}...
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedAudit(log)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${config.bgColor} ${config.textColor} border ${config.borderColor} hover:bg-blue-600 hover:text-white`}
                    >
                      <FileText className="h-3 w-3" /> Full Report
                    </button>
                    <button
                      onClick={() => handleViewOnGithub(log)}
                      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700"
                    >
                      <ExternalLink className="h-3 w-3" /> GitHub
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-500">{new Date(log.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* --- Full Report Modal --- */}
      <AnimatePresence>
        {selectedAudit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Audit Analysis: <span className="text-blue-400">{selectedAudit.filename}</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">{selectedAudit.commitHash}</p>
                </div>
                <button onClick={() => setSelectedAudit(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                {/* Findings Section */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Security Findings</h4>
                  <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedAudit.summary}
                  </div>
                </div>

                {/* Code Fix Section */}
                {selectedAudit.suggestedFix && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3">Recommended Fix (Diff)</h4>
                    <div className="rounded-xl bg-black/50 border border-emerald-500/20 overflow-hidden">
                      <pre className="p-4 text-xs font-mono leading-6 text-emerald-300 overflow-x-auto whitespace-pre">
                        {selectedAudit.suggestedFix}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}