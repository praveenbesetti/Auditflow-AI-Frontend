import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  ['Connect GitHub', 'Choose Connect to GitHub and approve the requested repository permissions. AuditFlow stores the OAuth token encrypted and uses it to list repositories and post commit comments.'],
  ['Choose a repository', 'Open the dashboard and select a repository. Active repository cards show the branches already being monitored with check marks.'],
  ['Select branches', 'In repository settings, check one or more branches and enable auditing. Only pushes to selected branches are queued for review.'],
  ['Push a change', 'After GitHub delivers a signed push webhook, the backend queues the commit in BullMQ. The worker fetches the compare diff, reviews supported code changes, and comments on the commit.'],
  ['Review history', 'Open Audit Activity to see results across repositories, or choose a repository filter to inspect just that repository. Select a finding to see its report and suggested fix.']
];

export function DocumentationPage() {
  return (
    <main className="min-h-screen bg-[#f4f7f5] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link to="/" className="font-semibold tracking-wide">AuditFlow AI</Link>
          <nav className="flex items-center gap-5 text-sm text-slate-600">
            <Link to="/dashboard" className="hover:text-slate-950">Dashboard</Link>
            <Link to="/features" className="hover:text-slate-950">Features</Link>
            <Link to="/pricing" className="hover:text-slate-950">Pricing</Link>
            <Link to="/docs" className="font-semibold text-slate-950">Docs</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 md:grid-cols-[220px_minmax(0,760px)] md:py-16">
        <aside className="md:sticky md:top-8 md:self-start">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">Documentation</p>
          <nav className="mt-5 flex gap-4 overflow-x-auto text-sm md:flex-col">
            <a className="whitespace-nowrap text-slate-600 hover:text-slate-950" href="#quick-start">Quick start</a>
            <a className="whitespace-nowrap text-slate-600 hover:text-slate-950" href="#branch-selection">Branch selection</a>
            <a className="whitespace-nowrap text-slate-600 hover:text-slate-950" href="#push-reviews">Push reviews</a>
            <a className="whitespace-nowrap text-slate-600 hover:text-slate-950" href="#history">Audit history</a>
            <a className="whitespace-nowrap text-slate-600 hover:text-slate-950" href="#plans">Plans</a>
          </nav>
        </aside>

        <article className="min-w-0">
          <p className="text-sm font-semibold text-emerald-800">Guide</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">Getting started</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Connect a GitHub account, choose the repository branches to monitor, and inspect audit results from the dashboard.</p>

          <section id="quick-start" className="scroll-mt-8 border-t border-slate-300 py-10">
            <h2 className="text-2xl font-semibold">Quick start</h2>
            <ol className="mt-6 space-y-6">
              {steps.map(([title, description], index) => (
                <li key={title} className="grid grid-cols-[36px_1fr] gap-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-900 text-sm font-semibold text-white">{index + 1}</span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 leading-7 text-slate-600">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="branch-selection" className="scroll-mt-8 border-t border-slate-300 py-10">
            <h2 className="text-2xl font-semibold">Branch selection</h2>
            <p className="mt-3 leading-7 text-slate-600">Branch check marks on repository cards show the saved monitoring configuration. Open the repository to change it. An enabled repository must have at least one branch selected; unselected branches are ignored even when they belong to the same repository.</p>
          </section>

          <section id="push-reviews" className="scroll-mt-8 border-t border-slate-300 py-10">
            <h2 className="text-2xl font-semibold">What happens after a push</h2>
            <p className="mt-3 leading-7 text-slate-600">GitHub sends a signed push webhook. The backend checks the repository and branch configuration, responds promptly, then queues eligible work with BullMQ and Redis. The worker reviews the commit diff and posts its result as a commit comment. Unsupported file types and files without diff patches are skipped.</p>
          </section>

          <section id="history" className="scroll-mt-8 border-t border-slate-300 py-10">
            <h2 className="text-2xl font-semibold">Audit history and privacy</h2>
            <p className="mt-3 leading-7 text-slate-600">History is stored in PostgreSQL and scoped to the authenticated account. Audit records keep commit and file references, findings, and suggested fixes; source files are fetched from GitHub when a report is opened rather than copied into the database.</p>
          </section>

          <section id="plans" className="scroll-mt-8 border-t border-slate-300 py-10">
            <h2 className="text-2xl font-semibold">Plans</h2>
            <p className="mt-3 leading-7 text-slate-600">The Free plan includes five pushes total. Pro, Pro Ultra, and Organization pricing is displayed for reference but checkout is currently disabled.</p>
            <Link to="/pricing" className="mt-5 inline-flex rounded-lg bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">See plan details</Link>
          </section>
        </article>
      </div>
    </main>
  );
}