"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Play, Youtube, Download, Github, Book, Zap, Users, CheckCircle, AlertCircle, Code, Terminal, Lightbulb, Rocket, Star, ArrowRight, X, AlertTriangle, ExternalLink } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PySINDyPage() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedDemo, setSelectedDemo] = useState('lorenz');
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const demoOptions = [
    { id: 'lorenz', name: 'Lorenz System', description: 'Classic chaotic attractor' },
    { id: 'pendulum', name: 'Nonlinear Pendulum', description: 'Simple mechanical system' },
    { id: 'vanderpol', name: 'Van der Pol Oscillator', description: 'Self-sustaining oscillation' }
  ];

  const faqItems = [
    {
      q: 'What Python versions are supported?',
      a: 'pySINDy supports Python 3.7 and higher. We recommend using Python 3.8+ for optimal performance and compatibility with all features.'
    },
    {
      q: 'Do I need specific versions of NumPy or SciPy?',
      a: 'pySINDy requires NumPy ≥ 1.16 and SciPy ≥ 1.0.0. For best performance, we recommend the latest stable versions. The package will automatically install compatible versions if you use pip.'
    },
    {
      q: 'Can I use pySINDy with GPU acceleration?',
      a: 'While pySINDy doesn\'t directly support GPU computation, you can use it with NumPy backends that support GPU acceleration like CuPy for certain operations.'
    },
    {
      q: 'How do I handle noisy data?',
      a: 'pySINDy includes several noise-robust optimization methods like SR3, STLSQ with thresholding, and ensemble methods. See the noise handling tutorial for detailed examples.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-['-apple-system','BlinkMacSystemFont','SF Pro Display','SF Pro Text','Helvetica Neue','Arial','sans-serif']">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">pySINDy</h1>
                <p className="text-xs text-slate-600">Python Implementation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/dynamicslab/pysindy" className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:text-slate-800 transition-colors">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
<Navbar 
  currentPage="pysindy" 
  sections={[
    { id: 'overview', label: 'Overview', href: '#overview' },
    { id: 'installation', label: 'Installation', href: '#installation' },
    { id: 'quickstart', label: 'Quick Start', href: '#quickstart' },
    { id: 'tutorials', label: 'Video Tutorials', href: '#tutorials' },
    { id: 'api', label: 'API Reference', href: '#api' },
    { id: 'community', label: 'Community', href: '#community' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ]}
/>

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-16">
          {/* Version Disclaimer Banner */}
          {showDisclaimer && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/60 rounded-lg shadow-sm">
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-red-900 text-sm font-medium">
                      Tutorial Compatibility Notice
                    </p>
                    <p className="text-red-800 text-sm mt-0.5">
                      For tutorials, use stable version 1.7.5. Latest version (2.0+) has breaking changes.
                      <code className="inline-flex items-center gap-1 font-mono bg-red-100 text-red-900 px-2 py-0.5 rounded text-xs ml-2">
                        pip install pysindy==1.7.5
                      </code>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDisclaimer(false)}
                  className="ml-3 p-1.5 hover:bg-red-100 rounded-md transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          )}

          {/* Overview Section */}
          <section id="overview" className="space-y-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-slate-100/80 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                <span>Python Implementation</span>
              </div>
              <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                Build Models
                <span className="bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent"> From Data</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                pySINDy is a comprehensive Python package for identifying governing equations from data using sparse regression techniques. 
                Perfect for scientists, engineers, and researchers working with dynamical systems.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Sparse Regression</h3>
                <p className="text-slate-600">Advanced sparse optimization methods including STLSQ, SR3, and MIOSR for robust model discovery.</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Easy Integration</h3>
                <p className="text-slate-600">Scikit-learn compatible API makes it simple to integrate with your existing machine learning workflows.</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Extensible</h3>
                <p className="text-slate-600">Modular design allows custom feature libraries, optimizers, and differentiation methods.</p>
              </div>
            </div>
          </section>

          {/* Installation Section */}
          <section id="installation" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Download className="h-4 w-4" />
                Installation
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Installation Guide</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Get up and running with pySINDy in minutes
              </p>
            </div>

            {/* Version Information Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-2">Version Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800">Latest Release:</span>
                      <span className="font-mono bg-blue-100 px-2 py-0.5 rounded">v2.0.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800">Stable (Tutorial-compatible):</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-0.5 rounded">v1.7.5</span>
                    </div>
                    <p className="text-blue-700 mt-2">
                      Note: Version 2.0+ includes breaking changes. For tutorial compatibility, use v1.7.5.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <a href="https://github.com/dynamicslab/pysindy/releases" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                        View all releases
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-blue-400">•</span>
                      <a href="https://github.com/dynamicslab/pysindy/blob/master/CHANGELOG.md" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                        Changelog
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>System Requirements</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Required Dependencies</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 text-slate-900 rounded-lg">
                      <span className="font-mono text-sm">Python</span>
                      <span className="text-sm text-slate-600">≥ 3.7</span>
                    </div>
                    <div className="flex items-center justify-between p-3 text-slate-900 rounded-lg">
                      <span className="font-mono text-sm">NumPy</span>
                      <span className="text-sm text-slate-600">≥ 1.16</span>
                    </div>
                    <div className="flex items-center justify-between p-3 text-slate-900 rounded-lg">
                      <span className="font-mono text-sm">SciPy</span>
                      <span className="text-sm text-slate-600">≥ 1.0.0</span>
                    </div>
                    <div className="flex items-center justify-between p-3 text-slate-900 rounded-lg">
                      <span className="font-mono text-sm">scikit-learn</span>
                      <span className="text-sm text-slate-600">≥ 1.0</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Optional Dependencies</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 text-slate-900 rounded-lg">
                      <span className="font-mono text-sm">matplotlib</span>
                      <span className="text-sm text-slate-600">plotting</span>
                    </div>
                    <div className="flex items-center justify-between p-3 text-slate-900 rounded-lg">
                      <span className="font-mono text-sm">gurobipy</span>
                      <span className="text-sm text-slate-600">MIOSR optimizer</span>
                    </div>
                    <div className="flex items-center justify-between p-3 text-slate-900 rounded-lg">
                      <span className="font-mono text-sm">cvxpy</span>
                      <span className="text-sm text-slate-600">convex optimization</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
                  <Terminal className="w-4 h-4" />
                  <span>Installation Methods</span>
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-yellow-400 font-mono text-sm">Conda install (recommended)</span>
                      <button className="text-slate-400 hover:text-white text-xs">Copy</button>
                    </div>
                    <code className="text-yellow-400 font-mono">conda install -c conda-forge pysindy</code>
                  </div>

                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-400 font-mono text-sm">Install stable version (recommended for tutorials)</span>
                      <button className="text-slate-400 hover:text-white text-xs">Copy</button>
                    </div>
                    <code className="text-green-400 font-mono">pip install pysindy==1.7.5</code>
                  </div>

                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 font-mono text-sm">Install latest version</span>
                      <button className="text-slate-400 hover:text-white text-xs">Copy</button>
                    </div>
                    <code className="text-blue-400 font-mono">pip install pysindy</code>
                  </div>
                                    
                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-400 font-mono text-sm">Development version</span>
                      <button className="text-slate-400 hover:text-white text-xs">Copy</button>
                    </div>
                    <code className="text-purple-400 font-mono text-sm">
                      pip install git+https://github.com/dynamicslab/pysindy.git
                    </code>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-blue-900">Pro Tip</h5>
                    <p className="text-blue-800 text-sm mt-1">
                      We recommend using a virtual environment to avoid dependency conflicts. Use <code className="bg-blue-100 px-1 rounded">python -m venv pysindy-env</code> to create one.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start Section */}
          <section id="quickstart" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                <Rocket className="h-4 w-4" />
                Quick Start
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Your First pySINDy Model</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Follow this step-by-step tutorial to discover the Lorenz equations from data
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
              <div className="space-y-8">
                
                {/* Step 1: Import Libraries */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">1</div>
                    <h3 className="text-xl font-semibold text-slate-900">Import Libraries and Setup</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    First, let's import the necessary libraries for data generation, integration, and modeling.
                  </p>
                  
                  <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
                      <span className="text-slate-300 font-mono text-sm flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2">Step 1: Import Libraries</span>
                      </span>
                      <button className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-slate-700 transition-colors">
                        Copy
                      </button>
                    </div>
                    
                    <pre className="text-sm text-slate-300 overflow-x-auto p-6 bg-slate-900 font-mono leading-relaxed">
<code>{`# Essential libraries for data manipulation and visualization
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import odeint

# Import the main pySINDy class
from pysindy import SINDy

# Set random seed for reproducible results
np.random.seed(42)

print("✅ Libraries imported successfully!")
print(f"📦 NumPy version: {np.__version__}")
print("🚀 Ready to discover equations from data!")`}</code>
                    </pre>
                  </div>
                </div>

                {/* Step 2: Generate Training Data */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">2</div>
                    <h3 className="text-xl font-semibold text-slate-900">Generate Training Data</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Create synthetic data from the famous Lorenz system - a chaotic dynamical system with three variables (x, y, z).
                  </p>
                  
                  <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
                      <span className="text-slate-300 font-mono text-sm flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2">Step 2: Generate Training Data</span>
                      </span>
                      <button className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-slate-700 transition-colors">
                        Copy
                      </button>
                    </div>
                    
                    <pre className="text-sm text-slate-300 overflow-x-auto p-6 bg-slate-900 font-mono leading-relaxed">
<code>{`# Define the Lorenz system equations
def lorenz(state, t, sigma=10.0, beta=8.0/3.0, rho=28.0):
    """
    The Lorenz system: a famous chaotic dynamical system
    
    dx/dt = sigma * (y - x)
    dy/dt = x * (rho - z) - y  
    dz/dt = x * y - beta * z
    """
    x, y, z = state
    return [
        sigma * (y - x),           # dx/dt
        x * (rho - z) - y,         # dy/dt  
        x * y - beta * z           # dz/dt
    ]

# Simulation parameters
dt = 0.002                    # Time step (small for accuracy)
t_train = np.arange(0, 10, dt)  # Time from 0 to 10 seconds
x0_train = [-8, 8, 27]        # Initial conditions [x0, y0, z0]

print(f"⏱️  Time points: {len(t_train)}")
print(f"🎯 Initial condition: {x0_train}")
print(f"📏 Time step: {dt}")

# Integrate the Lorenz equations to generate "measurement" data
x_train = odeint(lorenz, x0_train, t_train)

print(f"✅ Generated training data with shape: {x_train.shape}")
print(f"📊 Data ranges - x: [{x_train[:,0].min():.1f}, {x_train[:,0].max():.1f}]")
print(f"                y: [{x_train[:,1].min():.1f}, {x_train[:,1].max():.1f}]") 
print(f"                z: [{x_train[:,2].min():.1f}, {x_train[:,2].max():.1f}]")`}</code>
                    </pre>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 What's Happening Here?</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• We define the true Lorenz equations (these are what SINDy will try to rediscover)</li>
                      <li>• We integrate these equations to generate realistic "sensor measurements"</li>
                      <li>• The result is a time series of x, y, z values that follow chaotic dynamics</li>
                    </ul>
                  </div>
                </div>

                {/* Step 3: Fit SINDy Model */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">3</div>
                    <h3 className="text-xl font-semibold text-slate-900">Fit SINDy Model</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Now the magic happens! SINDy will automatically discover the governing equations from the data.
                  </p>
                  
                  <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
                      <span className="text-slate-300 font-mono text-sm flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2">Step 3: Fit SINDy Model</span>
                      </span>
                      <button className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-slate-700 transition-colors">
                        Copy
                      </button>
                    </div>
                    
                    <pre className="text-sm text-slate-300 overflow-x-auto p-6 bg-slate-900 font-mono leading-relaxed">
<code>{`# Initialize the SINDy model with default settings
# - Uses polynomial features up to degree 2 (x, y, z, x*y, x*z, etc.)
# - Uses STLSQ optimizer with automatic thresholding
model = SINDy()

print("🔧 Initializing SINDy model...")
print("📚 Feature library: Polynomial (degree 2)")  
print("🎯 Optimizer: STLSQ (Sequential Thresholded Least Squares)")

# Fit the model to discover the equations
print("\\n🚀 Discovering equations from data...")
model.fit(x_train, t=dt)
print("✅ Model fitting complete!")

# Display the discovered equations  
print("\\n🎉 DISCOVERED EQUATIONS:")
print("=" * 50)
model.print()
print("=" * 50)`}</code>
                    </pre>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">🎯 Expected Output:</h4>
                    <div className="font-mono text-sm text-green-800 bg-green-100 p-3 rounded">
                      <div>x0' = -10.000 x0 + 10.000 x1</div>
                      <div>x1' = 27.994 x0 - 0.999 x1 - 1.000 x0 x2</div>
                      <div>x2' = -2.666 x2 + 1.000 x0 x1</div>
                    </div>
                    <p className="text-green-700 text-sm mt-2">
                      Compare with true Lorenz equations - SINDy should recover the exact coefficients!
                    </p>
                  </div>
                </div>

                {/* Step 4: Validate Results */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">4</div>
                    <h3 className="text-xl font-semibold text-slate-900">Validate the Model</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Test how well our discovered equations can predict the system's behavior.
                  </p>
                  
                  <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
                      <span className="text-slate-300 font-mono text-sm flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2">Step 4: Validate Results</span>
                      </span>
                      <button className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-slate-700 transition-colors">
                        Copy
                      </button>
                    </div>
                    
                    <pre className="text-sm text-slate-300 overflow-x-auto p-6 bg-slate-900 font-mono leading-relaxed">
<code>{`# Use the discovered model to make predictions
print("🔮 Making predictions with discovered equations...")
x_test = model.predict(x_train, t=dt)

# Calculate prediction accuracy
mse = np.mean((x_train - x_test)**2)
print(f"📊 Mean Squared Error: {mse:.2e}")

# Calculate R² score for each variable
from sklearn.metrics import r2_score
r2_scores = [r2_score(x_train[:, i], x_test[:, i]) for i in range(3)]
print(f"🎯 R² Scores:")
print(f"   x-variable: {r2_scores[0]:.6f}")
print(f"   y-variable: {r2_scores[1]:.6f}")  
print(f"   z-variable: {r2_scores[2]:.6f}")
print(f"   Average: {np.mean(r2_scores):.6f}")

if np.mean(r2_scores) > 0.99:
    print("🎉 Excellent! The model captures the dynamics very well!")
elif np.mean(r2_scores) > 0.95:
    print("✅ Good! The model captures most of the dynamics.")
else:
    print("⚠️  Model may need tuning or more data.")`}</code>
                    </pre>
                  </div>
                </div>

                {/* Step 5: Visualize */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">5</div>
                    <h3 className="text-xl font-semibold text-slate-900">Visualize Results</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Create plots to compare the true data with SINDy's predictions.
                  </p>
                  
                  <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
                      <span className="text-slate-300 font-mono text-sm flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2">Step 5: Visualize Results</span>
                      </span>
                      <button className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-slate-700 transition-colors">
                        Copy
                      </button>
                    </div>
                    
                    <pre className="text-sm text-slate-300 overflow-x-auto p-6 bg-slate-900 font-mono leading-relaxed">
<code>{`# Create comprehensive visualization
fig, axes = plt.subplots(2, 2, figsize=(15, 10))
fig.suptitle('SINDy Discovery Results: Lorenz System', fontsize=16, fontweight='bold')

# Time series comparison
variables = ['x', 'y', 'z']
colors = ['red', 'green', 'blue']

for i, (var, color) in enumerate(zip(variables, colors)):
    ax = axes[0, 0] if i < 2 else axes[0, 1] if i == 2 else None
    if i < 2:  # Plot x and y in first subplot, z in second
        ax = axes[0, 0] if i == 0 else axes[0, 1]
        ax.plot(t_train[:1000], x_train[:1000, i], color=color, 
                linewidth=2, label=f'True {var}', alpha=0.8)
        ax.plot(t_train[:1000], x_test[:1000, i], '--', color='black', 
                linewidth=1.5, label=f'SINDy {var}', alpha=0.7)
        ax.set_xlabel('Time')
        ax.set_ylabel(f'{var}(t)')
        ax.set_title(f'{var.upper()}-component Comparison')
        ax.legend()
        ax.grid(True, alpha=0.3)

# 3D phase portrait comparison  
ax1 = axes[0, 1]
ax1 = fig.add_subplot(2, 2, 2, projection='3d')
ax1.plot(x_train[::10, 0], x_train[::10, 1], x_train[::10, 2], 
         'b-', linewidth=0.8, alpha=0.7, label='True')
ax1.plot(x_test[::10, 0], x_test[::10, 1], x_test[::10, 2], 
         'r--', linewidth=0.8, alpha=0.7, label='SINDy')
ax1.set_xlabel('x')
ax1.set_ylabel('y') 
ax1.set_zlabel('z')
ax1.set_title('3D Phase Portrait')
ax1.legend()

# Error analysis
ax2 = axes[1, 0]
errors = np.abs(x_train - x_test)
ax2.semilogy(t_train, errors[:, 0], 'r-', label='x error', alpha=0.7)
ax2.semilogy(t_train, errors[:, 1], 'g-', label='y error', alpha=0.7)  
ax2.semilogy(t_train, errors[:, 2], 'b-', label='z error', alpha=0.7)
ax2.set_xlabel('Time')
ax2.set_ylabel('Absolute Error (log scale)')
ax2.set_title('Prediction Error Over Time')
ax2.legend()
ax2.grid(True, alpha=0.3)

# Coefficient comparison
ax3 = axes[1, 1]
true_coeffs = np.array([[-10, 10, 0], [28, -1, -1], [0, 0, -8/3]])
discovered_coeffs = model.coefficients()[:, [0, 1, 3]]  # Select relevant terms
x_pos = np.arange(len(true_coeffs.flatten()))
ax3.bar(x_pos - 0.2, true_coeffs.flatten(), 0.4, label='True', alpha=0.7)
ax3.bar(x_pos + 0.2, discovered_coeffs.flatten(), 0.4, label='Discovered', alpha=0.7)
ax3.set_xlabel('Coefficient Index')
ax3.set_ylabel('Value')
ax3.set_title('Coefficient Comparison')
ax3.legend()
ax3.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print("🎨 Visualization complete!")
print("📈 Check the plots to see how well SINDy discovered the equations!")`}</code>
                    </pre>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">📊 What to Look For:</h4>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>• <strong>Time series plots:</strong> True vs predicted trajectories should overlap closely</li>
                      <li>• <strong>3D phase portrait:</strong> Both trajectories should follow the same chaotic attractor</li>
                      <li>• <strong>Error analysis:</strong> Errors should remain small and stable over time</li>
                      <li>• <strong>Coefficients:</strong> Discovered values should match true Lorenz parameters</li>
                    </ul>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    🎉 Congratulations!
                  </h4>
                  <p className="text-slate-700 mb-4">
                    You've successfully used pySINDy to discover the governing equations of a chaotic system from data alone. 
                    This is the core power of SINDy - turning measurements into mathematical understanding.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-slate-900 mb-2">🎯 What You Learned:</h5>
                      <ul className="text-slate-700 space-y-1">
                        <li>• How to prepare time-series data for SINDy</li>
                        <li>• Basic pySINDy workflow: fit, predict, validate</li>
                        <li>• How to interpret discovered equations</li>
                        <li>• Visualization techniques for model validation</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-900 mb-2">🚀 Next Steps:</h5>
                      <ul className="text-slate-700 space-y-1">
                        <li>• Try different feature libraries (Fourier, custom)</li>
                        <li>• Experiment with noisy data and robust optimizers</li>
                        <li>• Apply SINDy to your own datasets</li>
                        <li>• Explore advanced tutorials below</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Tutorials Section */}
          <section id="tutorials" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                <Lightbulb className="h-4 w-4" />
                Video Tutorials
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Learn pySINDy with Alan Kaptanoglu</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Comprehensive video lectures on pySINDy usage and practical tips from one of the core developers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Overview of PySINDy for Sparse System Identification',
                  description: 'Getting started with a brief overview of the SINDy method',
                  duration: '12 min',
                  level: 'Beginner',
                  color: 'green',
                  url: 'https://www.youtube.com/watch?v=SfIJiuJ38W0&list=PLN90bHJU-JLoOfEk0KyBs2qLTV7OkMZ25&index=1',
                  thumbnailId: 'SfIJiuJ38W0'
                },
                {
                  title: 'Choosing Algorithm Hyperparameters',
                  description: 'Use PySINDy to tune hyperparameters such as the amount of sparsity-promotion used in the SINDy algorithm.',
                  duration: '12 min',
                  level: 'Beginner',
                  color: 'green',
                  url: 'https://www.youtube.com/watch?v=HvOdfwgTPnM&list=PLN90bHJU-JLoOfEk0KyBs2qLTV7OkMZ25&index=2',
                  thumbnailId: 'HvOdfwgTPnM'
                },
                {
                  title: 'Robust Sparse System Identification',
                  description: 'Understanding how PySINDy improves the performance of system identification.',
                  duration: '9 min',
                  level: 'Intermediate',
                  color: 'blue',
                  url: 'https://www.youtube.com/watch?v=pyhFjNepfi4&list=PLN90bHJU-JLoOfEk0KyBs2qLTV7OkMZ25&index=3',
                  thumbnailId: 'pyhFjNepfi4'
                },
                {
                  title: 'Robust Sparse System Identification by Ensembling',
                  description: 'Showing a PySINDy method which can be used to generate multiple dynamical models, perform probabilistic model identification, and much more.',
                  duration: '8 min',
                  level: 'Advanced',
                  color: 'purple',
                  url: 'https://www.youtube.com/watch?v=19Ku-idSptA&list=PLN90bHJU-JLoOfEk0KyBs2qLTV7OkMZ25&index=4',
                  thumbnailId: '19Ku-idSptA'
                },
                {
                  title: 'Building in Physical Priors with Constraints',
                  description: 'Showing how users can input physical constraints, conservation laws, or global stability theorems into data-driven models.',
                  duration: '23 min',
                  level: 'Intermediate',
                  color: 'blue',
                  url: 'https://www.youtube.com/watch?v=cPI466f2_4c&list=PLN90bHJU-JLoOfEk0KyBs2qLTV7OkMZ25&index=5',
                  thumbnailId: 'cPI466f2_4c'
                },
                {
                  title: 'The Weak Formulation of SINDy and SINDy-PI',
                  description: 'Learn how the weak formulation of SINDy can be used to gain very significant robustness against noise',
                  duration: '18 min',
                  level: 'Advanced',
                  color: 'purple',
                  url: 'https://www.youtube.com/watch?v=_iBjhpryUc4&list=PLN90bHJU-JLoOfEk0KyBs2qLTV7OkMZ25&index=6',
                  thumbnailId: '_iBjhpryUc4'
                }
              ].map((tutorial, i) => (
                <a key={i}
                  href={tutorial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:shadow-lg transition-shadow cursor-pointer group block overflow-hidden"
                >
                  {/* Video Thumbnail */}
                  <div className="relative">
                    <img 
                      src={`https://img.youtube.com/vi/${tutorial.thumbnailId}/maxresdefault.jpg`}
                      alt={tutorial.title}
                      className="w-full h-48 object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        // Fallback to default thumbnail if maxres doesn't exist
                        const target = e.target as HTMLImageElement;
                        target.src = `https://img.youtube.com/vi/${tutorial.thumbnailId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute top-4 right-4 bg-black/50 rounded-lg p-2 group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="bg-black/50 text-white px-2 py-1 rounded text-xs">{tutorial.duration}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        tutorial.color === 'green' ? 'bg-green-500 text-white' :
                        tutorial.color === 'blue' ? 'bg-blue-500 text-white' :
                        'bg-purple-500 text-white'
                      }`}>
                        {tutorial.level}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">{tutorial.description}</p>
                    <span className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 text-sm group-hover:gap-3 transition-all">
                      Watch Tutorial 
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center">
              <a 
                href="https://www.youtube.com/playlist?list=PLN90bHJU-JLoOfEk0KyBs2qLTV7OkMZ25"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors group"
              >
                <Youtube className="h-5 w-5" />
                Watch Full Playlist
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </section>

          {/* API Reference Section */}
          <section id="api" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-slate-200 text-slate-800 px-4 py-2 rounded-full text-sm font-medium">
                <Code className="h-4 w-4" />
                API Reference
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Complete Documentation</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Detailed documentation of all classes, methods, and parameters
              </p> 
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">Core Classes</h3>
                  <div className="space-y-2">
                    <a href="#" className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <div className="font-mono text-sm font-medium text-slate-900">SINDY</div>
                      <div className="text-xs text-slate-600">Legacy interface</div>
                    </a>
                    <a href="#" className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <div className="font-mono text-sm font-medium text-slate-900">SINDy</div>
                      <div className="text-xs text-slate-600">Main sparse regression class</div>
                    </a>
                    <a href="#" className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <div className="font-mono text-sm font-medium text-slate-900">SINDyPI</div>
                      <div className="text-xs text-slate-600">Physics-informed SINDy</div>
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">Optimizers</h3>
                  <div className="space-y-2">
                    <a href="#" className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <div className="font-mono text-sm font-medium text-slate-900">STLSQ</div>
                      <div className="text-xs text-slate-600">Sequential thresholded least squares</div>
                    </a>
                    <a href="#" className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <div className="font-mono text-sm font-medium text-slate-900">SR3</div>
                      <div className="text-xs text-slate-600">Sparse relaxed regularized regression</div>
                    </a>
                    <a href="#" className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <div className="font-mono text-sm font-medium text-slate-900">MIOSR</div>
                      <div className="text-xs text-slate-600">Mixed-integer optimization</div>
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">Feature Libraries</h3>
                  <div className="space-y-2">
                    <a href="#" className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <div className="font-mono text-sm font-medium text-slate-900">PolynomialLibrary</div>
                      <div className="text-xs text-slate-600">Polynomial features</div>
                    </a>
                    <a href="#" className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <div className="font-mono text-sm font-medium text-slate-900">FourierLibrary</div>
                      <div className="text-xs text-slate-600">Trigonometric functions</div>
                    </a>
                    <a href="#" className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <div className="font-mono text-sm font-medium text-slate-900">CustomLibrary</div>
                      <div className="text-xs text-slate-600">User-defined functions</div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Book className="w-5 h-5 text-slate-700" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Complete API Documentation</h4>
                    <p className="text-slate-800 text-sm mt-1">
                      Detailed documentation with examples for every class, method, and parameter is available in our comprehensive API guide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

                    {/* FAQ Section */}
                    <section className="space-y-8">
                      <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                          <Lightbulb className="h-4 w-4" />
                          FAQ
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
                        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                          Common questions about PySINDy
                        </p>
                      </div>
          
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
                        <div className="space-y-4">
                          {faqItems.map((faq, index) => (
                            <div key={index} className="border border-slate-200 rounded-lg bg-white/50">
                              <button
                                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50/50 transition-colors rounded-lg"
                              >
                                <span className="font-medium text-slate-900 pr-4">{faq.q}</span>
                                {expandedFAQ === index ? (
                                  <ChevronDown className="w-4 h-4 text-slate-600 flex-shrink-0" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
                                )}
                              </button>
                              {expandedFAQ === index && (
                                <div className="px-4 pb-4">
                                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

          {/* Community Section */}
          <section id="community" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                <Users className="h-4 w-4" />
                Community & Support
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Join the pySINDy Community</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Get help, contribute, and connect with other pySINDy users
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Get Help</h3>
                <div className="space-y-4">
                  <a
                    href="https://github.com/dynamicslab/pysindy/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Github className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900">GitHub Issues</div>
                      <div className="text-sm text-slate-600">Bug reports and feature requests</div>
                    </div>
                  </a>
                  <a
                    href="https://github.com/dynamicslab/pysindy/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Users className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900">Discussions</div>
                      <div className="text-sm text-slate-600">Community Q&amp;A and discussions</div>
                    </div>
                  </a>                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Contribute</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Development</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Help improve pySINDy by contributing code, documentation, or examples.
                    </p>
                    <a
                      href="https://opensource.guide/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 hover:text-slate-800 text-sm font-medium"
                    >
                      Contributing Guide →
                    </a>
                  </div>                
                </div>
              </div>
            </div>
                      
        {/* Contact Section */}
          <section id="contact" className="space-y-4">
            {/* Contact Card - Jake */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900">Contact</h3>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                <div className="flex items-center gap-6">
                  {/* Profile Image */}
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white text-lg font-bold">JS</span>
                  </div>

                  {/* Contact Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">Dr. Jake Stevens-Haas</h4>
                        <p className="text-slate-600 text-sm mb-1">University of Washington</p>
                      </div>

                      {/* Contact Links */}
                      <div className="flex gap-2 ml-4">
                        <a 
                          href="mailto:jacob.stevens.haas@gmail.com" 
                          className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors group"
                          title="Email Dr. Jacob"
                        >
                          <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-800" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                          </svg>
                        </a>
                        <a 
                          href="https://github.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors group"
                          title="GitHub Profile"
                        >
                          <Github className="w-4 h-4 text-slate-600 group-hover:text-slate-800" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card - Yash */}
            <div className="space-y-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                <div className="flex items-center gap-6">
                  {/* Profile Image */}
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white text-lg font-bold">YB</span>
                  </div>

                  {/* Contact Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">Yash S. Bhangale</h4>
                        <p className="text-slate-600 text-sm mb-1">University of Washington</p>
                      </div>

                      {/* Contact Links */}
                      <div className="flex gap-2 ml-4">
                        <a 
                          href="mailto:yash6599@uw.edu" 
                          className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors group"
                          title="Email Yash"
                        >
                          <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-800" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                          </svg>
                        </a>
                        <a 
                          href="https://github.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors group"
                          title="GitHub Profile"
                        >
                          <Github className="w-4 h-4 text-slate-600 group-hover:text-slate-800" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          </section>

          </main>
          </div>

          {/* Footer */}
          <Footer />
    </div>
  );
}