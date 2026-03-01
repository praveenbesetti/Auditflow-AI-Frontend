import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Activity, CreditCard, Settings, Lock, AlertTriangle, XCircle, CheckCircle2, Check } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';
import axios from 'axios';
import { baseURL } from './api.js/BaseUrl';

export function RepoDrawer({ isOpen, onClose, repo, Branches }) {
  // --- State Management ---
  const [aiGuardEnabled, setAiGuardEnabled] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [webhookActive, setWebhookActive] = useState(false);

  // Sync state when drawer opens or repo changes
  useEffect(() => {
    if (repo && isOpen) {
      const activeState = !!repo.isAuditEnabled;
      setAiGuardEnabled(activeState);
      setWebhookActive(activeState);
      
      // Bind active branches from repo data if they exist, otherwise empty array
      setSelectedBranches(repo.selectedBranches || []);
    }
  }, [repo, isOpen]);

  if (!repo) return null;

  // --- Helper Functions ---
  const toggleBranch = (branchName) => {
    setSelectedBranches(prev => 
      prev.includes(branchName)
        ? prev.filter(b => b !== branchName)
        : [...prev, branchName]
    );
  };

  const handleSelectAll = () => {
    if (selectedBranches.length === Branches.length) {
      setSelectedBranches([]);
    } else {
      setSelectedBranches(Branches.map(b => b.name));
    }
  };

  const handleSubmit = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const res = await axios.post(`${baseURL}api/enable-audit`, {
        githubId: repo.githubId,
        repoId: repo.id,
        repoName: repo.name,
        owner: repo.owner,
        isAuditEnabled: aiGuardEnabled, 
        branches: selectedBranches, 
      });

      console.log("Success:", res.data);
      setWebhookActive(aiGuardEnabled);
      onClose(); 
    } catch (err) {
      console.error("Operation failed:", err);
      alert(`Action failed: ${err.response?.data?.error || "Server Error"}`);
      setAiGuardEnabled(repo.isAuditEnabled);
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Validation Logic ---
  const hasChanges = aiGuardEnabled !== repo.isAuditEnabled || 
                     JSON.stringify([...selectedBranches].sort()) !== JSON.stringify([...(repo.selectedBranches || [])].sort());

  const isButtonDisabled = 
    isProcessing || 
    (aiGuardEnabled && selectedBranches.length === 0) || 
    !hasChanges;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />

          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
            transition={{ type: 'spring', damping: 30, stiffness: 300 }} 
            className="fixed right-0 top-0 z-50 h-full w-full max-w-xl border-l border-white/10 bg-[#0a0e27]/95 shadow-2xl backdrop-blur-xl sm:w-[600px]"
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-500">Settings / {repo.name}</span>
                <h2 className="text-lg font-bold text-white">Audit Configuration</h2>
              </div>
              <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-white/5 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="h-[calc(100vh-64px)] overflow-y-auto p-6 pb-32 space-y-6 custom-scrollbar">
              
              {/* Status Header */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${webhookActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700/30 text-slate-400'}`}>
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">AI Guard</h3>
                      <p className="text-sm text-slate-400">{webhookActive ? 'Currently Monitoring' : 'Protection Paused'}</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={aiGuardEnabled} onChange={(val) => setAiGuardEnabled(val)} />
                </div>

                {/* Branch Selection Section - Only visible when toggle is ON */}
                {aiGuardEnabled && (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monitor Branches</h4>
                      <button 
                        onClick={handleSelectAll}
                        className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase"
                      >
                        {selectedBranches.length === Branches.length ? 'Deselect All' : 'Select All'}
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {Branches.map(branch => {
                        const isChecked = selectedBranches.includes(branch.name);
                        return (
                          <label key={branch.name} className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${isChecked ? 'border-blue-500/40 bg-blue-500/5' : 'border-white/5 bg-black/20 hover:bg-white/5'}`}>
                            <div className="flex items-center gap-3">
                              <div 
                                onClick={() => toggleBranch(branch.name)}
                                className={`h-5 w-5 rounded border flex items-center justify-center transition-all ${isChecked ? 'bg-blue-600 border-blue-600' : 'border-slate-600 bg-slate-800'}`}
                              >
                                {isChecked && <Check className="h-3 w-3 text-white stroke-[3px]" />}
                              </div>
                              <span className={`text-sm font-medium ${isChecked ? 'text-white' : 'text-slate-400'}`}>{branch.name}</span>
                            </div>
                            {branch.isDefault && <span className="text-[9px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20 font-bold">DEFAULT</span>}
                          </label>
                        );
                      })}
                    </div>
                    {selectedBranches.length === 0 && (
                      <p className="text-[11px] text-amber-500 flex items-center gap-1.5 px-1">
                        <AlertTriangle className="h-3.5 w-3.5" /> At least one branch must be selected.
                      </p>
                    )}
                  </div>
                )}

                {/* Deactivation Warning - Only visible when turning OFF an active repo */}
                {!aiGuardEnabled && repo.isAuditEnabled && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 animate-in shake-1">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-2">
                      <AlertTriangle className="h-4 w-4" /> WARNING
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Disabling protection will remove all GitHub webhooks for this repository. Automated security audits will stop immediately.
                    </p>
                  </div>
                )}
              </div>

              {/* Info Card */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-4 text-white font-semibold">
                  <CreditCard className="h-5 w-5 text-orange-400" />
                  Usage Estimation
                </div>
                <div className="space-y-3">
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '45%' }} />
                  </div>
                  <p className="text-[11px] text-slate-500 italic">Configuration changes take effect as soon as you hit submit.</p>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="pt-6 border-t border-white/10">
                <button
                  onClick={handleSubmit}
                  disabled={isButtonDisabled}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-bold transition-all duration-200
                    ${aiGuardEnabled ? 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20' : 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/20'} 
                    text-white disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed active:scale-[0.98]`}
                >
                  {isProcessing ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {aiGuardEnabled ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                      {aiGuardEnabled ? (repo.isAuditEnabled ? "Update Audit Settings" : "Confirm & Enable Protection") : "Confirm & Disable Protection"}
                    </>
                  )}
                </button>
                {!isButtonDisabled && !isProcessing && (
                   <p className="text-center text-[10px] text-blue-400/60 mt-4 uppercase tracking-widest font-bold">Unsaved Changes Detected</p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}