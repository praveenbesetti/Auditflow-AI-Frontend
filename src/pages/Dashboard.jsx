import React, { useState, Children, memo } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { RepoCard, Repo } from '../components/RepoCard';
import { EmptyState } from '../components/EmptyState';
import { RepoDrawer } from '../components/RepoDrawer';
import { AuditTimeline, AuditLog } from '../components/AuditTimeline';
import { Plus, Search, Filter, GitBranch, Activity } from 'lucide-react';
const MOCK_AUDIT_LOGS = [{
  id: '1',
  commitHash: 'a3f5d8c',
  commitMessage: 'feat: update authentication logic',
  repoName: 'auditflow-core',
  author: 'Pavanvarma-dev',
  status: 'REJECTED',
  details: 'Critical security vulnerability detected: Hardcoded API key found in auth.ts line 42. This exposes sensitive credentials and must be moved to environment variables immediately.',
  language: 'TypeScript',
  createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
}, {
  id: '2',
  commitHash: 'b7e2c91',
  commitMessage: 'fix: resolve memory leak in webhook handler',
  repoName: 'security-rules-engine',
  author: 'sarah-chen',
  status: 'PASSED',
  details: 'All security checks passed. Code follows best practices with proper error handling, input validation, and no detected vulnerabilities.',
  language: 'Rust',
  createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
}, {
  id: '3',
  commitHash: 'c9d4a12',
  commitMessage: 'refactor: optimize database queries',
  repoName: 'frontend-dashboard',
  author: 'mike-johnson',
  status: 'WARNING',
  details: 'Potential N+1 query detected in UserList component. Consider implementing data loader pattern or GraphQL to reduce database round trips.',
  language: 'React',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
}, {
  id: '4',
  commitHash: 'e1f8b45',
  commitMessage: 'chore: update dependencies',
  repoName: 'docs-site',
  author: 'alex-martinez',
  status: 'PASSED',
  details: 'Dependency audit completed successfully. All packages are up-to-date with no known security vulnerabilities.',
  language: 'Markdown',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
}, {
  id: '5',
  commitHash: 'f2a9c67',
  commitMessage: 'feat: add rate limiting middleware',
  repoName: 'legacy-api-service',
  author: 'david-kim',
  status: 'WARNING',
  details: 'Rate limiting implementation looks good, but missing Redis configuration for distributed systems. Current in-memory approach will not scale across multiple instances.',
  language: 'Node.js',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
}, {
  id: '6',
  commitHash: 'g3b1d89',
  commitMessage: 'security: implement CSRF protection',
  repoName: 'payment-gateway-integration',
  author: 'emily-wong',
  status: 'PASSED',
  details: 'Excellent security implementation. CSRF tokens properly generated and validated. Double-submit cookie pattern correctly implemented with secure, httpOnly flags.',
  language: 'Go',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
}, {
  id: '7',
  commitHash: 'h4c2e91',
  commitMessage: 'fix: patch SQL injection vulnerability',
  repoName: 'auditflow-core',
  author: 'james-rodriguez',
  status: 'REJECTED',
  details: 'SQL injection vulnerability still present in search query builder. Raw string concatenation detected on line 156. Must use parameterized queries or ORM to prevent injection attacks.',
  language: 'TypeScript',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString()
}, {
  id: '8',
  commitHash: 'i5d3f12',
  commitMessage: 'feat: add user input sanitization',
  repoName: 'frontend-dashboard',
  author: 'lisa-park',
  status: 'PASSED',
  details: 'Input sanitization properly implemented using DOMPurify. XSS attack vectors successfully mitigated. All user-generated content is escaped before rendering.',
  language: 'React',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
}, {
  id: '9',
  commitHash: 'j6e4g23',
  commitMessage: 'refactor: improve error handling',
  repoName: 'security-rules-engine',
  author: 'chris-taylor',
  status: 'WARNING',
  details: 'Error messages expose internal system details that could aid attackers. Consider implementing generic error responses for production while logging detailed errors server-side.',
  language: 'Rust',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString()
}, {
  id: '10',
  commitHash: 'k7f5h34',
  commitMessage: 'feat: implement JWT refresh token rotation',
  repoName: 'auditflow-core',
  author: 'Pavanvarma-dev',
  status: 'PASSED',
  details: 'Outstanding security implementation. JWT refresh token rotation properly configured with secure storage, automatic cleanup of expired tokens, and protection against replay attacks.',
  language: 'TypeScript',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString()
}, {
  id: '11',
  commitHash: 'l8g6i45',
  commitMessage: 'fix: remove console.log statements',
  repoName: 'payment-gateway-integration',
  author: 'rachel-kim',
  status: 'REJECTED',
  details: 'Sensitive payment data being logged to console in production code. Found console.log statements with credit card numbers and API keys on lines 78, 92, and 145. Remove immediately.',
  language: 'Go',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString()
}, {
  id: '12',
  commitHash: 'm9h7j56',
  commitMessage: 'docs: update security guidelines',
  repoName: 'docs-site',
  author: 'alex-martinez',
  status: 'PASSED',
  details: 'Documentation updates look great. Security best practices clearly outlined with code examples. No sensitive information exposed in documentation.',
  language: 'Markdown',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString()
}];
const MOCK_REPOS = [{
  id: '1',
  name: 'auditflow-core',
  isPrivate: true,
  description: 'Core logic for the automated audit engine including heuristic analysis and report generation modules.',
  canAdmin: true,
  isConnected: true,
  stars: 124,
  forks: 12,
  language: 'TypeScript'
}, {
  id: '2',
  name: 'frontend-dashboard',
  isPrivate: false,
  description: 'React-based dashboard for visualizing audit results and managing team permissions.',
  canAdmin: true,
  isConnected: false,
  stars: 89,
  forks: 24,
  language: 'React'
}, {
  id: '3',
  name: 'legacy-api-service',
  isPrivate: true,
  description: 'Deprecated REST API service. Maintained for backward compatibility with v1 clients.',
  canAdmin: false,
  isConnected: false,
  stars: 12,
  forks: 2,
  language: 'Node.js'
}, {
  id: '4',
  name: 'security-rules-engine',
  isPrivate: true,
  description: 'Customizable rule engine for defining security policies and compliance checks.',
  canAdmin: true,
  isConnected: true,
  stars: 256,
  forks: 45,
  language: 'Rust'
}, {
  id: '5',
  name: 'docs-site',
  isPrivate: false,
  description: 'Public documentation site built with Docusaurus. Contains user guides and API references.',
  canAdmin: true,
  isConnected: false,
  stars: 340,
  forks: 89,
  language: 'Markdown'
}, {
  id: '6',
  name: 'payment-gateway-integration',
  isPrivate: true,
  description: 'Secure handling of Stripe webhooks and subscription management logic.',
  canAdmin: false,
  isConnected: false,
  stars: 5,
  forks: 0,
  language: 'Go'
}];
const container = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};
export function Dashboard() {
  const [activeTab, setActiveTab] = useState('repos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepo, setSelectedRepo] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const filteredRepos = MOCK_REPOS.filter(repo => repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    // Small delay to clear selection after animation
    setTimeout(() => setSelectedRepo(null), 300);
  };
  return <div className="min-h-screen w-full bg-[#0a0e27] text-slate-200 selection:bg-blue-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      <Header />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
            <button onClick={() => setActiveTab('repos')} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeTab === 'repos' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200'}`}>
              <GitBranch className="h-4 w-4" />
              Repositories
            </button>
            <button onClick={() => setActiveTab('activity')} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeTab === 'activity' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200'}`}>
              <Activity className="h-4 w-4" />
              Audit Activity
            </button>
          </div>
          {activeTab === 'repos' && <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-95">
              <Plus className="h-4 w-4" />
              Add Repository
            </button>}
        </div>{' '}
        {activeTab === 'repos' ? <>
            {/* Search and Filter Bar */}
            <div className="mb-8 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Filter repositories..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="h-10 w-full rounded-lg bg-transparent pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-0" />
              </div>
              <div className="h-6 w-px bg-white/10" />
              <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>

            {filteredRepos.length > 0 ? <motion.div variants={container} initial="hidden" animate="visible" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRepos.map(repo => <RepoCard key={repo.id} repo={repo} onClick={handleRepoClick} />)}
              </motion.div> : <EmptyState />}
          </> : <AuditTimeline logs={MOCK_AUDIT_LOGS} />}
      </main>

      <RepoDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} repo={selectedRepo} />
    </div>;
}