'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, ChevronLeft, Home, Code, Terminal, Rocket, FileCode, Users, Zap, Hash, ChevronDown, ChevronRight, Shield, Settings } from 'lucide-react';

interface SectionItem {
  id: string;
  label: string;
  href: string;
}

interface NavbarProps {
  currentPage?: string;
  sections?: SectionItem[];
}

const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home', sections = [] }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>(['robust']); // Default expand "Robust SINDy"

  // Persist navbar state across page changes
  useEffect(() => {
    // Get initial state from window object (persists across navigation)
    if (typeof window !== 'undefined') {
      const savedState = (window as any)._sindyNavbarCollapsed;
      const savedExpanded = (window as any)._sindyNavbarExpanded;
      if (savedState !== undefined) {
        setSidebarCollapsed(savedState);
      }
      if (savedExpanded !== undefined) {
        setExpandedItems(savedExpanded);
      }
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    // Persist state in window object
    if (typeof window !== 'undefined') {
      (window as any)._sindyNavbarCollapsed = newState;
    }
  };

  const toggleExpanded = (itemId: string) => {
    const newExpanded = expandedItems.includes(itemId)
      ? expandedItems.filter(id => id !== itemId)
      : [...expandedItems, itemId];
    setExpandedItems(newExpanded);
    // Persist expanded state
    if (typeof window !== 'undefined') {
      (window as any)._sindyNavbarExpanded = newExpanded;
    }
  };

  // Section intersection observer for active section highlighting
  useEffect(() => {
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Navigation items with hierarchical structure
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/', type: 'page' },
    { id: 'pysindy', label: 'PySINDy', icon: Code, href: '/pysindy', type: 'page' },
    { 
      id: 'robust', 
      label: 'Robust SINDy', 
      icon: Shield, 
      type: 'parent',
      children: [
        { id: 'ensemble-sindy', label: 'Ensemble SINDy', icon: Terminal, href: '/robust/ensemble' },
        { id: 'weak', label: 'Weak SINDy', icon: Rocket, href: '/robust/weak' },
      ]
    },
    { id: 'sindyc', label: 'SINDyC', icon: Settings, href: '/sindyc' },
    { id: 'research', label: 'Research', icon: FileCode, href: '/research', type: 'page' },
    { id: 'engineers', label: 'For Engineers', icon: Users, href: '/engineers', type: 'page' },
  ];

  return (
    <nav className={`${sidebarCollapsed ? 'w-16' : 'w-72'} min-h-screen bg-white/50 backdrop-blur-sm border-r border-slate-200/50 sticky top-16 transition-all duration-300 ease-in-out relative font-['-apple-system','BlinkMacSystemFont','SF Pro Display','SF Pro Text','Helvetica Neue','Arial','sans-serif'] overflow-y-auto`}>
      {/* Collapse/Expand Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/90 hover:bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md text-slate-600 hover:text-slate-900"
        title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
      </button>

      <div className="p-4 pt-16 pb-8">
        {/* Page Navigation */}
        <div className="space-y-1 mb-8">
          {!sidebarCollapsed && (
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
              Implementations
            </h3>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === currentPage;
            
            // Parent item (collapsible)
            if (item.type === 'parent') {
              const isExpanded = expandedItems.includes(item.id);
              const hasActiveChild = item.children?.some(child => child.id === currentPage);
              
              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => !sidebarCollapsed && toggleExpanded(item.id)}
                    className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-3 rounded-lg transition-all group relative ${
                      hasActiveChild
                        ? 'bg-slate-100 text-slate-900 font-medium'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <>
                        <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                        <div className="transition-transform duration-200">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </div>
                      </>
                    )}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none shadow-lg">
                        {item.label}
                      </div>
                    )}
                    {hasActiveChild && !sidebarCollapsed && (
                      <div className="w-2 h-2 bg-slate-600 rounded-full ml-2"></div>
                    )}
                  </button>
                  
                  {/* Child items */}
                  {!sidebarCollapsed && isExpanded && item.children && (
                    <div className="ml-6 space-y-1 border-l border-slate-200 pl-4">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        const isChildActive = child.id === currentPage;
                        
                        return (
                          <Link
                            key={child.id}
                            href={child.href}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all text-sm ${
                              isChildActive
                                ? 'bg-slate-700 text-white font-medium shadow-sm'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <ChildIcon className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">{child.label}</span>
                            {isChildActive && (
                              <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            
            // Regular page item
            return (
              <Link
                key={item.id}
                href={item.href!}
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

        {/* Section Navigation - Only show if sections provided and sidebar not collapsed */}
        {!sidebarCollapsed && sections.length > 0 && (
          <div className="border-t border-slate-200/60 pt-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3 flex items-center gap-2">
              <Target className="w-3 h-3" />
              On This Page
            </h3>
            <div className="space-y-1">
              {sections.map((section) => {
                const isActiveSection = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm group ${
                      isActiveSection
                        ? 'bg-blue-50 text-blue-700 font-medium border-r-2 border-blue-500'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                        isActiveSection ? 'bg-blue-500' : 'bg-slate-300 group-hover:bg-slate-400'
                      }`} />
                      <span className="truncate">{section.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Collapsed state section navigation - show as dots */}
        {sidebarCollapsed && sections.length > 0 && (
          <div className="border-t border-slate-200/60 pt-6">
            <div className="flex flex-col items-center space-y-2">
              {sections.slice(0, 6).map((section, index) => {
                const isActiveSection = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-2 h-2 rounded-full transition-all group relative ${
                      isActiveSection ? 'bg-blue-500' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    title={section.label}
                  >
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                      {section.label}
                    </div>
                  </button>
                );
              })}
              {sections.length > 6 && (
                <div className="text-xs text-slate-400">+{sections.length - 6}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;