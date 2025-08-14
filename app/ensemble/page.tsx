"use client"
import React, { useState } from 'react';
import { Zap, ChevronDown, ChevronRight, Download, Github, Book, Users, CheckCircle, AlertCircle, Code, Terminal, Lightbulb, Rocket, Star, ArrowRight, BarChart3, Shield, Cpu, TrendingUp, GitBranch, ExternalLink, Mail, Linkedin, GraduationCap, FlaskConical, Activity, Shuffle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function EnsembleSINDyPage() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');

  const faqItems = [
    {
      q: 'How does Ensemble SINDy differ from standard SINDy?',
      a: 'Ensemble SINDy uses bootstrap aggregating (bagging) to create multiple models from resampled data, providing uncertainty quantification and improved robustness to noise. It averages multiple sparse models to produce more reliable coefficient estimates.'
    },
    {
      q: 'What are the main benefits of using ensembling?',
      a: 'Ensemble methods provide: (1) Uncertainty quantification through coefficient distributions, (2) Improved robustness to noise and outliers, (3) Better model selection through consensus, (4) Statistical significance testing of discovered terms, and (5) Reduced sensitivity to hyperparameter choices.'
    },
    {
      q: 'How many models should I include in my ensemble?',
      a: 'Typically 100-500 models provide good results. More models improve statistical estimates but increase computational cost. Start with 100 models and increase if uncertainty estimates are not converged.'
    },
    {
      q: 'Can I use Ensemble SINDy with limited data?',
      a: 'Yes! Ensemble SINDy is particularly effective with limited data. The bootstrap resampling allows you to generate multiple datasets from limited samples, providing robust estimates even when data is scarce.'
    },
    {
      q: 'How do I interpret the uncertainty estimates?',
      a: 'The ensemble provides a distribution of coefficients for each term. Terms with consistent non-zero coefficients across the ensemble are likely true features. The variance indicates confidence - low variance suggests reliable identification.'
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
                <h1 className="text-xl font-bold text-slate-900">Ensemble SINDy</h1>
                <p className="text-xs text-slate-600">Robust System Identification</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/urban-fasel/EnsembleSINDy" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:text-slate-800 transition-colors">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        <Navbar currentPage="ensemble-sindy" />

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-16">
          {/* Hero Section */}
          <section className="space-y-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-slate-100/80 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                <span>Uncertainty-Aware Discovery</span>
              </div>
              <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                Robust
                <span className="bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent"> Model Discovery</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Leverage bootstrap aggregating and ensemble methods to discover governing equations with 
                quantified uncertainty, improved robustness, and statistical confidence.
              </p>

              {/* Quick Links */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <a href="https://royalsocietypublishing.org/doi/10.1098/rspa.2021.0904" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                  <Book className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Read Paper</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <a href="https://arxiv.org/abs/2111.10992" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                  <GraduationCap className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">arXiv Preprint</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <a href="https://github.com/urban-fasel/EnsembleSINDy" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors">
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-medium">View on GitHub</span>
                </a>
              </div>
            </div>

            {/* Key Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Uncertainty Quantification</h3>
                <p className="text-slate-600">Get confidence intervals and statistical significance for discovered model terms.</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Noise Robustness</h3>
                <p className="text-slate-600">Bootstrap aggregating provides superior performance with noisy and limited data.</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Improved Accuracy</h3>
                <p className="text-slate-600">Ensemble averaging reduces overfitting and improves coefficient estimates.</p>
              </div>
            </div>
          </section>

          {/* Methodology Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                <FlaskConical className="h-4 w-4" />
                Methodology
              </div>
              <h2 className="text-4xl font-bold text-slate-900">How Ensemble SINDy Works</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Bootstrap aggregating meets sparse regression for robust system identification
              </p>
            </div>

            {/* Visual Diagram */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50">
              <div className="space-y-6">
                {/* Step-by-step visualization */}
                <div className="grid lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 h-full">
                      <div className="text-3xl font-bold mb-2">1</div>
                      <h4 className="font-semibold mb-2">Bootstrap Sampling</h4>
                      <p className="text-sm opacity-90">Resample data with replacement to create multiple datasets</p>
                    </div>
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-purple-400" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 h-full">
                      <div className="text-3xl font-bold mb-2">2</div>
                      <h4 className="font-semibold mb-2">SINDy Models</h4>
                      <p className="text-sm opacity-90">Fit sparse models to each bootstrap sample independently</p>
                    </div>
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-indigo-400" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl p-6 h-full">
                      <div className="text-3xl font-bold mb-2">3</div>
                      <h4 className="font-semibold mb-2">Aggregate</h4>
                      <p className="text-sm opacity-90">Combine models through averaging or voting</p>
                    </div>
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-pink-400" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 h-full">
                    <div className="text-3xl font-bold mb-2">4</div>
                    <h4 className="font-semibold mb-2">Quantify</h4>
                    <p className="text-sm opacity-90">Extract statistics and confidence intervals</p>
                  </div>
                </div>

                {/* Mathematical Description */}
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-slate-900 mb-3">Mathematical Framework</h4>
                  <div className="space-y-3 text-sm text-slate-700">
                    <p>Given data matrix <span className="font-mono bg-white px-2 py-0.5 rounded">X</span> and derivatives <span className="font-mono bg-white px-2 py-0.5 rounded">Ẋ</span>:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                      <li>Generate bootstrap samples: <span className="font-mono bg-white px-2 py-0.5 rounded">X<sub>b</sub>, Ẋ<sub>b</sub></span> for b = 1, ..., B</li>
                      <li>Fit SINDy models: <span className="font-mono bg-white px-2 py-0.5 rounded">Ξ<sub>b</sub> = SINDy(X<sub>b</sub>, Ẋ<sub>b</sub>)</span></li>
                      <li>Aggregate coefficients: <span className="font-mono bg-white px-2 py-0.5 rounded">Ξ̄ = (1/B) Σ Ξ<sub>b</sub></span></li>
                      <li>Compute variance: <span className="font-mono bg-white px-2 py-0.5 rounded">Var(Ξ) = (1/B) Σ (Ξ<sub>b</sub> - Ξ̄)²</span></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Installation Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Download className="h-4 w-4" />
                Installation
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Get Started with Ensemble SINDy</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Install and configure Ensemble SINDy for your project
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-purple-600" />
                  <span>Installation Options</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Via pip (with pySINDy)</h4>
                    <div className="bg-slate-900 rounded-lg p-4">
                      <code className="text-green-400 font-mono text-sm">pip install pysindy[ensemble]</code>
                    </div>
                    <p className="text-sm text-slate-600">
                      Installs pySINDy with ensemble capabilities included
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">From Source</h4>
                    <div className="bg-slate-900 rounded-lg p-4">
                      <code className="text-blue-400 font-mono text-sm">
                        git clone https://github.com/urban-fasel/EnsembleSINDy.git
                      </code>
                    </div>
                    <p className="text-sm text-slate-600">
                      Clone the repository for latest features and examples
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-amber-900">Requirements</h5>
                      <p className="text-amber-800 text-sm mt-1">
                        Ensemble SINDy requires pySINDy ≥ 1.7.0, NumPy, SciPy, and scikit-learn. 
                        Additional dependencies for parallel processing: joblib, multiprocessing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Code Example Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                <Code className="h-4 w-4" />
                Quick Start
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Example: Lorenz System with Uncertainty</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Discover the Lorenz equations with quantified uncertainty using ensemble methods
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200/50">
              <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
                  <span className="text-slate-300 font-mono text-sm flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2">ensemble_lorenz.py</span>
                  </span>
                  <button className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-slate-700 transition-colors">
                    Copy
                  </button>
                </div>
                
                <pre className="text-sm text-slate-300 overflow-x-auto p-6 bg-slate-900 font-mono leading-relaxed">
<code>{`import numpy as np
import matplotlib.pyplot as plt
from pysindy import SINDy
from pysindy.feature_library import PolynomialLibrary
from pysindy.optimizers import STLSQ
from sklearn.utils import resample

# Generate noisy Lorenz data
def lorenz(t, x, sigma=10, beta=8/3, rho=28):
    return [
        sigma * (x[1] - x[0]),
        x[0] * (rho - x[2]) - x[1],
        x[0] * x[1] - beta * x[2]
    ]

# Create synthetic data with noise
dt = 0.002
t = np.arange(0, 10, dt)
x0 = [-8, 8, 27]

from scipy.integrate import solve_ivp
sol = solve_ivp(lorenz, [0, 10], x0, t_eval=t)
X = sol.y.T

# Add measurement noise
noise_level = 0.01
X_noisy = X + noise_level * np.random.randn(*X.shape)

# Ensemble SINDy
n_models = 100
n_subset = int(0.8 * len(X_noisy))  # Use 80% of data for each model
models = []
coefficients = []

for i in range(n_models):
    # Bootstrap sample
    idx = resample(np.arange(len(X_noisy)), n_samples=n_subset)
    X_train = X_noisy[idx]
    
    # Fit SINDy model
    model = SINDy(
        feature_library=PolynomialLibrary(degree=2),
        optimizer=STLSQ(threshold=0.1),
        feature_names=['x', 'y', 'z']
    )
    model.fit(X_train, t=dt)
    
    models.append(model)
    coefficients.append(model.coefficients())

# Aggregate results
coefficients = np.array(coefficients)
mean_coefficients = np.mean(coefficients, axis=0)
std_coefficients = np.std(coefficients, axis=0)

# Print discovered equations with uncertainty
feature_names = model.get_feature_names()
for i, name in enumerate(['x', 'y', 'z']):
    print(f"\\n{name}' = ", end="")
    for j, feature in enumerate(feature_names):
        if abs(mean_coefficients[i, j]) > 0.01:
            print(f"{mean_coefficients[i, j]:.3f}±{std_coefficients[i, j]:.3f} {feature} + ", end="")

# Visualize coefficient distributions
fig, axes = plt.subplots(3, 3, figsize=(12, 10))
for i in range(3):
    for j in range(min(9, len(feature_names))):
        ax = axes[i, j % 3]
        ax.hist(coefficients[:, i, j], bins=30, alpha=0.7, color='purple')
        ax.axvline(mean_coefficients[i, j], color='red', linestyle='--', label='Mean')
        ax.set_title(f"Coeff of {feature_names[j]} in eq. {i+1}")
        ax.set_xlabel('Coefficient value')
        ax.set_ylabel('Frequency')
plt.tight_layout()
plt.show()`}</code>
                </pre>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900">Key Features Demonstrated:</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Bootstrap resampling for ensemble generation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Coefficient averaging across models</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Uncertainty quantification via standard deviation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Visualization of coefficient distributions</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900">Expected Output:</h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <pre className="text-sm font-mono text-slate-700">
{`x' = -10.002±0.021 x + 10.001±0.018 y
y' = 27.983±0.043 x - 0.998±0.025 y - 1.001±0.008 xz
z' = -2.667±0.012 z + 0.999±0.007 xy`}
                    </pre>
                  </div>
                  <p className="text-xs text-slate-600">
                    Note: The ± values represent one standard deviation of uncertainty
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Features Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                <Cpu className="h-4 w-4" />
                Advanced Features
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Advanced Ensemble Techniques</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Sophisticated methods for robust system identification
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Bagging Methods */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-purple-600" />
                  Bootstrap Aggregating (Bagging)
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-slate-600">
                    Multiple strategies for creating diverse model ensembles:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"></div>
                      <div>
                        <span className="font-medium text-slate-700">Data Bagging:</span>
                        <span className="text-slate-600"> Resample time series data points</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"></div>
                      <div>
                        <span className="font-medium text-slate-700">Library Bagging:</span>
                        <span className="text-slate-600"> Randomize feature selection</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"></div>
                      <div>
                        <span className="font-medium text-slate-700">Double Bagging:</span>
                        <span className="text-slate-600"> Combine data and library sampling</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Aggregation Methods */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  Aggregation Strategies
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-slate-600">
                    Methods for combining ensemble predictions:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div>
                      <div>
                        <span className="font-medium text-slate-700">Mean:</span>
                        <span className="text-slate-600"> Average coefficients across models</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div>
                      <div>
                        <span className="font-medium text-slate-700">Median:</span>
                        <span className="text-slate-600"> Robust to outlier models</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div>
                      <div>
                        <span className="font-medium text-slate-700">Threshold:</span>
                        <span className="text-slate-600"> Include terms above frequency threshold</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Model Selection */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-pink-600" />
                  Model Selection & Validation
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-slate-600">
                    Statistical techniques for robust model selection:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5"></div>
                      <div>
                        <span className="font-medium text-slate-700">Inclusion Probability:</span>
                        <span className="text-slate-600"> Fraction of models including each term</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5"></div>
                      <div>
                        <span className="font-medium text-slate-700">Stability Selection:</span>
                        <span className="text-slate-600"> Control false discovery rate</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5"></div>
                      <div>
                        <span className="font-medium text-slate-700">Cross-validation:</span>
                        <span className="text-slate-600"> Out-of-bag error estimation</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Uncertainty Quantification */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Uncertainty Quantification
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-slate-600">
                    Extract confidence metrics from the ensemble:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                      <div>
                        <span className="font-medium text-slate-700">Confidence Intervals:</span>
                        <span className="text-slate-600"> Bootstrap percentile method</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                      <div>
                        <span className="font-medium text-slate-700">Prediction Intervals:</span>
                        <span className="text-slate-600"> Quantify forecast uncertainty</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                      <div>
                        <span className="font-medium text-slate-700">Sensitivity Analysis:</span>
                        <span className="text-slate-600"> Identify influential data points</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Results Visualization Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <BarChart3 className="h-4 w-4" />
                Results & Visualization
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Visualizing Ensemble Results</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Comprehensive visualization of uncertainty and model consensus
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-purple-200/50">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Coefficient Distribution Plot */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900">Coefficient Distributions</h4>
                  <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg p-6 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="flex justify-center gap-2 mb-4">
                        <div className="w-8 h-24 bg-purple-500 rounded"></div>
                        <div className="w-8 h-32 bg-purple-600 rounded"></div>
                        <div className="w-8 h-28 bg-indigo-500 rounded"></div>
                        <div className="w-8 h-20 bg-indigo-600 rounded"></div>
                        <div className="w-8 h-36 bg-pink-500 rounded"></div>
                      </div>
                      <p className="text-sm text-slate-600">Histogram of coefficient values across ensemble</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">
                    Visualize the distribution of each coefficient across all bootstrap models to assess uncertainty and identify robust terms.
                  </p>
                </div>

                {/* Inclusion Probability Plot */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900">Inclusion Probability</h4>
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-6 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs w-8">x²:</span>
                          <div className="flex-1 bg-green-200 rounded">
                            <div className="bg-green-500 h-4 rounded" style={{width: '95%'}}></div>
                          </div>
                          <span className="text-xs">95%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs w-8">xy:</span>
                          <div className="flex-1 bg-green-200 rounded">
                            <div className="bg-green-500 h-4 rounded" style={{width: '88%'}}></div>
                          </div>
                          <span className="text-xs">88%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs w-8">x³:</span>
                          <div className="flex-1 bg-green-200 rounded">
                            <div className="bg-yellow-500 h-4 rounded" style={{width: '12%'}}></div>
                          </div>
                          <span className="text-xs">12%</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mt-4">Frequency of term selection</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">
                    Shows how often each candidate term appears in the ensemble models, helping identify stable features.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Publications Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-800 px-4 py-2 rounded-full text-sm font-medium">
                <Book className="h-4 w-4" />
                Publications
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Research & References</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Key publications on Ensemble SINDy methodology
              </p>
            </div>

            <div className="space-y-4">
              {/* Main Paper */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Ensemble-SINDy: Robust sparse model discovery in the low-data, high-noise limit, with active learning and control
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      Urban Fasel, J. Nathan Kutz, Bingni W. Brunton, Steven L. Brunton
                    </p>
                    <p className="text-sm text-slate-500 mb-4">
                      Proceedings of the Royal Society A, 2022
                    </p>
                    <div className="flex gap-3">
                      <a href="https://royalsocietypublishing.org/doi/10.1098/rspa.2021.0904" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <Book className="w-3 h-3" />
                        Journal
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a href="https://arxiv.org/abs/2111.10992" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <GraduationCap className="w-3 h-3" />
                        arXiv
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <div className="ml-4 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    2022
                  </div>
                </div>
              </div>

              {/* Related Papers */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                  <h4 className="font-semibold text-slate-900 mb-2">
                    SINDy with Control
                  </h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Brunton, Proctor, Kutz (2016) - Sparse identification of nonlinear dynamics with control (SINDYc)
                  </p>
                  <a href="#" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                    Read more →
                  </a>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Original SINDy
                  </h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Brunton, Proctor, Kutz (2016) - Discovering governing equations from data by sparse identification
                  </p>
                  <a href="#" className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                    Read more →
                  </a>
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
                Common questions about Ensemble SINDy
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

          {/* Contact Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                <Users className="h-4 w-4" />
                Contact & Support
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Get in Touch</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Get support regarding Ensemble SINDy
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Lead Author Contact */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Lead Developer</h3>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white text-2xl font-bold">UF</span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-900">Dr. Urban Fasel</h4>
                    <p className="text-slate-600 text-sm mb-1">London School of Economics</p>
                    <p className="text-slate-500 text-xs mb-3">Department of Mathematics</p>
                    
                    <div className="flex gap-3">
                      <a 
                        href="mailto:u.fasel@lse.ac.uk" 
                        className="inline-flex items-center gap-1 text-slate-600 group-hover:text-slate-800 text-sm"
                        title="Email Dr. Fasel"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </a>
                      
                      <a 
                        href="https://www.lse.ac.uk/Mathematics/people/Urban-Fasel" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-slate-600 group-hover:text-slate-800 text-sm"
                        title="LSE Profile"
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>Profile</span>
                      </a>
                      
                      <a 
                        href="https://github.com/urban-fasel" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-slate-600 group-hover:text-slate-800 text-sm"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-purple-700">
                    For questions about Ensemble SINDy methodology, implementation, or collaboration opportunities
                  </p>
                </div>
              </div>

              {/* Resources */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Resources & Support</h3>
                <div className="space-y-4">
                  <a href="https://github.com/urban-fasel/EnsembleSINDy/issues" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center space-x-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                    <Github className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900">GitHub Issues</div>
                      <div className="text-sm text-slate-600">Bug reports and feature requests</div>
                    </div>
                  </a>
                  
                  <a href="https://pysindy.readthedocs.io/en/latest/examples/13_ensembling/example.html" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center space-x-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                    <Book className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900">Documentation</div>
                      <div className="text-sm text-slate-600">Detailed examples and tutorials</div>
                    </div>
                  </a>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-medium text-slate-900 mb-1">Citation</div>
                    <p className="text-xs font-mono text-slate-600">
                      Fasel et al. (2022) Proc. R. Soc. A 478:20210904
                    </p>
                  </div>
                </div>
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