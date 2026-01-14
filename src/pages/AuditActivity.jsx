import React, { memo } from 'react';
import { Header } from '../components/Header';
import { AuditTimeline, AuditLog } from '../components/AuditTimeline';
import { Activity, TrendingDown, TrendingUp, Shield } from 'lucide-react';
const MOCK_AUDIT_LOGS = [{
  id: '1',
  commitHash: 'a3f5d8c',
  commitMessage: 'feat: update authentication logic',
  repoName: 'auditflow-core',
  author: 'Pavanvarma-dev',
  status: 'REJECTED',
  details: 'Critical security vulnerability detected: Hardcoded API key found in auth.ts line 42. This exposes sensitive credentials and must be moved to environment variables immediately.',
  language: 'TypeScript',
  createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 min ago
}, {
  id: '2',
  commitHash: 'b7e2c91',
  commitMessage: 'fix: resolve memory leak in webhook handler',
  repoName: 'security-rules-engine',
  author: 'sarah-chen',
  status: 'PASSED',
  details: 'All security checks passed. Code follows best practices with proper error handling, input validation, and no detected vulnerabilities.',
  language: 'Rust',
  createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString() // 45 min ago
}, {
  id: '3',
  commitHash: 'c9d4a12',
  commitMessage: 'refactor: optimize database queries',
  repoName: 'frontend-dashboard',
  author: 'mike-johnson',
  status: 'WARNING',
  details: 'Potential N+1 query detected in UserList component. Consider implementing data loader pattern or GraphQL to reduce database round trips.',
  language: 'React',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
}, {
  id: '4',
  commitHash: 'e1f8b45',
  commitMessage: 'chore: update dependencies',
  repoName: 'docs-site',
  author: 'alex-martinez',
  status: 'PASSED',
  details: 'Dependency audit completed successfully. All packages are up-to-date with no known security vulnerabilities.',
  language: 'Markdown',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() // 4 hours ago
}, {
  id: '5',
  commitHash: 'f2a9c67',
  commitMessage: 'feat: add rate limiting middleware',
  repoName: 'legacy-api-service',
  author: 'david-kim',
  status: 'WARNING',
  details: 'Rate limiting implementation looks good, but missing Redis configuration for distributed systems. Current in-memory approach will not scale across multiple instances.',
  language: 'Node.js',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString() // 6 hours ago
}, {
  id: '6',
  commitHash: 'g3b1d89',
  commitMessage: 'security: implement CSRF protection',
  repoName: 'payment-gateway-integration',
  author: 'emily-wong',
  status: 'PASSED',
  details: 'Excellent security implementation. CSRF tokens properly generated and validated. Double-submit cookie pattern correctly implemented.',
  language: 'Go',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() // 8 hours ago
}];
export function AuditActivity() {
  const totalAudits = MOCK_AUDIT_LOGS.length;
  const passedAudits = MOCK_AUDIT_LOGS.filter(log => log.status === 'PASSED').length;
  const failedAudits = MOCK_AUDIT_LOGS.filter(log => log.status === 'REJECTED').length;
  const warningAudits = MOCK_AUDIT_LOGS.filter(log => log.status === 'WARNING').length;
  const passRate = Math.round(passedAudits / totalAudits * 100);
  return <div className="min-h-screen w-full bg-[#0a0e27] text-slate-200 selection:bg-blue-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      <Header />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-400">
                Total Audits
              </span>
              <Activity className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white">{totalAudits}</p>
            <p className="mt-1 text-xs text-slate-500">Last 24 hours</p>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-emerald-400">
                Passed
              </span>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-emerald-400">
              {passedAudits}
            </p>
            <p className="mt-1 text-xs text-emerald-400/60">
              {passRate}% pass rate
            </p>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-red-400">Failed</span>
              <TrendingDown className="h-4 w-4 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-400">{failedAudits}</p>
            <p className="mt-1 text-xs text-red-400/60">Needs attention</p>
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-yellow-400">
                Warnings
              </span>
              <Shield className="h-4 w-4 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-yellow-400">
              {warningAudits}
            </p>
            <p className="mt-1 text-xs text-yellow-400/60">Review suggested</p>
          </div>
        </div>

        {/* Timeline */}
        <AuditTimeline logs={MOCK_AUDIT_LOGS} />
      </main>
    </div>;
}