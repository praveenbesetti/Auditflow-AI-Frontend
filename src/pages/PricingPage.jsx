import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_URL } from '../components/api.js/configUrls';

const plans = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    quota: '5 pushes total',
    details: 'Connect a GitHub repository, choose monitored branches, and inspect audit history.',
    available: true
  },
  {
    name: 'Pro',
    price: 'INR 499',
    cadence: 'per month',
    quota: '50 pushes per month',
    details: 'More review capacity for an individual developer.',
    available: false
  },
  {
    name: 'Pro Ultra',
    price: 'INR 999',
    cadence: 'per month',
    quota: '200 pushes per month',
    details: 'Higher review capacity and priority audit history.',
    available: false
  },
  {
    name: 'Organization',
    price: 'Usage based',
    cadence: 'for teams',
    quota: 'Team plan',
    details: 'Centralized repository monitoring and team usage controls.',
    available: false
  }
];

export function PricingPage() {
  return (
    <main className="min-h-screen bg-[#07110f] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link to="/" className="font-semibold tracking-wide">AuditFlow AI</Link>
          <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm text-slate-300">
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
            <Link to="/features" className="hover:text-white">Features</Link>
            <Link to="/pricing" className="text-white">Pricing</Link>
            <Link to="/docs" className="hover:text-white">Docs</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">Plans</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl font-medium leading-tight sm:text-6xl">Five pushes to get started.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">Use the free plan now. Paid plans are listed for reference and will be enabled later.</p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <article key={plan.name} className={`flex flex-col rounded-lg border p-6 ${plan.available ? 'border-emerald-300/40 bg-emerald-300/[0.06]' : 'border-white/10 bg-white/[0.03]'}`}>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{plan.name}</h2>
                {!plan.available && <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Unavailable</span>}
              </div>
              <p className="mt-7 text-3xl font-bold">{plan.price}</p>
              <p className="mt-1 text-sm text-slate-400">{plan.cadence}</p>
              <p className="mt-5 text-sm font-semibold text-emerald-200">{plan.quota}</p>
              <p className="mt-3 min-h-20 text-sm leading-6 text-slate-400">{plan.details}</p>
              {plan.available ? (
                <a href={LOGIN_URL} className="mt-8 rounded-md bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-emerald-300">Connect GitHub</a>
              ) : (
                <button type="button" disabled className="mt-8 cursor-not-allowed rounded-md border border-white/10 px-4 py-3 text-sm font-semibold text-slate-500">Coming soon</button>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}