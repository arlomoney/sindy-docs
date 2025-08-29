"use client"
import React, { useState } from 'react';
import { Wrench, Factory, Cpu, Battery, Plane, Car, Zap, Play, Code, Download, ChevronRight, CheckCircle, AlertCircle, BarChart, Settings, Gauge, LineChart, ArrowRight, BookOpen, Github, ExternalLink, Target, Lightbulb, FileCode, Coffee, Brain, Calculator, TrendingUp, Microscope, Layers, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ForEngineersPage() {
  const [selectedTutorial, setSelectedTutorial] = useState('basic');
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState(null);

  const tutorialSections = [
    {
      id: 'basic',
      title: 'Basic SINDy',
      icon: Calculator,
      description: 'Learn the fundamentals of discovering ODEs and PDEs from data',
      topics: ['Time series data collection', 'Building nonlinear libraries', 'Sparse regression', 'MATLAB examples']
    },
    {
      id: 'control',
      title: 'SINDy-MPC',
      icon: Settings,
      description: 'Model Predictive Control using SINDy models',
      topics: ['Control applications', 'Population dynamics', 'Chaotic systems', 'Aircraft control']
    },
    {
      id: 'selection',
      title: 'Model Selection',
      icon: Target,
      description: 'Methods for selecting optimal sparse models',
      topics: ['Cross-validation', 'Akaike Information Criteria', 'Stability selection', 'Hyperparameter tuning']
    },
    {
      id: 'advanced',
      title: 'Advanced Methods',
      icon: Brain,
      description: 'Ensemble methods and uncertainty quantification',
      topics: ['Ensemble SINDy', 'UQ-SINDy', 'Weak SINDy', 'Bootstrap aggregating']
    }
  ];

  const workflowSteps = [
    {
      step: 1,
      title: 'Data Collection',
      description: 'Collect time series data and compute derivatives',
      details: 'Ensure sufficient data quality and coverage of the operating space',
      code: `# Collect time series data
import numpy as np
t = np.linspace(0, 10, 1000)
x = np.column_stack([x1, x2])  # State variables
x_dot = np.gradient(x, t, axis=0)  # Time derivatives`
    },
    {
      step: 2,
      title: 'Library Construction',
      description: 'Build library of candidate nonlinear terms',
      details: 'Choose appropriate polynomial degree and interaction terms',
      code: `# Build feature library
from pysindy.feature_library import PolynomialLibrary
library = PolynomialLibrary(degree=3)
Theta = library.fit_transform(x)`
    },
    {
      step: 3,
      title: 'Sparse Regression',
      description: 'Perform sparse identification to find active terms',
      details: 'Use regularization to promote sparsity and avoid overfitting',
      code: `# Sparse regression
from pysindy.optimizers import STLSQ
optimizer = STLSQ(threshold=0.01)
Xi = optimizer.fit(Theta, x_dot).coef_`
    }
  ];

  const practicalExamples = [
    {
      title: 'Duffing Oscillator',
      equation: 'ẍ = -δẋ - αx - βx³ + γcos(ωt)',
      description: 'Classic nonlinear oscillator with cubic restoring force',
      difficulty: 'Beginner',
      notebook: 'duffing_oscillator.ipynb'
    },
    {
      title: 'Lorenz System',
      equation: 'ẋ = σ(y-x), ẏ = x(ρ-z)-y, ż = xy-βz',
      description: 'Chaotic dynamical system for advanced model selection',
      difficulty: 'Intermediate',
      notebook: 'lorenz_model_selection.ipynb'
    },
    {
      title: 'Predator-Prey Dynamics',
      equation: 'ẋ₁ = ax₁ - bx₁x₂, ẋ₂ = -cx₂ + dx₁x₂ + u',
      description: 'Population dynamics with control input',
      difficulty: 'Advanced',
      notebook: 'predator_prey_control.ipynb'
    },
    {
      title: 'Kuramoto-Sivashinsky PDE',
      equation: 'uₜ = -uuₓ - uₓₓ - uₓₓₓₓ',
      description: 'Spatiotemporal dynamics using weak form methods',
      difficulty: 'Expert',
      notebook: 'weak_sindy_pde.ipynb'
    }
  ];

  const challengesAndLimitations = [
    {
      title: 'Data Requirements',
      icon: BarChart,
      challenge: 'How much and what quality data is needed?',
      solution: 'Use active learning and ensemble methods for data efficiency'
    },
    {
      title: 'Library Selection', 
      icon: Layers,
      challenge: 'How to choose effective candidate terms?',
      solution: 'Incorporate domain knowledge and use hierarchical libraries'
    },
    {
      title: 'Optimization Algorithm',
      icon: TrendingUp,
      challenge: 'What regularization and thresholding to use?',
      solution: 'Compare STLS vs LASSO, use model selection criteria'
    },
    {
      title: 'Coordinate System',
      icon: Microscope,
      challenge: 'Do we measure the right variables?',
      solution: 'Consider coordinate transformations and observable variables'
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
                <h1 className="text-xl font-bold text-slate-900">SINDy for Engineers</h1>
                <p className="text-xs text-slate-600">Learning Tutorials & Methods</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/urban-fasel/FiltonWorkshop2024" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:text-slate-800 transition-colors">
                <Github className="w-4 h-4" />
                <span>Workshop Materials</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
<Navbar 
  currentPage="engineers" 
  sections={[
    { id: 'overview', label: 'Overview', href: '#overview' },
    { id: 'fundamentals', label: 'SINDy Fundamentals', href: '#fundamentals' },
    { id: 'tutorials', label: 'Learning Modules', href: '#tutorials' },
    { id: 'examples', label: 'Practical Examples', href: '#examples' },
    { id: 'challenges', label: 'Challenges & Solutions', href: '#challenges' },
    { id: 'getting-started', label: 'Getting Started', href: '#getting-started' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ]}
/>
        {/* Main Content */}
        <main className="flex-1 p-8 space-y-16">
          {/* Hero Section */}
          <section className="space-y-12 pb-16">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-slate-100/80 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                <span>Educational Tutorials</span>
              </div>
              <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                Learning
                <span className="bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent"> SINDy Methods</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                Comprehensive tutorials and examples for mastering sparse identification of nonlinear dynamics.
                Based on Dr. Urban Fasel's workshop materials and research.
              </p>
                          </div>

            {/* Visual SINDy Process Diagram */}
            <div className="max-w-6xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg">
                <h2 className="text-2xl font-semibold text-slate-900 text-center mb-8">The SINDy Workflow</h2>
                
                {/* Three-Step Process Visualization */}
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Step 1: Data */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                          1
                        </div>
                        <h3 className="font-semibold text-blue-900">Time Series Data</h3>
                      </div>
                      
                      {/* Data Visualization */}
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-slate-600">
                            <span>x₁(t)</span>
                            <span>x₂(t)</span>
                          </div>
                          <svg viewBox="0 0 200 80" className="w-full h-16">
                            <path d="M10,60 Q50,20 90,40 T170,30" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                            <path d="M10,40 Q50,60 90,20 T170,50" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                            <circle cx="20" cy="55" r="2" fill="#3b82f6"/>
                            <circle cx="40" cy="35" r="2" fill="#3b82f6"/>
                            <circle cx="60" cy="45" r="2" fill="#3b82f6"/>
                            <circle cx="80" cy="25" r="2" fill="#3b82f6"/>
                            <circle cx="100" cy="35" r="2" fill="#3b82f6"/>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="text-xs text-blue-800 space-y-1">
                        <div>• Collect measurements</div>
                        <div>• Compute derivatives</div>
                        <div>• Ensure data quality</div>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-slate-400" />
                    </div>
                  </div>

                  {/* Step 2: Library */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                          2
                        </div>
                        <h3 className="font-semibold text-purple-900">Feature Library</h3>
                      </div>
                      
                      {/* Library Visualization */}
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-3 gap-2 text-xs text-center text-slate-800">
                          <div className="bg-slate-50 rounded px-2 py-1 font-mono">1</div>
                          <div className="bg-slate-50 rounded px-2 py-1 font-mono">x₁</div>
                          <div className="bg-slate-50 rounded px-2 py-1 font-mono">x₂</div>
                          <div className="bg-slate-50 rounded px-2 py-1 font-mono">x₁²</div>
                          <div className="bg-slate-50 rounded px-2 py-1 font-mono">x₁x₂</div>
                          <div className="bg-slate-50 rounded px-2 py-1 font-mono">x₂²</div>
                          <div className="bg-slate-50 rounded px-2 py-1 font-mono">x₁³</div>
                          <div className="bg-slate-50 rounded px-2 py-1 font-mono">⋯</div>
                          <div className="bg-slate-50 rounded px-2 py-1 font-mono">sin(x)</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-purple-800 space-y-1">
                        <div>• Polynomial terms</div>
                        <div>• Trigonometric functions</div>
                        <div>• Custom basis functions</div>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-slate-400" />
                    </div>
                  </div>

                  {/* Step 3: Sparse Regression */}
                  <div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                          3
                        </div>
                        <h3 className="font-semibold text-green-900">Sparse Model</h3>
                      </div>
                      
                      {/* Model Visualization */}
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-slate-800">ẋ₁ =</span>
                            <span className="font-mono text-green-900">-0.1x₁ + x₂</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-slate-800">ẋ₂ =</span>
                            <span className="font-mono text-green-900">-x₁ - 0.2x₂ + 0.3x₁³</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <div className="flex items-center justify-center space-x-4 text-xs text-slate-800">
                            <span className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Active terms
                            </span>
                            <span className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                              Pruned terms
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-green-800 space-y-1">
                        <div>• Regularized regression</div>
                        <div>• Automatic term selection</div>
                        <div>• Interpretable equations</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Equation at Bottom */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <div className="text-center">
                    <p className="text-sm text-slate-600 mb-3">Discover governing equations of the form:</p>
                    <div className="bg-slate-50 rounded-lg p-4 max-w-md mx-auto">
                      <div className="font-mono text-lg text-slate-900">ẋ = f(x)</div>
                      <div className="text-sm text-slate-800 mt-1">where f(x) is sparse in a library of candidate functions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Benefits */}
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Discover Physics</h3>
                  <p className="text-slate-600">Learn to extract governing equations from experimental data without prior knowledge of system dynamics.</p>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Master Methods</h3>
                  <p className="text-slate-600">Understand advanced techniques like ensemble methods, uncertainty quantification, and weak form PDEs.</p>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Settings className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Build Controllers</h3>
                  <p className="text-slate-600">Apply SINDy models for model predictive control and real-time system optimization.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SINDy Fundamentals */}
          <section id="fundamentals" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Calculator className="h-4 w-4" />
                Fundamentals
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Learning ODEs and PDEs from Data</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                Understand the core SINDy methodology for discovering governing equations
              </p>
            </div>

            {/* SINDy Workflow */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">The SINDy Algorithm</h3>
                <div className="bg-slate-50 rounded-lg p-6 max-w-3xl mx-auto">
                  <div className="text-center space-y-2">
                    <div className="text-lg font-mono text-slate-900">ẋ = f(x)</div>
                    <div className="text-sm text-slate-800">Data → Dynamics → Model Structure & Coefficients</div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {workflowSteps.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h4 className="text-xl font-semibold text-slate-900">{step.title}</h4>
                        <p className="text-slate-600 mt-1">{step.description}</p>
                        <p className="text-sm text-slate-500 mt-2">{step.details}</p>
                      </div>
                      
                      <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-slate-300 font-mono">
                          {step.code}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tutorial Sections */}
          <section id="tutorials" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                <BookOpen className="h-4 w-4" />
                Interactive Tutorials
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Master SINDy Methods</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                Progress through structured learning modules from basic concepts to advanced techniques
              </p>
            </div>

            {/* Tutorial Navigation */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {tutorialSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setSelectedTutorial(section.id)}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        selectedTutorial === section.id
                          ? 'border-slate-300 bg-slate-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Icon className="w-8 h-8 text-slate-600 mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-2">{section.title}</h3>
                      <p className="text-sm text-slate-600 mb-3">{section.description}</p>
                      <ul className="space-y-1">
                        {section.topics.map((topic, index) => (
                          <li key={index} className="text-xs text-slate-500 flex items-center gap-1">
                            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>

              {/* Tutorial Content */}
              {selectedTutorial === 'basic' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Part 1: Basic SINDy</h3>
                  <div className="prose max-w-none text-slate-600">
                    <p>
                      Learn the fundamental concepts of SINDy for discovering governing equations from time series data.
                      This tutorial covers both ordinary differential equations (ODEs) and partial differential equations (PDEs).
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6 text-slate-800">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900">Key Concepts</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <span>Time series data collection and preprocessing</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <span>Building libraries of nonlinear candidate terms</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <span>Sparse regression for term selection</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <span>Challenges and limitations of "Vanilla" SINDy</span>
                        </li>
                      </ul>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800 font-medium mb-2">💡 Learning Objectives</p>
                        <p className="text-sm text-blue-700">
                          By the end of this tutorial, you'll understand how to identify the Duffing oscillator 
                          equation and other nonlinear systems from experimental data.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900">Example: Duffing Oscillator</h4>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <div className="text-center space-y-2 mb-4">
                          <div className="font-mono text-lg text-slate-900">ẍ = -δẋ - αx - βx³ + γcos(ωt)</div>
                          <div className="text-sm text-slate-700">Nonlinear oscillator with cubic term</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Initial conditions:</span>
                            <div className="font-mono mt-1">x₁(0) = 0, x₂(0) = 1</div>
                          </div>
                          <div>
                            <span className="font-medium">Parameters:</span>
                            <div className="font-mono mt-1">δ=0.2, α=1, β=0.05</div>
                          </div>
                        </div>
                      </div>

<div className="flex gap-2">
  <a
    href="https://github.com/urban-fasel/FiltonWorkshop2024/tree/main/Tutorials"
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm flex items-center justify-center"
  >
    <Play className="w-4 h-4 inline mr-2" />
    MATLAB Tutorial
  </a>

  <a
    href="https://github.com/dynamicslab/pysindy/tree/master/examples"
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center"
  >
    <Code className="w-4 h-4 inline mr-2" />
    Python Version
  </a>
</div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTutorial === 'control' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Part 2: SINDy-MPC (Model Predictive Control)</h3>
                  <div className="prose max-w-none text-slate-600">
                    <p>
                      Discover how to use SINDy models for nonlinear control applications. Learn to stabilize 
                      chaotic systems, control population dynamics, and optimize therapeutic strategies.
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900">Control Applications</h4>
                      <div className="space-y-3">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h5 className="font-medium text-green-900 mb-2">Predator-Prey Control</h5>
                          <div className="font-mono text-sm text-green-900 mb-2">
                            ẋ₁ = ax₁ - bx₁x₂<br/>
                            ẋ₂ = -cx₂ + dx₁x₂ + u
                          </div>
                          <p className="text-sm text-green-800">Stabilize population dynamics at fixed points</p>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h5 className="font-medium text-purple-900 mb-2">Chaotic Logistic Map</h5>
                          <div className="font-mono text-sm text-purple-900 mb-2">
                            x_(k+1) = μx_k(1-x_k) + η_k
                          </div>
                          <p className="text-sm text-purple-800">Control bifurcation parameter μ for stability</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900">Training Strategies</h4>
                      <div className="space-y-3 text-sm text-slate-900">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 text-slate-900"></div>
                          <div>
                            <span className="font-medium text-slate-900">Schroeder Sweep:</span> Phase-shifted sum of sines for system excitation
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                          <div>
                            <span className="font-medium text-slate-900">Chirp Signals:</span> Frequency increase with time for broad spectrum coverage
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                          <div>
                            <span className="font-medium text-slate-900">Safe Excitation:</span> Maximize information gain while respecting constraints
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <p className="text-sm text-amber-800 font-medium mb-1">📊 Performance Comparison</p>
                        <p className="text-sm text-amber-700">
                          SINDy outperforms DMD and neural networks in low-data regimes for control applications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTutorial === 'selection' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Part 3: Model Selection</h3>
                  <div className="prose max-w-none text-slate-600">
                    <p>
                      Model selection is crucial for producing interpretable, generalizable models with high predictive capability.
                      Learn three key methods for selecting optimal sparse models.
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-3">Cross-Validation</h4>
                      <div className="space-y-2 text-sm text-blue-800">
                        <p>Partition data into k random subsamples</p>
                        <p>Train on k-1 subsamples, test on withheld sample</p>
                        <p>Select λ with lowest average test error</p>
                      </div>
                      <div className="mt-3 font-mono text-xs text-blue-900 bg-blue-100 p-2 rounded">
                        ε_λ = (1/k) Σ ε_k
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-3">Akaike Information Criteria</h4>
                      <div className="space-y-2 text-sm text-green-800">
                        <p>Balance model prediction error and complexity</p>
                        <p>Penalize models with more parameters</p>
                        <p>Find minimum in AIC curve</p>
                      </div>
                      <div className="mt-3 font-mono text-xs text-green-900 bg-green-100 p-2 rounded">
                        AIC = -2ln(L) + 2k
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-3">Stability Selection</h4>
                      <div className="space-y-2 text-sm text-purple-800">
                        <p>Calculate coefficient stability over regularization path</p>
                        <p>Use bootstrap subsampling (size N/2)</p>
                        <p>Select terms with Π_k(λ) &gt; π_th = 0.8</p>
                      </div>
                      <div className="mt-3 font-mono text-xs text-purple-900 bg-purple-100 p-2 rounded">
                        Π_k(λ) = P(coefficient ≠ 0)
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Tutorial Implementation</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Compare all three methods on the Lorenz system with noisy data to understand their trade-offs.
                    </p>
<div className="flex gap-2">
  <a
    href="https://github.com/urban-fasel/FiltonWorkshop2024/tree/main/Tutorials"
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm flex items-center justify-center"
  >
    <Play className="w-4 h-4 inline mr-2" />
    MATLAB Tutorial
  </a>

  <a
    href="https://github.com/dynamicslab/pysindy/tree/master/examples"
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center"
  >
    <Code className="w-4 h-4 inline mr-2" />
    Python Version
  </a>
</div>
                  </div>
                </div>
              )}

              {selectedTutorial === 'advanced' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Part 4: Advanced Methods</h3>
                  <div className="prose max-w-none text-slate-600">
                    <p>
                      Explore cutting-edge SINDy methods for handling noise, uncertainty quantification, 
                      and partial differential equations using ensemble and weak form approaches.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                        <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Ensemble SINDy
                        </h4>
                        <div className="space-y-3 text-sm text-amber-800">
                          <p>Bootstrap aggregating for robust model identification</p>
                          <p>Reduce variance and avoid overfitting</p>
                          <p>Active learning for efficient data collection</p>
                        </div>
                        <div className="mt-4 bg-amber-100 rounded p-3">
                          <p className="text-xs text-amber-800 font-medium">Best Practice: Bragging (robust bagging)</p>
                          <p className="text-xs text-amber-800">Aggregate by taking median of identified models</p>
                        </div>
                      </div>

                      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                        <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                          <Brain className="w-5 h-5" />
                          UQ-SINDy
                        </h4>
                        <div className="space-y-3 text-sm text-indigo-800">
                          <p>Bayesian uncertainty quantification</p>
                          <p>Sparsifying priors (spike-and-slab, horseshoe)</p>
                          <p>MCMC sampling for coefficient distributions</p>
                        </div>
                        <div className="mt-4 bg-indigo-100 rounded p-3">
                          <p className="text-xs text-indigo-800 font-medium">Computational Efficiency</p>
                          <p className="text-xs text-indigo-800">E-SINDy ≈ 3000× faster than UQ-SINDy</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Layers className="w-5 h-5" />
                        Weak SINDy for PDEs
                      </h4>
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <p className="text-sm text-slate-600">
                            Move derivatives off data onto test functions via integration by parts.
                            Ideal for noisy or incomplete spatiotemporal data.
                          </p>
                          <div className="bg-white rounded p-3 border">
                            <p className="text-xs text-slate-700 mb-1">Example: Kuramoto-Sivashinsky</p>
                            <div className="font-mono text-sm text-slate-900">u_t = -uu_x - u_xx - u_xxxx</div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <p className="text-sm text-slate-600">
                            Test functions are smooth and compactly supported, vanishing at domain boundaries.
                          </p>
                          <div className="bg-white rounded p-3 border">
                            <p className="text-xs text-slate-700 mb-1">Test function example:</p>
                            <div className="font-mono text-sm text-slate-900">φ(x,t) = (x² - 1)⁴(t² - 1)³</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Practical Examples */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Code className="h-4 w-4" />
                Practical Examples
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Hands-On Learning</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                Work through real examples with complete code implementations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {practicalExamples.map((example, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{example.title}</h3>
                      <div className="bg-slate-50 rounded p-2 mt-2 font-mono text-sm text-slate-900">
                        {example.equation}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      example.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      example.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      example.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {example.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4">{example.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <FileCode className="w-4 h-4" />
                      {example.notebook}
                    </span>
                    <button className="text-slate-700 hover:text-slate-900 font-medium text-sm flex items-center gap-1">
                      Open Tutorial
                      <ExternalLink className="w-3 h-3" href = "https://github.com/urban-fasel/FiltonWorkshop2024/blob/main/Tutorials/SINDy/duffing.m" />
              
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Challenges and Solutions */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                <AlertCircle className="h-4 w-4" />
                Challenges & Solutions
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Common Challenges in SINDy</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                Learn to identify and overcome typical limitations in practical applications
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {challengesAndLimitations.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-red-700 mb-3 font-medium">Challenge: {item.challenge}</p>
                        <p className="text-sm text-green-700">✓ Solution: {item.solution}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Getting Started Resources */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-800 px-4 py-2 rounded-full text-sm font-medium">
                <Lightbulb className="h-4 w-4" />
                Getting Started
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Choose Your Learning Path</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                Multiple ways to start learning SINDy based on your preferences
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Factory className="w-5 h-5" />
                  MATLAB Path
                </h3>
                <p className="text-sm text-blue-800 mb-4">
                  Use Urban's original MATLAB tutorials and examples
                </p>
                <div className="space-y-2 text-sm">
                  <a href="https://matlab.mathworks.com/" target="_blank" rel="noopener noreferrer" 
                     className="block text-blue-700 hover:text-blue-900 underline">
                    → MATLAB Online
                  </a>
                  <a href="https://github.com/urban-fasel/FiltonWorkshop2024" target="_blank" rel="noopener noreferrer"
                     className="block text-blue-700 hover:text-blue-900 underline">
                    → Workshop Tutorials
                  </a>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Python Path
                </h3>
                <p className="text-sm text-green-800 mb-4">
                  Learn with PySINDy - the Python implementation
                </p>
                <div className="space-y-2 text-sm">
                  <a href="https://github.com/dynamicslab/pysindy" target="_blank" rel="noopener noreferrer"
                     className="block text-green-700 hover:text-green-900 underline">
                    → PySINDy Repository
                  </a>
                  <a href="#" className="block text-green-700 hover:text-green-900 underline">
                    → Python Examples
                  </a>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Julia Path
                </h3>
                <p className="text-sm text-purple-800 mb-4">
                  Use SciML ecosystem for high-performance computing
                </p>
                <div className="space-y-2 text-sm">
                  <a href="https://docs.sciml.ai/DataDrivenDiffEq/stable/" target="_blank" rel="noopener noreferrer"
                     className="block text-purple-700 hover:text-purple-900 underline">
                    → Julia SciML
                  </a>
                  <a href="#" className="block text-purple-700 hover:text-purple-900 underline">
                    → Performance Examples
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900">Contact</h3>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                <div className="flex items-center gap-6">
                  {/* Profile Image */}
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white text-lg font-bold">UF</span>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">Professor Urban Fasel</h4>
                        <p className="text-slate-600 text-sm mb-1">London School of Economics</p>
                        <p className="text-slate-500 text-xs">Questions about engineering applications of SINDy</p>
                      </div>
                      
                      {/* Contact Links */}
                      <div className="flex gap-2 ml-4">
                        <a 
                          href="mailto:u.fasel@lse.ac.uk" 
                          className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors group"
                          title="Email Professor Urban Fasel"
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

            {/* Workshop Materials CTA */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Complete Workshop Materials
              </h3>
              <p className="text-lg text-slate-200 mb-6 max-w-2xl mx-auto">
                Access all slides, tutorials, and code examples from Dr. Urban Fasel's 
                comprehensive SINDy workshops and research group.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="https://github.com/urban-fasel/FiltonWorkshop2024"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium">Filton Workshop 2024</span>
                </a>
                <a
                  href="https://github.com/urban-fasel/EnsembleSINDy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Code className="w-5 h-5" />
                  <span className="font-medium">Ensemble SINDy</span>
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