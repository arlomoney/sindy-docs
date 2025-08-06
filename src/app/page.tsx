"use client";
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChevronDown, ChevronRight, Play, Github, Book, Zap, Users, CheckCircle, Code, Terminal, Lightbulb, Star, ArrowRight, Youtube, ExternalLink, Target, BarChart3, Cpu } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedDemo, setSelectedDemo] = useState('lorenz');
  
  const demoOptions = [
    { id: 'lorenz', name: 'Lorenz System', description: 'Famous chaotic attractor' },
    { id: 'vanderpol', name: 'Van der Pol', description: 'Nonlinear oscillator' },
    { id: 'duffing', name: 'Duffing Oscillator', description: 'Forced nonlinear system' },
    { id: 'lotka', name: 'Lotka-Volterra', description: 'Predator-prey dynamics' }
  ];

  const faqItems = [
    {
      q: 'What type of data does SINDy require?',
      a: 'SINDy requires clean time-series data of system states with sufficient sampling rate to capture dynamics. Both state variables and their derivatives (computed numerically) are needed. The method works best with data that has good signal-to-noise ratio and covers the relevant dynamical regimes of the system.'
    },
    {
      q: 'How does SINDy handle noisy data?',
      a: 'SINDy can be sensitive to noise, especially in derivative computation. Techniques like total variation regularized differentiation, Savitzky-Golay filtering, ensemble methods, and robust sparse regression can improve noise robustness. The choice of regularization parameter is also crucial for balancing sparsity and noise tolerance.'
    },
    {
      q: 'What\'s the difference between LASSO and STLSQ?',
      a: 'LASSO uses L1 regularization to promote sparsity in a single optimization step, while Sequential Thresholded Least Squares (STLSQ) iteratively removes small coefficients and re-solves the least squares problem. STLSQ often provides better sparsity patterns but may be less numerically stable than LASSO.'
    },
    {
      q: 'Can SINDy discover partial differential equations?',
      a: 'Yes! Variants like PDE-FIND and Weak SINDy have been developed specifically for discovering PDEs from spatiotemporal data. These methods extend the basic SINDy framework to handle spatial derivatives and distributed systems, opening up applications in fluid dynamics, pattern formation, and reaction-diffusion systems.'
    },
    {
      q: 'How do I choose the library functions?',
      a: 'Start with polynomial terms up to degree 3-5, then add trigonometric functions for oscillatory systems. Domain knowledge guides selection - include exponentials for growth/decay, rational functions for equilibrium systems, or custom functions based on physical intuition. Feature selection and cross-validation help optimize the library.'
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
                <h1 className="text-xl font-bold text-slate-900">SINDy</h1>
                <p className="text-xs text-slate-600">Sparse Identification of Nonlinear Dynamics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/dynamicslab/pysindy" className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:text-slate-800 transition-colors">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <button className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        <Navbar currentPage="home" />

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-16">
          {/* Overview Section */}
          <section id="overview" className="space-y-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-slate-100/80 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                <span>Data-Driven Discovery</span>
              </div>
              <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                Discover Hidden
                <span className="bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent"> Dynamics</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                SINDy is a revolutionary approach for identifying governing equations from data using sparse regression techniques. 
                Perfect for scientists, engineers, and researchers working with complex dynamical systems.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <a 
                  href="#method"
                  className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>Learn More</span>
                </a>
                <a 
                  href="#demo"
                  className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>Try Demo</span>
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Sparse Discovery</h3>
                <p className="text-slate-600">Advanced sparse regression methods like LASSO and STLSQ automatically identify the most relevant terms in governing equations.</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Data-Driven</h3>
                <p className="text-slate-600">Discovers equations directly from time-series measurements without requiring prior knowledge of system structure.</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Interpretable</h3>
                <p className="text-slate-600">Produces clean, human-readable mathematical equations that can be directly interpreted and validated.</p>
              </div>
            </div>
          </section>

          {/* What is SINDy Section */}
          <section id="method" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-800 px-4 py-2 rounded-full text-sm font-medium">
                <Target className="h-4 w-4" />
                Method Overview
              </div>
              <h2 className="text-4xl font-bold text-slate-900">What is SINDy?</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                A groundbreaking data-driven approach that discovers governing equations of complex dynamical systems 
                using sparse regression techniques.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl p-3 shadow-lg">
                        <Lightbulb className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Sparse Regression</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Uses advanced sparse regression techniques like LASSO and STLSQ to identify only the most 
                          relevant terms, automatically eliminating noise and redundant features.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 shadow-lg">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Data-Driven Discovery</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Extracts governing equations directly from time-series measurements without requiring 
                          prior knowledge of the underlying physics or system structure.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 shadow-lg">
                        <Code className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Interpretable Results</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Produces clean, human-readable mathematical equations that scientists and engineers 
                          can directly interpret and validate against domain knowledge.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">How SINDy Works</h3>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Collect Data", desc: "Gather time-series measurements X(t)" },
                      { step: "2", title: "Compute Derivatives", desc: "Calculate Ẋ using numerical methods" },
                      { step: "3", title: "Build Library", desc: "Construct candidate functions Θ(X)" },
                      { step: "4", title: "Sparse Regression", desc: "Solve Ẋ = Θ(X)Ξ with sparsity constraints" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 text-white rounded-lg flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{item.title}</h4>
                          <p className="text-slate-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Implementation Section */}
          <section id="implementation" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Cpu className="h-4 w-4" />
                Implementation Guide
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Build SINDy from Scratch</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Learn the core concepts and implement SINDy without relying on existing libraries. 
                Perfect for researchers and engineers who want deep understanding.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    icon: Code,
                    title: "Library Construction", 
                    items: ["Polynomial features", "Trigonometric functions", "Custom basis functions", "Feature scaling"]
                  },
                  {
                    icon: Target,
                    title: "Sparse Regression",
                    items: ["LASSO implementation", "STLSQ algorithm", "Parameter tuning", "Cross-validation"]
                  },
                  {
                    icon: CheckCircle,
                    title: "Model Validation",
                    items: ["Stability analysis", "Prediction accuracy", "Robustness testing", "Physical consistency"]
                  },
                  {
                    icon: Book,
                    title: "Advanced Topics",
                    items: ["PDE discovery", "Nonlinear control", "Hybrid systems", "Multiscale modeling"]
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg p-3 w-fit mb-4">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                    <ul className="space-y-2">
                      {item.items.map((listItem, idx) => (
                        <li key={`${index}-${idx}`} className="flex items-center gap-2 text-slate-600 text-sm">                          <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                          <span>{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
            <div className="space-y-8">
              <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
                  <span className="text-green-400 font-mono text-sm flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2">Basic Implementation Example</span>
                  </span>
                  <button className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-slate-700 transition-colors">
                    Copy
                  </button>
                </div>
                
                <SyntaxHighlighter
                  language="python"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    background: 'rgb(15 23 42)', // slate-900
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                  showLineNumbers={true}
                  lineNumberStyle={{
                    color: '#64748b',
                    paddingRight: '1rem',
                    minWidth: '3rem'
                  }}
                >
        {`import numpy as np
from scipy.integrate import odeint
from sklearn.linear_model import Lasso

# Generate Lorenz system data
def lorenz(state, t):
    x, y, z = state
    return [10*(y-x), x*(28-z)-y, x*y-8/3*z]

t = np.linspace(0, 10, 5000)
x0 = [-8, 8, 27]
X = odeint(lorenz, x0, t)

# Build feature library
def polynomial_library(X, degree=2):
    n, d = X.shape
    library = []
    # Add polynomial terms up to specified degree
    for i in range(d):
        library.append(X[:, i])
    for i in range(d):
        for j in range(i, d):
            library.append(X[:, i] * X[:, j])
    return np.column_stack(library)

# Compute derivatives
dt = t[1] - t[0]
Xdot = np.gradient(X, dt, axis=0)

# Build library and solve
Theta = polynomial_library(X)
model = Lasso(alpha=0.01)
model.fit(Theta, Xdot)

# Print discovered equations
print("Discovered equations:")
for i, coef in enumerate(model.coef_):
    if abs(coef) > 1e-3:
        print(f"dx{i}/dt = {coef:.3f} * feature_{i}")`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
          </section>

          {/* Video Resources Section */}
          <section id="videos" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                <Youtube className="h-4 w-4" />
                Learning Resources
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Expert Video Tutorials</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Learn from the creators and leading researchers with comprehensive video explanations and tutorials.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[
                {
                  title: "SINDy Introduction",
                  description: "A comprehensive overview of the SINDy methodology by the original authors",
                  duration: "45 min",
                  level: "Beginner",
                  url: "https://www.youtube.com/watch?v=gSCa78TIldg"
                },
                {
                  title: "Advanced Applications",
                  description: "Real-world case studies including fluid dynamics and biological systems",
                  duration: "Playlist",
                  level: "Advanced",
                  url: "https://www.youtube.com/watch?v=NxAn0oglMVw&list=PLq7sjSxACEo6iRtnbLShncBn-alTQb1GS"
                }
              ].map((video, index) => (
                <a key = {index}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:shadow-lg transition-shadow cursor-pointer group block"
                >
                  <div className="relative bg-gradient-to-br from-red-500 to-pink-600 p-6 text-white rounded-t-xl">
                    <div className="absolute top-4 right-4 bg-white/20 rounded-lg p-2 group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5" />
                    </div>
                    <Youtube className="h-8 w-8 mb-3 opacity-90" />
                    <div className="flex gap-2 mb-2">
                      <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{video.duration}</span>
                      <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{video.level}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">{video.description}</p>
                    <span className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 text-sm group-hover:gap-3 transition-all">
                      Watch Video 
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Interactive Demo Section */}
          <section id="demo" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                <Play className="h-4 w-4" />
                Interactive Experience
              </div>
              <h2 className="text-4xl font-bold text-slate-900">See SINDy in Action</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Experiment with classic dynamical systems and watch SINDy discover their governing equations in real-time.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
              <div className="flex flex-wrap gap-3 mb-6">
                {demoOptions.map((demo) => (
                  <button key={demo.id}
                    onClick={() => setSelectedDemo(demo.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                      selectedDemo === demo.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {demo.name}
                  </button>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {demoOptions.find(d => d.id === selectedDemo)?.name}
                  </h3>
                  <p className="text-slate-600">
                    {demoOptions.find(d => d.id === selectedDemo)?.description}
                  </p>
                  
                  <div className="bg-slate-900 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-green-400 font-mono text-sm">System Visualization</span>
                      <div className="flex gap-2">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium flex items-center space-x-1">
                          <Play className="w-3 h-3" />
                          <span>Run</span>
                        </button>
                        <button className="bg-slate-600 hover:bg-slate-700 text-white px-3 py-1 rounded text-xs font-medium">
                          Reset
                        </button>
                      </div>
                    </div>
                    <div className="h-48 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto">
                          <Play className="w-6 text-blue-400" />
                        </div>
                        <p className="text-slate-400 text-sm">Click Run to start simulation</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Discovered Equations</h4>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="font-mono text-sm space-y-1 text-slate-700">
                      {selectedDemo === 'lorenz' && (
                        <>
                          <div>dx/dt = -10.000 x + 10.000 y</div>
                          <div>dy/dt = 27.994 x - 0.999 y - 1.000 x z</div>
                          <div>dz/dt = -2.666 z + 1.000 x y</div>
                        </>
                      )}
                      {selectedDemo === 'vanderpol' && (
                        <>
                          <div>dx/dt = y</div>
                          <div>dy/dt = -x + μ(1 - x²)y</div>
                        </>
                      )}
                      {selectedDemo === 'duffing' && (
                        <>
                          <div>dx/dt = y</div>
                          <div>dy/dt = -x - x³ + F cos(ωt)</div>
                        </>
                      )}
                      {selectedDemo === 'lotka' && (
                        <>
                          <div>dx/dt = αx - βxy</div>
                          <div>dy/dt = δxy - γy</div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">Parameters</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-600">Noise Level</label>
                        <div className="flex items-center gap-2">
                          <input type="range" min="0" max="0.1" step="0.01" className="w-20" />
                          <span className="text-xs text-slate-500 w-8">0.02</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-600">Threshold</label>
                        <div className="flex items-center gap-2">
                          <input type="range" min="0" max="1" step="0.1" className="w-20" />
                          <span className="text-xs text-slate-500 w-8">0.1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Research Papers Section */}
          <section id="papers" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-slate-200 text-slate-800 px-4 py-2 rounded-full text-sm font-medium">
                <Book className="h-4 w-4" />
                Research Foundation
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Key Publications</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Explore the foundational research and latest advances in sparse identification of dynamical systems.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Discovering governing equations from data",
                  authors: "Brunton, S. L., Proctor, J. L., & Kutz, J. N.",
                  journal: "Proceedings of National Academy of Sciences",
                  year: "2016",
                  citations: "2,400+",
                  description: "The original SINDy paper that introduced sparse identification of nonlinear dynamical systems.",
                  color: "slate",
                  type: "Original Paper",
                  url: "https://www.pnas.org/doi/10.1073/pnas.1517384113"
                },
                {
                  title: "Sparse identification with control (SINDYc)",
                  authors: "Brunton, S. L., Proctor, J. L., & Kutz, J. N.",
                  journal: "IFAC-PapersOnLine",
                  year: "2016", 
                  citations: "800+",
                  description: "Extension of SINDy for systems with control inputs and external forcing.",
                  color: "green",
                  type: "Extension",
                  url: "https://www.sciencedirect.com/science/article/pii/S2405896316318298"
                },
                {
                  title: "Weak SINDy for partial differential equations",
                  authors: "Messenger, D. A., & Bortz, D. M.",
                  journal: "Journal of Computational Physics",
                  year: "2021",
                  citations: "150+", 
                  description: "Novel approach for discovering PDEs using weak formulations and integration by parts.",
                  color: "purple",
                  type: "PDE Extension",
                  url: "https://www.sciencedirect.com/science/article/pii/S0021999121004204"
                },
                {
                  title: "A unified sparse optimization framework",
                  authors: "Champion, K., Zheng, P., Aravkin, A. Y., et al.",
                  journal: "Nature Communications", 
                  year: "2019",
                  citations: "600+",
                  description: "Comprehensive framework combining deep learning with sparse optimization for system discovery.",
                  color: "orange",
                  type: "Deep Learning",
                  url: "https://arxiv.org/abs/1906.10612"
                }
              ].map((paper, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:shadow-lg transition-shadow group">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        paper.color === 'slate' ? 'bg-slate-100 text-slate-800' :
                        paper.color === 'green' ? 'bg-green-100 text-green-800' :
                        paper.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {paper.type}
                      </span>
                      <span className="text-slate-500 text-sm">{paper.year}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors leading-tight">
                      {paper.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm mb-2 leading-relaxed">{paper.authors}</p>
                    <p className="text-slate-500 text-sm mb-4 italic">{paper.journal}</p>
                    
                    <p className="text-slate-700 mb-4 leading-relaxed text-sm">{paper.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500 flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        {paper.citations} citations
                      </span>
                      <a 
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium flex items-center gap-2 group-hover:gap-3 transition-all text-sm ${
                          paper.color === 'slate' ? 'text-slate-700 hover:text-slate-800' :
                          paper.color === 'green' ? 'text-green-600 hover:text-green-700' :
                          paper.color === 'purple' ? 'text-purple-600 hover:text-purple-700' :
                          'text-orange-600 hover:text-orange-700'
                        }`}
                      >
                        Read Paper 
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle className="h-4 w-4" />
                Common Questions
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Everything you need to know about implementing and using SINDy methodology.
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
                Join the Community
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Contribute to SINDy</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Help advance the field by contributing new algorithms, sharing research, and building the next generation of discovery tools.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">How to Contribute</h3>
                <div className="space-y-7">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-xl p-3 flex-shrink-0">
                      <Code className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Algorithm Development</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Submit new sparse regression algorithms, optimization techniques, or SINDy variants. 
                        Include comprehensive documentation, validation examples, and performance benchmarks.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 rounded-xl p-3 flex-shrink-0">
                      <Book className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Research Publications</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Share your latest findings, novel applications, and theoretical advances. 
                        Help build the research foundation for next-generation discovery methods.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 rounded-xl p-3 flex-shrink-0">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Real-World Applications</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Document case studies, provide datasets, and share lessons learned from applying 
                        SINDy to real engineering and scientific problems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Contribution Guidelines</h3>
                <div className="space-y-6 mb-8">
                  {[
                    "Follow established code style and documentation standards",
                    "Include comprehensive tests and validation examples", 
                    "Provide clear installation and usage instructions",
                    "Submit through GitHub with detailed pull request descriptions",
                    "Engage with the community through discussions and reviews"
                  ].map((guideline, index) => (
                    <div key={index} className="flex items-start gap-4 group hover:bg-slate-50/50 p-3 rounded-lg transition-all duration-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-base pt-1 group-hover:text-slate-800 transition-colors">{guideline}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Community Links */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">Community Resources</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <a href="https://github.com/dynamicslab/pysindy" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group">
                  <Github className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                  <div>
                    <div className="font-medium text-slate-900">GitHub Repository</div>
                    <div className="text-sm text-slate-600">Source code and issues</div>
                  </div>
                </a>
                <a href="mailto:contact@sindy.org" className="flex items-center space-x-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group">
                  <Users className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                  <div>
                    <div className="font-medium text-slate-900">Submit Example</div>
                    <div className="text-sm text-slate-600">Share your research</div>
                  </div>
                </a>
                <a href="#community" className="flex items-center space-x-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group">
                  <Book className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                  <div>
                    <div className="font-medium text-slate-900">Documentation</div>
                    <div className="text-sm text-slate-600">Guides and tutorials</div>
                  </div>
                </a>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}