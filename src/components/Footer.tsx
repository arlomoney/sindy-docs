import React from 'react';
import Link from 'next/link';
import { Github, ExternalLink, Mail, Twitter, Zap, Book, Users, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white font-['-apple-system','BlinkMacSystemFont','SF Pro Display','SF Pro Text','Helvetica Neue','Arial','sans-serif']">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">SINDy</span>
                <p className="text-xs text-slate-400">Sparse Identification of Nonlinear Dynamics</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Advancing the field of data-driven dynamical systems discovery through 
              sparse identification techniques and open-source implementations.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/dynamicslab/pysindy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contact@sindy.org" 
                className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Implementations Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Implementations</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/pysindy" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  PySINDy
                </Link>
              </li>
              <li>
                <Link href="/matlab" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  MATLAB
                </Link>
              </li>
              <li>
                <Link href="/julia" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Julia
                </Link>
              </li>
              <li>
                <Link href="/cpp" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  C++
                </Link>
              </li>
              <li>
                <Link href="/engineers" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  For Engineers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#method" className="text-slate-400 hover:text-white transition-colors text-sm">
                  What is SINDy?
                </Link>
              </li>
              <li>
                <Link href="/#implementation" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Implementation Guide
                </Link>
              </li>
              <li>
                <Link href="/#videos" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Video Tutorials
                </Link>
              </li>
              <li>
                <Link href="/#demo" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Interactive Demo
                </Link>
              </li>
              <li>
                <Link href="/#papers" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Research Papers
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-slate-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Community</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://github.com/dynamicslab/pysindy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link href="/#community" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Contribute
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/dynamicslab/pysindy/discussions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Book className="w-4 h-4" />
                  Discussions
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://stackoverflow.com/questions/tagged/pysindy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Book className="w-4 h-4" />
                  Stack Overflow
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 Dynamics Lab. Open source project for advancing dynamical systems discovery.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/license" className="text-slate-400 hover:text-white transition-colors text-sm">
                MIT License
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;