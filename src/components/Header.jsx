import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header({ user, currentPage = 'Dashboard' }) {
  return (
    /* Changed 'sticky' to 'fixed' and added 'left-0' for stability */
    <header className="fixed top-0 left-0 z-[100] w-full border-b border-white/10 bg-[#0a0e27]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 text-white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            AuditFlow AI
          </span>
          <span className="hidden border-l border-white/15 pl-3 text-sm font-medium text-slate-300 sm:inline">
            {currentPage}
          </span>
        </div>

        <nav aria-label="Main navigation" className="hidden items-center gap-4 text-sm text-slate-300 md:flex">
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link to="/features" className="hover:text-white">Features</Link>
          <Link to="/pricing" className="hover:text-white">Pricing</Link>
          <Link to="/docs" className="hover:text-white">Docs</Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search repositories..."
              className="h-9 w-64 rounded-full border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            />
          </div>

          {/* Notifications */}
          <button className="relative rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors">
            <Bell className="h-5 w-5" />
            {/* Notification Dot */}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[#0a0e27]" />
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-200">{user?.username || 'Alex Chen'}</p>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">
                {user?.plan ? `${user.plan} Plan` : 'Pro Plan'}
              </p>
            </div>
            <div className="h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.username} className="h-full w-full object-cover" />
              ) : (
                <User className="h-5 w-5 text-slate-400" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}