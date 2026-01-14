import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Activity, CreditCard, Settings, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Repo } from './RepoCard';
import { ToggleSwitch } from './ToggleSwitch';

export function RepoDrawer({isOpen,onClose,repo}) {
  const [aiGuardEnabled, setAiGuardEnabled] = useState(false);
  const [webhookActive, setWebhookActive] = useState(false);
  const [auditChecks, setAuditChecks] = useState({
    secrets: true,
    logic: true,
    performance: false,
    vulnerabilities: true
  });
  // Reset state when repo changes
  useEffect(() => {
    if (repo) {
      setAiGuardEnabled(repo.isConnected);
      setWebhookActive(repo.isConnected);
    }
  }, [repo]);
  if (!repo) return null;
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />

          {/* Drawer */}
          <motion.div initial={{
        x: '100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '100%'
      }} transition={{
        type: 'spring',
        damping: 30,
        stiffness: 300
      }} className="fixed right-0 top-0 z-50 h-full w-full max-w-xl border-l border-white/10 bg-[#0a0e27]/95 shadow-2xl backdrop-blur-xl sm:w-[600px]">
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-500">
                  Projects / {repo.name}
                </span>
                <h2 className="text-lg font-bold text-white">
                  Repository Settings
                </h2>
              </div>
              <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="h-[calc(100vh-64px)] overflow-y-auto p-6 space-y-6">
              {/* 1. Connection Status Card */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${aiGuardEnabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700/30 text-slate-400'}`}>
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        AI Security Status
                      </h3>
                      <p className="text-sm text-slate-400">
                        Master control for AI auditing
                      </p>
                    </div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${aiGuardEnabled ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-700/30 text-slate-400 border-slate-600/30'}`}>
                    {aiGuardEnabled ? 'Active' : 'Inactive'}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-black/20 rounded-lg p-4 border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-200">
                      Enable AI Guard
                    </span>
                    {!repo.canAdmin && <span className="flex items-center gap-1.5 text-xs text-amber-400 mt-1">
                        <Lock className="h-3 w-3" /> Requires Admin Access
                      </span>}
                  </div>
                  <ToggleSwitch checked={aiGuardEnabled} onChange={val => {
                setAiGuardEnabled(val);
                setWebhookActive(val);
              }} disabled={!repo.canAdmin} />
                </div>
              </div>

              {/* 2. Webhook Configuration */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Activity className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    Webhook Configuration
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <div className="pr-8">
                    <p className="text-sm text-slate-300 mb-1">
                      Real-time Monitoring
                    </p>
                    <p className="text-xs text-slate-500">
                      Automatically triggers audits on pull requests and commits
                      via GitHub Webhooks.
                    </p>
                  </div>
                  <ToggleSwitch checked={webhookActive} onChange={setWebhookActive} disabled={!repo.canAdmin || !aiGuardEnabled} />
                </div>
              </div>

              {/* 3. Audit Parameters */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Settings className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    Audit Parameters
                  </h3>
                </div>

                <div className="space-y-3">
                  {[{
                id: 'secrets',
                label: 'Check for Secrets & Keys',
                desc: 'Detects API keys, tokens, and passwords'
              }, {
                id: 'logic',
                label: 'Logic Flaws',
                desc: 'Identifies race conditions and logical errors'
              }, {
                id: 'performance',
                label: 'Performance Issues',
                desc: 'Flags N+1 queries and memory leaks'
              }, {
                id: 'vulnerabilities',
                label: 'Security Vulnerabilities',
                desc: 'Checks for XSS, SQLi, and CVEs'
              }].map(check => <label key={check.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                      <div className="relative flex items-center mt-0.5">
                        <input type="checkbox" checked={auditChecks[check.id]} onChange={e => setAuditChecks(prev => ({
                    ...prev,
                    [check.id]: e.target.checked
                  }))} className="peer h-5 w-5 appearance-none rounded border border-slate-600 bg-slate-800 checked:border-blue-500 checked:bg-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0" />
                        <CheckCircle2 className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 top-0.5" />
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                          {check.label}
                        </span>
                        <span className="block text-xs text-slate-500">
                          {check.desc}
                        </span>
                      </div>
                    </label>)}
                </div>
              </div>

              {/* 4. Usage & Billing */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      Credit Usage
                    </h3>
                  </div>
                  <button className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    Upgrade Plan
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">
                      45 / 100 credits used
                    </span>
                    <span className="text-slate-500">45%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <motion.div initial={{
                  width: 0
                }} animate={{
                  width: '45%'
                }} transition={{
                  duration: 1,
                  ease: 'easeOut'
                }} className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                  </div>
                  <p className="text-xs text-slate-500 pt-1">
                    Credits reset on Jan 1, 2024. This repository consumes
                    approx. 5 credits/week.
                  </p>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <button className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors opacity-80 hover:opacity-100">
                  <AlertTriangle className="h-4 w-4" />
                  Remove Repository
                </button>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}