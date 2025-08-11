"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Download, Github, Book, Zap, Users, CheckCircle, AlertCircle, Code, Terminal, Lightbulb, Rocket, Star, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PySINDyPage() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedDemo, setSelectedDemo] = useState('lorenz');

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
        <Navbar currentPage="pysindy" />

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-16">
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
                      <span className="text-green-400 font-mono text-sm">pip install (recommended)</span>
                      <button className="text-slate-400 hover:text-white text-xs">Copy</button>
                    </div>
                    <code className="text-green-400 font-mono">pip install pysindy</code>
                  </div>
                  
                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 font-mono text-sm">conda install</span>
                      <button className="text-slate-400 hover:text-white text-xs">Copy</button>
                    </div>
                    <code className="text-blue-400 font-mono">conda install -c conda-forge pysindy</code>
                  </div>
                  
                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-400 font-mono text-sm">development version</span>
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
                Get started with pySINDy in 5 minutes
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900">Basic Usage Example</h3>                
                  
                  <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
                      <span className="text-slate-300 font-mono text-sm flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2">lorenz_example.py</span>
                      </span>
                      <button className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-slate-700 transition-colors">
                        Copy
                      </button>
                    </div>
                    
                    <pre className="text-sm text-slate-300 overflow-x-auto p-6 bg-slate-900 font-mono leading-relaxed">
    <code>{`import numpy as np
import matplotlib.pyplot as plt
from pysindy import SINDy

# Generate training data for the Lorenz system
dt = 0.002
t_train = np.arange(0, 10, dt)
x0_train = [-8, 8, 27]

def lorenz(state, t):
    x, y, z = state
    return [10.0 * (y - x), x * (28.0 - z) - y, x * y - (8.0 / 3.0) * z]

# Integrate the Lorenz equations
from scipy.integrate import odeint
x_train = odeint(lorenz, x0_train, t_train)

# Fit the SINDy model
model = SINDy()
model.fit(x_train, t=dt)

# Print the discovered equations
model.print()

# Make predictions
x_test = model.predict(x_train, t=dt)

# Plot results
plt.figure(figsize=(12, 4))
plt.subplot(131)
plt.plot(t_train, x_train[:, 0], 'b-', label='True')
plt.plot(t_train, x_test[:, 0], 'r--', label='SINDy')
plt.xlabel('Time')
plt.ylabel('x')
plt.legend()
plt.show()`}</code>
                    </pre>
                  </div>
                </div>
              </div>
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">What this code does:</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Generates synthetic data from the Lorenz system</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Fits a SINDy model to discover the equations</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Makes predictions and visualizes results</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">Expected output:</h4>
                    <div className="text-slate-600 p-3 rounded-lg font-mono text-sm">
                      <div>x' = -10.000 x + 10.000 y</div>
                      <div>y' = 27.994 x - 0.999 y - 1.000 x z</div>
                      <div>z' = -2.666 z + 1.000 x y</div>
                    </div>
                  </div>
                </div>
          </section>

          {/* Tutorials Section */}
          <section id="tutorials" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                <Lightbulb className="h-4 w-4" />
                Tutorials & Guides
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Learn pySINDy Step by Step</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                From beginner tutorials to advanced techniques
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Getting Started',
                  description: 'Learn the basics of SINDy and your first model',
                  level: 'Beginner',
                  time: '15 min',
                  color: 'green'
                },
                {
                  title: 'Handling Noisy Data',
                  description: 'Robust methods for real-world applications',
                  level: 'Intermediate',
                  time: '30 min',
                  color: 'blue'
                },
                {
                  title: 'Custom Feature Libraries',
                  description: 'Extend pySINDy with your own functions',
                  level: 'Advanced',
                  time: '45 min',
                  color: 'purple'
                },
                {
                  title: 'Control Systems',
                  description: 'SINDy for systems with external inputs',
                  level: 'Intermediate',
                  time: '25 min',
                  color: 'blue'
                },
                {
                  title: 'PDE Discovery',
                  description: 'Find governing equations for PDEs',
                  level: 'Advanced',
                  time: '60 min',
                  color: 'purple'
                },
                {
                  title: 'Ensemble Methods',
                  description: 'Improve robustness with multiple models',
                  level: 'Advanced',
                  time: '40 min',
                  color: 'purple'
                }
              ].map((tutorial, i) => (
                <div key={i} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-slate-900">{tutorial.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        tutorial.color === 'green' ? 'bg-green-100 text-green-700' :
                        tutorial.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {tutorial.level}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm">{tutorial.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{tutorial.time}</span>
                      <button className="text-slate-700 hover:text-slate-800 text-sm font-medium flex items-center space-x-1">
                        <span>Start</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
                  <a href="https://github.com/dynamicslab/pysindy/issues" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                    <Github className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900">GitHub Issues</div>
                      <div className="text-sm text-slate-600">Bug reports and feature requests</div>
                    </div>
                  </a>
                  <a href="https://github.com/dynamicslab/pysindy/discussions" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                    <Users className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900">Discussions</div>
                      <div className="text-sm text-slate-600">Community Q&A and discussions</div>
                    </div>
                  </a>
                  <a href="https://stackoverflow.com/questions/tagged/pysindy" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                    <Book className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900">Stack Overflow</div>
                      <div className="text-sm text-slate-600">Tag your questions with 'pysindy'</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Contribute</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Development</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Help improve pySINDy by contributing code, documentation, or examples.
                    </p>
                    <a href="https://opensource.guide/" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-800 text-sm font-medium">
                      Contributing Guide →
                    </a>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Research</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Share your research applications and case studies with the community.
                    </p>
                    <a href="mailto:contact@sindy.org" className="text-slate-700 hover:text-slate-800 text-sm font-medium">
                      Submit Example →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          {/*Contact Card*/}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">Contact</h3>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
            <div className="flex items-center gap-6">
              {/* Profile Image */}
              <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white text-lg font-bold">AL</span>
              </div>
              
              {/* Contact Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Dr. Ana Larranaga</h4>
                    <p className="text-slate-600 text-sm mb-1">University of Washington</p>
                    <p className="text-slate-500 text-xs">Questions about pySINDy implementation and issues</p>
                  </div>
                  
                  {/* Contact Links */}
                  <div className="flex gap-2 ml-4">
                    <a 
                      href="mailto:alarranaga@uw.edu" 
                      className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors group"
                      title="Email Dr. Larranaga"
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
          
            {/* FAQ Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Frequently Asked Questions</h3>
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

        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 