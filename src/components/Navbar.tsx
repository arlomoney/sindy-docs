'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Home, Code, Terminal, Rocket, FileCode, Users, Zap } from 'lucide-react';

interface NavbarProps {
  currentPage?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home' }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Navigation items for different implementation pages
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'pysindy', label: 'PySINDy', icon: Code, href: '/pysindy' },
    { id: 'ensemble', label: 'Ensemble SINDy', icon: Terminal, href: '/ensemble' },
    { id: 'weak', label: 'Weak SINDy', icon: Rocket, href: '/weak' },
    { id: 'research', label: 'Research', icon: FileCode, href: '/research' },
    { id: 'engineers', label: 'For Engineers', icon: Users, href: '/engineers' },
  ];

  return (
    <nav className={`${sidebarCollapsed ? 'w-16' : 'w-64'} min-h-screen bg-white/50 backdrop-blur-sm border-r border-slate-200/50 sticky top-16 transition-all duration-300 ease-in-out relative font-['-apple-system','BlinkMacSystemFont','SF Pro Display','SF Pro Text','Helvetica Neue','Arial','sans-serif']`}>
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/80 hover:bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md text-slate-600 hover:text-slate-900"
        title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
      </button>

      <div className="p-4 pt-16">
        {/* Page Navigation */}
        <div className="space-y-1">
          {!sidebarCollapsed && (
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
              Implementations
            </h3>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === currentPage;
            return (
              <Link
                key={item.id}
                href={item.href}
className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-3 rounded-lg transition-all group relative ${
  isActive
    ? 'bg-slate-700 text-white font-medium shadow-sm'
    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none shadow-lg">
                    {item.label}
                  </div>
                )}
                {isActive && !sidebarCollapsed && (
                  <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;