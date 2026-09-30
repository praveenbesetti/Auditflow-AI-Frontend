import React, { useState, Children, memo } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { RepoCard, Repo } from '../components/RepoCard';
import { EmptyState } from '../components/EmptyState';
import { RepoDrawer } from '../components/RepoDrawer';
import { AuditTimeline, AuditLog } from '../components/AuditTimeline';
import { Plus, Search, Filter, GitBranch, Activity, X, CreditCard, Check, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../components/api.js/BaseUrl';
import { AnimatePresence } from 'framer-motion';


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
  const [historyRepoId, setHistoryRepoId] = useState('');
  const [repos, setRepos] = useState([]);
  const [Branches, setBranches] = useState([]);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [orgAmount, setOrgAmount] = useState(200);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const filteredRepos = repos.filter(repo => repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || repo.description.toLowerCase().includes(searchQuery.toLowerCase()));

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (plan, depositAmount = 0) => {
    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Razorpay SDK failed to load. Please check your internet connection.");
        return;
      }

      // 1. Create order on backend
      const orderRes = await axios.post(`${baseURL}api/billing/create-order`, {
        plan,
        depositAmount
      });

      const { id: order_id, amount, currency } = orderRes.data;

      // 2. Open Razorpay Checkout modal
      const options = {
        key: "rzp_test_Ov23liKTf5qTi16", // testing key
        amount,
        currency,
        name: "AuditFlow AI",
        description: `Upgrade to ${plan === 'org' ? 'Organization' : plan} plan`,
        order_id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyRes = await axios.post(`${baseURL}api/billing/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan,
              depositAmount
            });

            if (verifyRes.data.success) {
              alert(`Payment successful! Plan upgraded to ${plan}.`);
              setIsPricingOpen(false);
              window.location.reload();
            }
          } catch (err) {
            console.error("Payment verification failed", err);
            alert("Verification failed: " + (err.response?.data?.error || err.message));
          }
        },
        prefill: {
          name: user?.username || "",
          email: user?.email || ""
        },
        theme: {
          color: "#2563eb"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment failed to start:", error);
      alert("Payment initiation failed: " + (error.response?.data?.error || error.message));
    }
  };

  const handleRepoClick = async (repo) => {
    setSelectedRepo(repo);
    const respo= await axios.get(`${baseURL}api/repo-branches/${repo.githubId}/${repo.owner}/${repo.name}`)
    setBranches(respo.data?.branches);
    console.log("Branches for selected repo:", respo.data);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        const authRes = await axios.get(`${baseURL}api/check-auth`);
        if (authRes.data && authRes.data.authenticated) {
          const loggedInUser = authRes.data.user;
          
          // Re-fetch full user object details to get billing info (plan, balance, linesReviewed)
          const profileRes = await axios.get(`${baseURL}api/user-repos/${loggedInUser.githubId}`);
          // The repos response returns repo data, but the user profile is also verified.
          // Wait, user is decoded. Let's fetch repositories and profile.
          setRepos(profileRes.data);
          
          // Set user using decoded user profile from check-auth
          // In routes/auth.js we encoded plan, username, avatar. Let's query details:
          // Wait! In order to get balance/linesReviewed, we need to query user from DB.
          // Let's call /api/check-auth which returns authenticated: true, user: { githubId, username, avatar, plan }
          // We can fetch user metadata from repositories or add an endpoint /api/auth/me or use check-auth.
          // Wait! We can retrieve user info by fetching it from the DB. 
          // Let's fetch /api/user-repos which returns repos, but we can also fetch user profile if we want.
          // Actually, let's look at getMe in verification.js or make sure we decode metadata.
          // Since check-auth returns `user` signed in JWT, let's fetch user info if we want, 
          // or we can make check-auth fetch and return the updated user directly from the DB!
          // Wait, let's check check-auth implementation:
          // In routes/auth.js Authantication:
          // res.json({ authenticated: true, user: decoded });
          // But decoded is a JWT token which is static until re-generated.
          // Let's modify Authantication in routes/auth.js to read the user from DB every time!
          // That is extremely dynamic and automatically updates plans/balances in the frontend!
          // We will update Authantication to:
          // const userResult = await pool.query('SELECT * FROM users WHERE github_id = $1', [decoded.githubId]);
          // res.json({ authenticated: true, user: mapUser(userResult.rows[0]) });
          // If we do that, user in check-auth will ALWAYS be the fresh, updated DB profile!
          // Then in Dashboard, loggedInUser is the full mapped user object!
          setUser(authRes.data.user);
        } else {
          window.location.href = "/";
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    };
    checkAuthAndFetch();
  }, []);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedRepo(null), 300);
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#0a0e27] text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-400">Verifying session...</p>
        </div>
      </div>
    );
  }
 
 return (
    /* 1. ROOT: Full screen, no scroll on body */
    <div className="h-screen w-full bg-[#0a0e27] text-slate-200 flex flex-col overflow-hidden">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[100px]" />
      </div>

      {/* 2. HEADER: Fixed to top, z-index 100 to stay above everything */}
      <div className="fixed top-0 left-0 w-full z-[100]">
        <Header user={user} currentPage="Dashboard" />
      </div>

      {/* 3. MAIN CONTENT: 
          - pt-20: This pushes your content down so it doesn't hide under the header.
          - flex-1 + overflow-y-auto: This makes ONLY the body scroll.
      */}
      <main className="flex-1 overflow-y-auto relative z-10 custom-scrollbar pt-20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          
          {/* Active Subscription Status Bar */}
          <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <span className="text-xs text-slate-400">Current Plan:</span>
                <span className="ml-1.5 text-sm font-bold text-white uppercase tracking-wider">
                  {user?.plan || 'Free'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {user?.plan === 'org' ? (
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-xs text-slate-400">Credits Balance:</span>
                    <span className="ml-1.5 text-sm font-bold text-emerald-400">
                      {user?.balance !== undefined ? `${parseFloat(user.balance).toFixed(2)} INR` : '0.00 INR'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Total Code Lines Reviewed:</span>
                    <span className="ml-1.5 text-sm font-mono font-bold text-slate-200">
                      {user?.linesReviewed || 0} lines
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-xs text-slate-400">Audits Performed:</span>
                  <span className="ml-1.5 text-sm font-bold text-blue-400">
                    {user?.auditCount || 0} / {user?.plan === 'pro' ? 50 : user?.plan === 'pro_ultra' ? 200 : 5}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Tab Navigation (This will now be fully visible below header) */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
              <button 
                onClick={() => setActiveTab('repos')} 
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === 'repos' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GitBranch className="h-4 w-4" />
                Repositories
              </button>
              <button 
                onClick={() => setActiveTab('activity')} 
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === 'activity' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="h-4 w-4" />
                Audit Activity
              </button>
            </div>
            
            {activeTab === 'repos' && (
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsPricingOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 hover:from-amber-400 hover:to-orange-400 transition-all active:scale-95"
                >
                  <CreditCard className="h-4 w-4" />
                  Upgrade Subscription
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95">
                  <Plus className="h-4 w-4" />
                  Add Repository
                </button>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'repos' ? (
              <motion.div
                key="repos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Search / Filter Bar */}
                <div className="mb-8 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Filter repositories..."
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      className="h-10 w-full rounded-lg bg-transparent pl-10 pr-4 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div className="h-6 w-px bg-white/10" />
                  <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                    <Filter className="h-4 w-4" />
                    Filters
                  </button>
                </div>

                {filteredRepos.length > 0 ? (
                  <motion.div variants={container} initial="hidden" animate="visible" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredRepos.map(repo => <RepoCard key={repo.id} repo={repo} onClick={handleRepoClick} />)}
                  </motion.div>
                ) : <EmptyState />}
              </motion.div>
            
            ) : (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AuditTimeline
                  repos={repos}
                  repoId={historyRepoId}
                  onRepoChange={setHistoryRepoId}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
       <RepoDrawer
         isOpen={isDrawerOpen}
         onClose={handleCloseDrawer}
         repo={selectedRepo}
         Branches={Branches}
         onSaved={(isAuditEnabled, branches) => {
           setRepos(current => current.map(repo => repo.id === selectedRepo?.id
             ? { ...repo, isAuditEnabled, selectedBranches: branches }
             : repo));
         }}
       />
       
       {/* Pricing Modal */}
      <AnimatePresence>
        {isPricingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0f172a] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
                <div>
                  <h2 className="text-xl font-bold text-white">Upgrade Subscription Plan</h2>
                  <p className="text-xs text-slate-400 mt-1">Unlock automated AI-driven security code audits</p>
                </div>
                <button onClick={() => setIsPricingOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                
                {/* Free Plan */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">Free Plan</h3>
                    <p className="text-2xl font-extrabold text-white mt-3">0 INR</p>
                    <p className="text-[11px] text-slate-400 mt-1">Life-time access</p>
                    <ul className="mt-4 space-y-2 text-xs text-slate-300">
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-blue-500 stroke-[3px]" /> 5 pushes total
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-blue-500 stroke-[3px]" /> Security alerts
                      </li>
                    </ul>
                  </div>
                  <button disabled className="mt-6 w-full rounded-lg bg-white/5 py-2.5 text-xs font-bold text-slate-400 cursor-not-allowed">
                    {user?.plan === 'free' || !user?.plan ? 'Current Plan' : 'Free Tier'}
                  </button>
                </div>

                {/* Pro Plan */}
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-bold text-slate-100">Pro Plan</h3>
                      <span className="text-[9px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20 font-bold">POPULAR</span>
                    </div>
                    <p className="text-2xl font-extrabold text-white mt-3">499 INR</p>
                    <p className="text-[11px] text-slate-400 mt-1">Per month</p>
                    <ul className="mt-4 space-y-2 text-xs text-slate-300">
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-blue-500 stroke-[3px]" /> 50 audits / month
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-blue-500 stroke-[3px]" /> Auto-Fix patches
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-blue-500 stroke-[3px]" /> Universal parsing
                      </li>
                    </ul>
                  </div>
                  <button
                    disabled
                    onClick={() => handlePayment('pro')}
                    className="mt-6 w-full cursor-not-allowed rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-bold text-slate-500"
                  >
                    Coming soon
                  </button>
                </div>

                {/* Pro Ultra Plan */}
                <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">Pro Ultra</h3>
                    <p className="text-2xl font-extrabold text-white mt-3">999 INR</p>
                    <p className="text-[11px] text-slate-400 mt-1">Per month</p>
                    <ul className="mt-4 space-y-2 text-xs text-slate-300">
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-blue-500 stroke-[3px]" /> 200 audits / month
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-blue-500 stroke-[3px]" /> Auto-Fix patches
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-blue-500 stroke-[3px]" /> Real-time feedback
                      </li>
                    </ul>
                  </div>
                  <button
                    disabled
                    onClick={() => handlePayment('pro_ultra')}
                    className="mt-6 w-full cursor-not-allowed rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-bold text-slate-500"
                  >
                    Coming soon
                  </button>
                </div>

                {/* Organization Pay-as-you-go Plan */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">Organization</h3>
                    <p className="text-2xl font-extrabold text-white mt-3">Pay-as-you-go</p>
                    <p className="text-[11px] text-slate-400 mt-1">2 INR per 500 lines</p>
                    <ul className="mt-4 space-y-2 text-xs text-slate-300">
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-blue-500 stroke-[3px]" /> Unlimited repos
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-blue-500 stroke-[3px]" /> Charged by additions
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-blue-500 stroke-[3px]" /> Multi-user support
                      </li>
                    </ul>
                    <div className="mt-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Deposit Amount (INR)</label>
                      <input 
                        type="number"
                        disabled
                        min="100" 
                        value={orgAmount} 
                        onChange={(e) => setOrgAmount(parseInt(e.target.value) || 0)} 
                        className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    disabled
                    onClick={() => handlePayment('org', orgAmount)}
                    className="mt-6 w-full cursor-not-allowed rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-bold text-slate-500"
                  >
                    Coming soon
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
     </div>
  );
}

