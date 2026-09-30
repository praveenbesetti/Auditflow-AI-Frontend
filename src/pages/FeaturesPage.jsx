import React from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, History, MessageSquareText, ScanSearch, ShieldCheck, Workflow } from 'lucide-react';

const features = [
  {
    icon: GitBranch,
    title: 'Branch-level monitoring',
    description: 'Choose exactly which repository branches trigger a review. Saved selections stay visible on the repository card.'
  },
  {
    icon: ScanSearch,
    title: 'Diff-focused analysis',
    description: 'Review changed code from each push instead of sending entire repositories for analysis.'
  },
  {
    icon: MessageSquareText,
    title: 'Commit feedback',
    description: 'Audit findings and suggested changes are posted as comments on the relevant Git commit.'
  },
  {
    icon: History,
    title: 'Repository audit history',
    description: 'Filter stored results by repository and inspect the finding, commit, branch, and suggested fix.'
  },
  {
    icon: Workflow,
    title: 'Background processing',
    description: 'Webhook requests are acknowledged quickly, then BullMQ processes review jobs through Redis.'
  },
  {
    icon: ShieldCheck,
    title: 'Scoped account access',
    description: 'Repository settings and audit history are tied to the authenticated GitHub account.'
  }
];

export function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <header className="fixed top-0 z-30 w-full border-b border-white/10 bg-[#020617]/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link to="/" className="font-semibold tracking-wide">AuditFlow AI</Link>
          <nav className="flex items-center gap-5 text-sm text-slate-300">
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
            <Link to="/features" className="text-white">Features</Link>
            <Link to="/pricing" className="hover:text-white">Pricing</Link>
            <Link to="/docs" className="hover:text-white">Docs</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-32">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">Product</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl font-medium leading-tight sm:text-6xl">Review the change, follow the result.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">AuditFlow connects GitHub pushes to focused code reviews, commit feedback, and repository-specific history.</p>

        <div className="mt-16 grid gap-x-12 gap-y-12 border-t border-white/10 pt-10 md:grid-cols-2 xl:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className="border-b border-white/10 pb-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
              </div>
              <h2 className="mt-5 text-xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-slate-400">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4 text-sm">
          <Link to="/docs" className="rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-100">Read the docs</Link>
          <Link to="/pricing" className="rounded-lg border border-white/15 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">View plans</Link>
        </div>
      </section>
    </main>
  );
}