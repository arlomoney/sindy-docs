"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Play, Github, Book, Zap, Users, CheckCircle, Code, Terminal, Lightbulb, Star, ArrowRight, Youtube, ExternalLink, Target, BarChart3, Cpu, Copy, Check, LineChart, Database, Orbit, Zap as ZapIcon, ChevronLeft, Home, Rocket, FileCode } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Types
interface DemoData {
  x: number;
  y: number;
  z?: number;
  step: number;
}

interface CopiedStates {
  [key: string]: boolean;
}

interface NavbarProps {
  currentPage?: string;
}

export default function HomePage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<string>('lorenz');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('python');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [animationData, setAnimationData] = useState<DemoData[]>([]);
  const [copiedStates, setCopiedStates] = useState<CopiedStates>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Demo simulation logic
  const demoOptions = [
    { id: 'lorenz', name: 'Lorenz System', description: 'Famous chaotic attractor' },
    { id: 'vanderpol', name: 'Van der Pol', description: 'Nonlinear oscillator' },
    { id: 'duffing', name: 'Duffing Oscillator', description: 'Forced nonlinear system' },
    { id: 'lotka', name: 'Lotka-Volterra', description: 'Predator-prey dynamics' }
  ];

  // Language implementations
  const languageOptions = [
    { id: 'python', name: 'Python (PySINDy)', icon: LineChart },
    { id: 'matlab', name: 'MATLAB', icon: BarChart3 },
    { id: 'julia', name: 'Julia', icon: Orbit },
    { id: 'cpp', name: 'C++', icon: ZapIcon }
  ];

  const codeExamples = {
    python: `# PySINDy Implementation
import numpy as np
import pysindy as ps
from scipy.integrate import odeint
import matplotlib.pyplot as plt

# Generate training data for Lorenz system
def lorenz(state, t, sigma=10, beta=8/3, rho=28):
    """Lorenz system dynamics"""
    x, y, z = state
    return [sigma*(y-x), x*(rho-z)-y, x*y-beta*z]

# Time vector and initial conditions
t = np.linspace(0, 10, 5000)
x0 = [-8, 8, 27]
X = odeint(lorenz, x0, t)

# Initialize SINDy model with polynomial features
model = ps.SINDy(
    optimizer=ps.STLSQ(threshold=0.02),
    feature_library=ps.PolynomialLibrary(degree=2)
)

# Fit the model
model.fit(X, t=t[1]-t[0])

# Print discovered equations
model.print()

# Simulate and compare
X_sim = model.simulate(x0, t)
plt.plot(t, X[:, 0], 'r-', t, X_sim[:, 0], 'k--')
plt.legend(['True', 'SINDy'])
plt.show()`,

    matlab: `% MATLAB SINDy Implementation
function lorenz_sindy_demo()
    % Parameters for Lorenz system
    sigma = 10; beta = 8/3; rho = 28;
    
    % Generate training data
    tspan = [0 10];
    x0 = [-8; 8; 27];
    options = odeset('RelTol', 1e-12);
    
    [t, X] = ode45(@(t,x) lorenz_rhs(t, x, sigma, beta, rho), ...
                   tspan, x0, options);
    
    % Compute derivatives numerically
    dt = t(2) - t(1);
    Xdot = gradient(X, dt);
    
    % Build polynomial library up to degree 2
    Theta = build_library(X, 2);
    
    % Sparse regression with LASSO
    lambda = 0.02;
    Xi = lasso_regression(Theta, Xdot, lambda);
    
    % Display results
    print_equations(Xi);
    
    % Simulate discovered model
    X_sim = simulate_model(Xi, x0, tspan);
    
    % Plot comparison
    figure;
    plot(t, X(:,1), 'r-', t, X_sim(:,1), 'k--');
    legend('True', 'SINDy', 'Location', 'best');
    xlabel('Time'); ylabel('x');
end

function dxdt = lorenz_rhs(t, x, sigma, beta, rho)
    % Lorenz system right-hand side
    dxdt = [sigma*(x(2)-x(1));
            x(1)*(rho-x(3))-x(2);
            x(1)*x(2)-beta*x(3)];
end`,

    julia: `# Julia SINDy Implementation
using DifferentialEquations, LinearAlgebra
using DataDrivenDiffEq, ModelingToolkit
using Plots

# Define Lorenz system
function lorenz!(du, u, p, t)
    σ, ρ, β = p
    du[1] = σ * (u[2] - u[1])
    du[2] = u[1] * (ρ - u[3]) - u[2]
    du[3] = u[1] * u[2] - β * u[3]
end

# Parameters and initial conditions
p = [10.0, 28.0, 8/3]
u0 = [-8.0, 8.0, 27.0]
tspan = (0.0, 10.0)

# Generate training data
prob = ODEProblem(lorenz!, u0, tspan, p)
sol = solve(prob, Tsit5(), saveat=0.002)

# Extract data
X = Array(sol)
t = sol.t
DX = Array(sol(t, Val{1}))  # Derivatives

# Define basis functions
@variables u[1:3]
basis = Basis([polynomial_basis(u, 2)...], u)

# Create SINDy problem and solve
prob = DirectDataDrivenProblem(X, DX)
res = solve(prob, basis, STLSQ(λ = 0.02))

# Print discovered system
println("Discovered equations:")
println(res)

# Simulate and compare
prob_sindy = ODEProblem(res, u0, tspan)
sol_sindy = solve(prob_sindy, Tsit5(), saveat=0.002)

# Plot results
plot(sol, vars=(1,2,3), label="True")
plot!(sol_sindy, vars=(1,2,3), label="SINDy", ls=:dash)`,

    cpp: `// C++ SINDy Implementation
#include <eigen3/Eigen/Dense>
#include <iostream>
#include <vector>
#include <cmath>

class SINDy {
private:
    Eigen::MatrixXd X_, Xdot_;
    Eigen::MatrixXd Theta_;
    Eigen::MatrixXd Xi_;
    double threshold_;
    
public:
    SINDy(double threshold = 0.02) : threshold_(threshold) {}
    
    // Build polynomial library matrix
    Eigen::MatrixXd buildLibrary(const Eigen::MatrixXd& X, int degree) {
        int n = X.rows();
        int d = X.cols();
        
        // Count total features
        int total_features = d;  // Linear terms
        for(int deg = 2; deg <= degree; deg++) {
            // Add polynomial combinations
            total_features += pow(d, deg);
        }
        
        Eigen::MatrixXd Theta(n, total_features);
        
        // Linear terms
        Theta.leftCols(d) = X;
        
        // Quadratic terms (simplified)
        int col_idx = d;
        for(int i = 0; i < d; i++) {
            for(int j = i; j < d; j++) {
                if(col_idx < total_features) {
                    Theta.col(col_idx) = X.col(i).cwiseProduct(X.col(j));
                    col_idx++;
                }
            }
        }
        
        return Theta;
    }
    
    // Sequential Thresholded Least Squares (STLSQ)
    Eigen::MatrixXd stlsq(const Eigen::MatrixXd& Theta, 
                          const Eigen::MatrixXd& Xdot) {
        Eigen::MatrixXd Xi = (Theta.transpose() * Theta).ldlt()
                           .solve(Theta.transpose() * Xdot);
        
        // Iterative thresholding
        for(int iter = 0; iter < 10; iter++) {
            // Find small coefficients
            Eigen::Array<bool, Eigen::Dynamic, Eigen::Dynamic> mask = 
                Xi.array().abs() > threshold_;
            
            // Zero out small coefficients
            for(int i = 0; i < Xi.rows(); i++) {
                for(int j = 0; j < Xi.cols(); j++) {
                    if(!mask(i,j)) Xi(i,j) = 0.0;
                }
            }
        }
        
        return Xi;
    }
    
    // Fit SINDy model
    void fit(const Eigen::MatrixXd& X, const Eigen::MatrixXd& Xdot) {
        X_ = X;
        Xdot_ = Xdot;
        Theta_ = buildLibrary(X, 2);
        Xi_ = stlsq(Theta_, Xdot);
    }
    
    // Print discovered equations (simplified)
    void printEquations() {
        std::cout << "Discovered equations:" << std::endl;
        for(int i = 0; i < Xi_.cols(); i++) {
            std::cout << "dx" << i << "/dt = ";
            for(int j = 0; j < Xi_.rows(); j++) {
                if(std::abs(Xi_(j,i)) > 1e-6) {
                    std::cout << Xi_(j,i) << "*f" << j << " ";
                }
            }
            std::cout << std::endl;
        }
    }
};`
  };

  // Simplified simulation functions for demo
  const generateDemoData = (systemType: string, steps: number = 1000): DemoData[] => {
    const data: DemoData[] = [];
    const dt = 0.01;
    
    if (systemType === 'lorenz') {
      let x = -8, y = 8, z = 27;
      for (let i = 0; i < steps; i++) {
        const dx = 10 * (y - x);
        const dy = x * (28 - z) - y;
        const dz = x * y - (8/3) * z;
        
        x += dx * dt;
        y += dy * dt;
        z += dz * dt;
        
        data.push({ x, y, z, step: i });
      }
    } else if (systemType === 'vanderpol') {
      let u = 2, v = 0;
      for (let i = 0; i < steps; i++) {
        const du = v;
        const dv = -u + (1 - u*u) * v;
        
        u += du * dt;
        v += dv * dt;
        
        data.push({ x: u, y: v, step: i });
      }
    } else {
      // Generate sample data for other systems
      for (let i = 0; i < steps; i++) {
        data.push({
          x: Math.sin(i * 0.1) * Math.cos(i * 0.05),
          y: Math.cos(i * 0.1) * Math.sin(i * 0.05),
          z: Math.sin(i * 0.02),
          step: i
        });
      }
    }
    
    return data;
  };

  // Canvas animation
  useEffect(() => {
    if (isRunning && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = 8;
      
      let currentStep = 0;
      const data = animationData;
      
      const animate = () => {
        if (currentStep >= data.length || !isRunning) {
          setIsRunning(false);
          return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw trajectory
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        for (let i = 0; i < Math.min(currentStep, data.length - 1); i++) {
          const point = data[i];
          const x = centerX + point.x * scale;
          const y = centerY - point.y * scale;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        
        // Draw current point
        if (currentStep < data.length) {
          const current = data[currentStep];
          const x = centerX + current.x * scale;
          const y = centerY - current.y * scale;
          
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fill();
        }
        
        currentStep += 2;
        setTimeout(() => requestAnimationFrame(animate), 50);
      };
      
      animate();
    }
  }, [isRunning, animationData]);

  const runDemo = () => {
    const data = generateDemoData(selectedDemo);
    setAnimationData(data);
    setIsRunning(true);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setAnimationData([]);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  // Copy code functionality
  const copyCode = async (codeKey: string) => {
    try {
      await navigator.clipboard.writeText(codeExamples[codeKey as keyof typeof codeExamples]);
      setCopiedStates(prev => ({ ...prev, [codeKey]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [codeKey]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <Navbar currentPage="home" />

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-none">
          <div className="max-w-7xl mx-auto space-y-20">
          {/* Hero Section with Visual Figures */}
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
              </p>
            </div>

            {/* Visual Figures from Research Papers */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Lorenz Attractor Visualization */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <path d="M100,20 Q140,60 120,100 Q80,140 100,180 Q160,160 140,120 Q120,80 100,20" 
                          fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.8"/>
                    <path d="M80,40 Q60,80 80,120 Q120,100 100,140 Q60,120 80,80 Q100,60 80,40" 
                          fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.6"/>
                    <circle cx="100" cy="100" r="3" fill="#ef4444"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Chaotic Dynamics</h3>
                <p className="text-slate-600 text-sm">Discover complex nonlinear systems like the Lorenz attractor from time-series data.</p>
              </div>

              {/* Sparse Regression Visualization */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg mb-4 flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1 p-4">
                    {Array.from({length: 64}, (_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-sm ${
                        [5, 12, 19, 28, 35, 44, 51, 60].includes(i) 
                          ? 'bg-green-500' 
                          : 'bg-slate-200'
                      }`} />
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Sparse Discovery</h3>
                <p className="text-slate-600 text-sm">Identify the minimal set of terms needed to describe system dynamics.</p>
              </div>

              {/* Equation Discovery Visualization */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-slate-700 font-mono text-xs">dx/dt = σ(y - x)</div>
                    <div className="text-slate-700 font-mono text-xs">dy/dt = x(ρ - z) - y</div>
                    <div className="text-slate-700 font-mono text-xs">dz/dt = xy - βz</div>
                    <div className="flex justify-center space-x-1 mt-3">
                      <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Interpretable Results</h3>
                <p className="text-slate-600 text-sm">Generate clean mathematical equations that scientists can interpret.</p>
              </div>
            </div>
          </section>

          {/* Interactive Demo Section - Moved before Implementation */}
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
                        ? 'bg-slate-800 text-white shadow-lg'
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
                        <button 
                          onClick={runDemo}
                          disabled={isRunning}
                          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-3 py-1 rounded text-xs font-medium flex items-center space-x-1 transition-colors"
                        >
                          <Play className="w-3 h-3" />
                          <span>{isRunning ? 'Running...' : 'Run'}</span>
                        </button>
                        <button 
                          onClick={resetDemo}
                          className="bg-slate-600 hover:bg-slate-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    <canvas 
                      ref={canvasRef}
                      width={300}
                      height={200}
                      className="w-full h-48 bg-slate-800 rounded-lg border border-slate-700"
                    />
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
                          <input type="range" min="0" max="0.1" step="0.01" defaultValue="0.02" className="w-20" />
                          <span className="text-xs text-slate-500 w-8">0.02</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-600">Threshold</label>
                        <div className="flex items-center gap-2">
                          <input type="range" min="0" max="1" step="0.1" defaultValue="0.1" className="w-20" />
                          <span className="text-xs text-slate-500 w-8">0.1</span>
                        </div>
                      </div>
                    </div>
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
                      {React.createElement(item.icon, { className: "h-6 w-6 text-white" })}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                    <ul className="space-y-2">
                      {item.items.map((listItem, idx) => (
                        <li key={`${index}-${idx}`} className="flex items-center gap-2 text-slate-600 text-sm">
                          <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                          <span>{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Language Implementation Tabs */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 text-center">SINDy Implementations</h3>
                
                {/* Language Tabs */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {languageOptions.map((lang) => (
                    <button key={lang.id}
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-2 ${
                        selectedLanguage === lang.id
                          ? 'bg-slate-800 text-white shadow-lg'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <lang.icon className="w-4 h-4" />
                      {lang.name}
                    </button>
                  ))}
                </div>

                {/* Code Implementation */}
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                  <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
                    <span className="text-green-400 font-mono text-sm flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-2">
                        {(() => {
                          switch (selectedLanguage) {
                            case 'python': return 'sindy_example.py';
                            case 'matlab': return 'sindy_example.m';
                            case 'julia': return 'sindy_example.jl';
                            case 'cpp': return 'sindy_example.cpp';
                            default: return 'sindy_example.py';
                          }
                        })()}
                      </span>
                    </span>
                    <button 
                      onClick={() => copyCode(selectedLanguage)}
                      className="text-slate-400 hover:text-white text-xs px-3 py-1 rounded hover:bg-slate-700 transition-colors flex items-center gap-2"
                    >
                      {copiedStates[selectedLanguage] ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  
                  <pre className="text-sm text-slate-300 overflow-x-auto p-6 bg-slate-900 font-mono leading-relaxed max-h-96">
                    <code>{codeExamples[selectedLanguage as keyof typeof codeExamples]}</code>
                  </pre>
                </div>
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

          {/* Video Resources Section with Actual Video Thumbnails */}
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
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "SINDy Introduction",
                  description: "A comprehensive overview of the SINDy methodology by the original authors",
                  duration: "45 min",
                  level: "Beginner",
                  url: "https://www.youtube.com/watch?v=gSCa78TIldg",
                  thumbnailId: "gSCa78TIldg"
                },
                {
                  title: "Advanced Applications",
                  description: "Real-world case studies including fluid dynamics and biological systems",
                  duration: "Playlist",
                  level: "Advanced", 
                  url: "https://www.youtube.com/watch?v=NxAn0oglMVw&list=PLq7sjSxACEo6iRtnbLShncBn-alTQb1GS",
                  thumbnailId: "NxAn0oglMVw"
                }
              ].map((video, index) => (
                <a key={index}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:shadow-lg transition-shadow cursor-pointer group block overflow-hidden"
                >
                  {/* Video Thumbnail */}
                  <div className="relative">
                    <img 
                      src={`https://img.youtube.com/vi/${video.thumbnailId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        // Fallback to default thumbnail if maxres doesn't exist
                        const target = e.target as HTMLImageElement;
                        target.src = `https://img.youtube.com/vi/${video.thumbnailId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute top-4 right-4 bg-black/50 rounded-lg p-2 group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="bg-black/50 text-white px-2 py-1 rounded text-xs">{video.duration}</span>
                      <span className="bg-black/50 text-white px-2 py-1 rounded text-xs">{video.level}</span>
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

            {/* Contact Card */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900">Contact</h3>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                <div className="flex items-center gap-6">
                  {/* Profile Image */}
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white text-lg font-bold">SB</span>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">Professor Steve Brunton</h4>
                        <p className="text-slate-600 text-sm mb-1">University of Washington</p>
                        <p className="text-slate-500 text-xs">Questions about SINDy theory and methodology</p>
                      </div>
                      
                      {/* Contact Links */}
                      <div className="flex gap-2 ml-4">
                        <a 
                          href="mailto:sbrunton@uw.edu" 
                          className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors group"
                          title="Email Professor Brunton"
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

          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}