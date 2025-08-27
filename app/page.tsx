"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Play, Github, Book, Zap, Users, CheckCircle, Code, Terminal, Lightbulb, Star, ArrowRight, Youtube, ExternalLink, Target, BarChart3, Cpu, Copy, Check, LineChart, Database, Orbit, Bolt, ChevronLeft, Home, Rocket, FileCode } from 'lucide-react';

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
  const [copiedBibtex, setCopiedBibtex] = useState<{[key: string]: boolean}>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [noiseLevel, setNoiseLevel] = useState<number>(0.05);
  const [threshold, setThreshold] = useState<number>(0.1);
  const [discoveredEquations, setDiscoveredEquations] = useState<{clean: string[], noisy: string[]}>({clean: [], noisy: []});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Real SINDy implementation
  const [sindyData, setSindyData] = useState<{X: number[][], Xdot: number[][], equations: string[], step: number}>({
    X: [], Xdot: [], equations: [], step: 0
  });

  // Build polynomial library matrix
  const buildPolynomialLibrary = useCallback((X: number[][], degree: number = 2): { Theta: number[][], features: string[] } => {
    if (X.length === 0) return { Theta: [], features: [] };
    
    const n = X.length; // number of samples
    const d = X[0].length; // number of variables
    
    // Feature names for up to 3 variables
    const varNames = ['x', 'y', 'z'];
    const features: string[] = [];
    const Theta: number[][] = [];
    
    // Initialize each row
    for (let i = 0; i < n; i++) {
      Theta[i] = [];
    }
    
    // Constant term (optional)
    features.push('1');
    for (let i = 0; i < n; i++) {
      Theta[i].push(1);
    }
    
    // Linear terms
    for (let j = 0; j < d; j++) {
      features.push(varNames[j] || `x${j}`);
      for (let i = 0; i < n; i++) {
        Theta[i].push(X[i][j]);
      }
    }
    
    // Quadratic terms
    if (degree >= 2) {
      for (let j1 = 0; j1 < d; j1++) {
        for (let j2 = j1; j2 < d; j2++) {
          const fname = j1 === j2 ? 
            `${varNames[j1] || `x${j1}`}²` : 
            `${varNames[j1] || `x${j1}`}${varNames[j2] || `x${j2}`}`;
          features.push(fname);
          for (let i = 0; i < n; i++) {
            Theta[i].push(X[i][j1] * X[i][j2]);
          }
        }
      }
    }
    
    return { Theta, features };
  }, []);

  // Sequential Thresholded Least Squares (STLSQ)
  const stlsq = useCallback((Theta: number[][], Xdot: number[][], threshold: number): number[][] => {
    if (Theta.length === 0 || Xdot.length === 0) return [];
    
    const m = Theta[0].length; // features
    const n = Xdot[0].length; // variables
    
    // Solve normal equations: (Theta^T * Theta) * Xi = Theta^T * Xdot
    const ThetaT: number[][] = Array(m).fill(0).map(() => Array(Theta.length).fill(0));
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < Theta.length; j++) {
        ThetaT[i][j] = Theta[j][i];
      }
    }
    
    // Theta^T * Theta
    const AtA: number[][] = Array(m).fill(0).map(() => Array(m).fill(0));
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < m; j++) {
        for (let k = 0; k < Theta.length; k++) {
          AtA[i][j] += ThetaT[i][k] * Theta[k][j];
        }
      }
    }
    
    // Theta^T * Xdot
    const AtB: number[][] = Array(m).fill(0).map(() => Array(n).fill(0));
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        for (let k = 0; k < Theta.length; k++) {
          AtB[i][j] += ThetaT[i][k] * Xdot[k][j];
        }
      }
    }
    
    // Simple matrix inversion for small matrices (not numerically stable for large matrices)
    const Xi: number[][] = Array(m).fill(0).map(() => Array(n).fill(0));
    
    // For each variable
    for (let col = 0; col < n; col++) {
      // Solve AtA * xi = AtB[:, col] using Gaussian elimination
      const augmented: number[][] = AtA.map((row, i) => [...row, AtB[i][col]]);
      
      // Forward elimination
      for (let i = 0; i < m; i++) {
        // Find pivot
        let maxRow = i;
        for (let k = i + 1; k < m; k++) {
          if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
            maxRow = k;
          }
        }
        [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
        
        // Make all rows below this one 0 in current column
        for (let k = i + 1; k < m; k++) {
          if (Math.abs(augmented[i][i]) < 1e-10) continue;
          const c = augmented[k][i] / augmented[i][i];
          for (let j = i; j <= m; j++) {
            augmented[k][j] -= c * augmented[i][j];
          }
        }
      }
      
      // Back substitution
      for (let i = m - 1; i >= 0; i--) {
        if (Math.abs(augmented[i][i]) < 1e-10) {
          Xi[i][col] = 0;
          continue;
        }
        Xi[i][col] = augmented[i][m];
        for (let j = i + 1; j < m; j++) {
          Xi[i][col] -= augmented[i][j] * Xi[j][col];
        }
        Xi[i][col] /= augmented[i][i];
      }
    }
    
    // Apply thresholding iteratively
    for (let iter = 0; iter < 10; iter++) {
      let changed = false;
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          if (Math.abs(Xi[i][j]) < threshold) {
            if (Xi[i][j] !== 0) changed = true;
            Xi[i][j] = 0;
          }
        }
      }
      if (!changed) break;
    }
    
    return Xi;
  }, []);

  // Convert coefficients to equation strings
  const coefficientsToEquations = useCallback((Xi: number[][], features: string[], system: string): string[] => {
    if (Xi.length === 0) return [];
    
    const varNames = system === 'lorenz' ? ['x', 'y', 'z'] : 
                    system === 'lotka' ? ['x', 'y'] : ['x', 'y'];
    const equations: string[] = [];
    
    for (let eqIdx = 0; eqIdx < Xi[0].length; eqIdx++) {
      let equation = `d${varNames[eqIdx]}/dt = `;
      const terms: string[] = [];
      
      for (let featIdx = 0; featIdx < features.length; featIdx++) {
        const coeff = Xi[featIdx][eqIdx];
        if (Math.abs(coeff) < 1e-6) continue;
        
        let term = '';
        const absCoeff = Math.abs(coeff);
        const sign = coeff > 0 ? '+' : '-';
        
        if (features[featIdx] === '1') {
          term = `${sign}${absCoeff.toFixed(3)}`;
        } else if (Math.abs(absCoeff - 1) < 1e-6) {
          term = `${sign}${features[featIdx]}`;
        } else {
          term = `${sign}${absCoeff.toFixed(3)}${features[featIdx]}`;
        }
        
        terms.push(term);
      }
      
      if (terms.length === 0) {
        equation += '0';
      } else {
        equation += terms.join(' ').replace(/^\+/, '').replace(/\s\+\s/g, ' + ').replace(/\s\-\s/g, ' - ');
      }
      
      equations.push(equation);
    }
    
    return equations;
  }, []);

  // Run SINDy on current data
  const runSINDyAnalysis = useCallback((X: number[][], Xdot: number[][], system: string, threshold: number): string[] => {
    if (X.length < 20) return []; // Need minimum data
    
    const { Theta, features } = buildPolynomialLibrary(X, 2);
    const Xi = stlsq(Theta, Xdot, threshold);
    return coefficientsToEquations(Xi, features, system);
  }, [buildPolynomialLibrary, stlsq, coefficientsToEquations]);
  
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
    { id: 'cpp', name: 'C++', icon: Bolt }
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

  // Improved simulation functions for demo
  const generateDemoData = useCallback((systemType: string, steps: number = 1000): DemoData[] => {
    const data: DemoData[] = [];
    const dt = 0.01;
    
    // Store data and derivatives for SINDy
    const X: number[][] = [];
    const Xdot: number[][] = [];
    
    if (systemType === 'lorenz') {
      let x = -8, y = 8, z = 27;
      const sigma = 10, rho = 28, beta = 8/3;
      
      for (let i = 0; i < steps; i++) {
        const dx = sigma * (y - x);
        const dy = x * (rho - z) - y;
        const dz = x * y - beta * z;
        
        // Store clean state and derivatives
        X.push([x, y, z]);
        Xdot.push([dx, dy, dz]);
        
        // Add noise to the simulation
        const noiseX = (Math.random() - 0.5) * noiseLevel * 20;
        const noiseY = (Math.random() - 0.5) * noiseLevel * 20;
        const noiseZ = (Math.random() - 0.5) * noiseLevel * 20;
        
        x += (dx + noiseX) * dt;
        y += (dy + noiseY) * dt;
        z += (dz + noiseZ) * dt;
        
        // Add noisy measurements for visualization
        const noisyX = x + (Math.random() - 0.5) * noiseLevel * 10;
        const noisyY = y + (Math.random() - 0.5) * noiseLevel * 10;
        const noisyZ = z + (Math.random() - 0.5) * noiseLevel * 10;
        
        data.push({ x: noisyX, y: noisyY, z: noisyZ, step: i });
      }
    } else if (systemType === 'vanderpol') {
      let u = 2, v = 0;
      const mu = 1;
      
      for (let i = 0; i < steps; i++) {
        const du = v;
        const dv = mu * (1 - u * u) * v - u;
        
        X.push([u, v]);
        Xdot.push([du, dv]);
        
        const noiseU = (Math.random() - 0.5) * noiseLevel * 5;
        const noiseV = (Math.random() - 0.5) * noiseLevel * 5;
        
        u += (du + noiseU) * dt;
        v += (dv + noiseV) * dt;
        
        const noisyU = u + (Math.random() - 0.5) * noiseLevel * 3;
        const noisyV = v + (Math.random() - 0.5) * noiseLevel * 3;
        
        data.push({ x: noisyU, y: noisyV, step: i });
      }
    } else if (systemType === 'duffing') {
      let x = 1, y = 0;
      const alpha = -1, beta = 1, gamma = 0.3, omega = 1.2;
      
      for (let i = 0; i < steps; i++) {
        const t = i * dt;
        const dx = y;
        const dy = -alpha * x - beta * x * x * x + gamma * Math.cos(omega * t);
        
        X.push([x, y]);
        Xdot.push([dx, dy]);
        
        const noiseX = (Math.random() - 0.5) * noiseLevel * 3;
        const noiseY = (Math.random() - 0.5) * noiseLevel * 3;
        
        x += (dx + noiseX) * dt;
        y += (dy + noiseY) * dt;
        
        const noisyX = x + (Math.random() - 0.5) * noiseLevel * 2;
        const noisyY = y + (Math.random() - 0.5) * noiseLevel * 2;
        
        data.push({ x: noisyX, y: noisyY, step: i });
      }
    } else if (systemType === 'lotka') {
      let x = 10, y = 5;
      const alpha = 1.5, beta = 1, gamma = 3, delta = 0.75;
      
      for (let i = 0; i < steps; i++) {
        const dx = alpha * x - beta * x * y;
        const dy = delta * x * y - gamma * y;
        
        X.push([x, y]);
        Xdot.push([dx, dy]);
        
        const noiseX = (Math.random() - 0.5) * noiseLevel * 2;
        const noiseY = (Math.random() - 0.5) * noiseLevel * 2;
        
        x += (dx + noiseX) * dt;
        y += (dy + noiseY) * dt;
        
        const noisyX = x + (Math.random() - 0.5) * noiseLevel * 1;
        const noisyY = y + (Math.random() - 0.5) * noiseLevel * 1;
        
        data.push({ x: noisyX, y: noisyY, step: i });
      }
    }
    
    // Store the data for SINDy analysis
    setSindyData({ X, Xdot, equations: [], step: 0 });
    
    return data;
  }, [noiseLevel]);

  // Improved reset function
  const resetDemo = useCallback(() => {
    setIsRunning(false);
    setCurrentStep(0);
    setAnimationData([]);
    
    // Cancel any running animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Clear canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Draw axes for reference
        const centerX = canvasRef.current.width / 2;
        const centerY = canvasRef.current.height / 2;
        
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        
        // Horizontal axis
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvasRef.current.width, centerY);
        ctx.stroke();
        
        // Vertical axis
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvasRef.current.height);
        ctx.stroke();
        
        ctx.setLineDash([]);
      }
    }
  }, []);

  // Improved animation loop
  const animate = useCallback(() => {
    if (!isRunning || !canvasRef.current || currentStep >= animationData.length) {
      setIsRunning(false);
      return;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = selectedDemo === 'lorenz' ? 4 : 8;
    
    // Draw axes
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    // Draw trajectory with fading trail
    const trailLength = Math.min(200, currentStep);
    const startIdx = Math.max(0, currentStep - trailLength);
    
    for (let i = startIdx; i < currentStep - 1; i++) {
      const point = animationData[i];
      const nextPoint = animationData[i + 1];
      
      const alpha = (i - startIdx) / trailLength;
      ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.8})`;
      ctx.lineWidth = alpha * 2 + 0.5;
      
      const x = centerX + point.x * scale;
      const y = centerY - point.y * scale;
      const nextX = centerX + nextPoint.x * scale;
      const nextY = centerY - nextPoint.y * scale;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nextX, nextY);
      ctx.stroke();
    }
    
    // Draw current point
    if (currentStep < animationData.length) {
      const current = animationData[currentStep];
      const x = centerX + current.x * scale;
      const y = centerY - current.y * scale;
      
      // Current position with glow effect
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    
    // Run SINDy analysis every 15 steps (but only if we have enough data)
    if (currentStep % 15 === 0 && currentStep >= 30) {
      const dataUpToNow = sindyData.X.slice(0, currentStep);
      const derivativesUpToNow = sindyData.Xdot.slice(0, currentStep);
      
      if (dataUpToNow.length >= 25) {
        const equations = runSINDyAnalysis(dataUpToNow, derivativesUpToNow, selectedDemo, threshold);
        setSindyData(prev => ({ ...prev, equations, step: currentStep }));
        setDiscoveredEquations({ clean: equations, noisy: [] });
      }
    }
    
    setCurrentStep(prev => prev + 1);
    animationRef.current = requestAnimationFrame(animate);
  }, [isRunning, currentStep, animationData, selectedDemo, sindyData, threshold, runSINDyAnalysis]);

  // Effect to update equations when parameters change
  useEffect(() => {
    // No need to update equations manually anymore since they're computed in real-time
    setDiscoveredEquations({ clean: [], noisy: [] });
  }, [selectedDemo, noiseLevel, threshold]);

  // Effect to start animation
  useEffect(() => {
    if (isRunning && animationData.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, animate, animationData]);

  // Reset when demo selection changes
  useEffect(() => {
    resetDemo();
  }, [selectedDemo, resetDemo]);

  const runDemo = useCallback(() => {
    if (isRunning) return;
    
    resetDemo();
    const data = generateDemoData(selectedDemo);
    setAnimationData(data);
    setCurrentStep(0);
    setIsRunning(true);
    
    // Clear equations at start
    setDiscoveredEquations({ clean: [], noisy: [] });
  }, [selectedDemo, generateDemoData, resetDemo, isRunning]);

  // Simple syntax highlighting function
  const highlightCode = (code: string, language: string): JSX.Element => {
    const lines = code.split('\n');
    
    const highlightLine = (line: string, lang: string): JSX.Element => {
      if (lang === 'python') {
        // Python highlighting
        let highlightedLine = line
          .replace(/(#.*$)/gm, '<span class="text-green-400">$1</span>') // Comments
          .replace(/\b(import|from|as|def|class|if|else|elif|for|while|return|yield|try|except|finally|with|lambda|and|or|not|in|is|True|False|None)\b/g, '<span class="text-purple-400">$1</span>') // Keywords
          .replace(/\b(print|len|range|enumerate|zip|list|dict|set|tuple|str|int|float|bool)\b/g, '<span class="text-blue-400">$1</span>') // Built-ins
          .replace(/(['"`])([^'"`]*)\1/g, '<span class="text-yellow-300">$1$2$1</span>') // Strings
          .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-400">$1</span>'); // Numbers
        
        return <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />;
      } else if (lang === 'matlab') {
        // MATLAB highlighting
        let highlightedLine = line
          .replace(/(%.*$)/gm, '<span class="text-green-400">$1</span>') // Comments
          .replace(/\b(function|end|if|else|elseif|for|while|switch|case|otherwise|try|catch|return|break|continue)\b/g, '<span class="text-purple-400">$1</span>') // Keywords
          .replace(/\b(plot|figure|xlabel|ylabel|title|legend|hold|on|off|grid|axis|subplot|linspace|zeros|ones|eye|size|length|find|max|min|mean|std|sum|prod|sort)\b/g, '<span class="text-blue-400">$1</span>') // Built-ins
          .replace(/(['"`])([^'"`]*)\1/g, '<span class="text-yellow-300">$1$2$1</span>') // Strings
          .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-400">$1</span>'); // Numbers
        
        return <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />;
      } else if (lang === 'julia') {
        // Julia highlighting
        let highlightedLine = line
          .replace(/(#.*$)/gm, '<span class="text-green-400">$1</span>') // Comments
          .replace(/\b(using|import|export|function|end|if|else|elseif|for|while|try|catch|finally|return|break|continue|macro|struct|mutable|abstract|primitive|type|const|global|local|let|begin|do|quote)\b/g, '<span class="text-purple-400">$1</span>') // Keywords
          .replace(/\b(println|print|length|size|push!|pop!|append!|zeros|ones|rand|randn|Array|Vector|Matrix|Dict|Set|Tuple|String|Int|Float64|Bool)\b/g, '<span class="text-blue-400">$1</span>') // Built-ins
          .replace(/(['"`])([^'"`]*)\1/g, '<span class="text-yellow-300">$1$2$1</span>') // Strings
          .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-400">$1</span>'); // Numbers
        
        return <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />;
      } else if (lang === 'cpp') {
        // C++ highlighting
        let highlightedLine = line
          .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="text-green-400">$1</span>') // Comments
          .replace(/\b(#include|#define|#ifdef|#ifndef|#endif|#if|#else|class|struct|public|private|protected|virtual|static|const|inline|template|typename|namespace|using|int|double|float|char|bool|void|auto|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|throw|new|delete)\b/g, '<span class="text-purple-400">$1</span>') // Keywords
          .replace(/\b(std|cout|cin|endl|vector|string|map|set|list|queue|stack|pair|make_pair|size|empty|push_back|pop_back|begin|end|insert|erase|find)\b/g, '<span class="text-blue-400">$1</span>') // STL
          .replace(/(['"`])([^'"`]*)\1/g, '<span class="text-yellow-300">$1$2$1</span>') // Strings
          .replace(/\b(\d+\.?\d*f?)\b/g, '<span class="text-orange-400">$1</span>'); // Numbers
        
        return <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />;
      }
      
      return <span>{line}</span>;
    };
    
    return (
      <div>
        {lines.map((line, index) => (
          <div key={index}>
            {highlightLine(line, language)}
          </div>
        ))}
      </div>
    );
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

            {/* SINDy Methodology Figure */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg">
              <h2 className="text-2xl font-semibold text-slate-900 text-center mb-8">SINDy Methodology Overview</h2>
              
              <div className="flex justify-center">
                <img 
                  src="/sindy-methodology-figure.jpeg" 
                  alt="SINDy Methodology: From Lorenz System Data to Sparse Identification" 
                  className="max-w-full h-auto rounded-lg shadow-md border border-slate-200"
                  style={{ maxHeight: '600px' }}
                />
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  <strong>Figure:</strong> The SINDy algorithm discovers governing equations from data. 
                  Starting with time-series measurements (left), a library of candidate functions is constructed (center), 
                  and sparse regression identifies the active terms to reveal the underlying dynamics (right). 
                  The sparse coefficient matrix Ξ contains mostly zeros, with only the essential terms for the Lorenz system remaining.
                </p>
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
                      width={400}
                      height={250}
                      className="w-full h-48 bg-slate-800 rounded-lg border border-slate-700"
                    />
                    {isRunning && (
                      <div className="mt-2 text-green-400 text-xs">
                        Step: {currentStep} / {animationData.length}
                      </div>
                    )}
                  </div>

                  {/* Parameter Controls */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">SINDy Parameters</h4>
                    <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-slate-700">Noise Level</label>
                          <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded">{noiseLevel.toFixed(3)}</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="0.5" 
                          step="0.01" 
                          value={noiseLevel}
                          onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Clean</span>
                          <span>Very Noisy</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-slate-700">Sparsity Threshold</label>
                          <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded">{threshold.toFixed(3)}</span>
                        </div>
                        <input 
                          type="range" 
                          min="0.001" 
                          max="1.0" 
                          step="0.01" 
                          value={threshold}
                          onChange={(e) => setThreshold(parseFloat(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Very Sparse</span>
                          <span>Less Sparse</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Real-Time SINDy Discovery</h4>
                  
                  {/* Current Discovered Equations */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <h5 className="font-medium text-blue-800">
                        {isRunning ? `Discovering... (Step ${currentStep}/${animationData.length})` : 'Current Model'}
                      </h5>
                    </div>
                    <div className="font-mono text-sm space-y-1 text-blue-900 bg-white/50 p-3 rounded border max-h-32 overflow-y-auto">
                      {discoveredEquations.clean.length > 0 ? (
                        discoveredEquations.clean.map((eq, index) => (
                          <div key={index} className="break-all">{eq}</div>
                        ))
                      ) : (
                        <div className="text-blue-600 italic">
                          {isRunning ? 'Collecting data...' : 'Click "Run" to discover equations...'}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-blue-700 mt-2">
                      {isRunning ? 
                        `SINDy updates every 15 steps. Current data points: ${Math.min(currentStep, sindyData.X.length)}` :
                        'Equations discovered using sparse regression'
                      }
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  {isRunning && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Discovery Progress</span>
                        <span className="text-xs text-slate-500">
                          {Math.round((currentStep / animationData.length) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (currentStep / animationData.length) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-slate-600">
                        Next SINDy update in {15 - (currentStep % 15)} steps
                      </div>
                    </div>
                  )}

                  {/* Quality Metrics */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <h5 className="font-medium text-slate-800 mb-3">Model Parameters</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Data Points:</span>
                          <span className="font-mono text-slate-900">
                            {Math.min(currentStep, sindyData.X.length)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Threshold:</span>
                          <span className="font-mono text-slate-900">
                            {threshold.toFixed(3)}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Noise Level:</span>
                          <span className="font-mono text-slate-900">
                            {noiseLevel.toFixed(3)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Last Update:</span>
                          <span className="font-mono text-slate-900">
                            Step {sindyData.step}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Video Resources Section with Steve Brunton's 4-Part Series */}
          <section id="videos" className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                <Youtube className="h-4 w-4" />
                Essential Tutorial Series
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Learn SINDy with Steve Brunton</h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Learn SINDy from the with this comprehensive 4-part tutorial series covering theory, implementation, and applications.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Part 1: Introduction to SINDy",
                  description: "Introduction to SINDy methodology, data requirements, and how to distinguish between competing model candidates.",
                  duration: "24 min",
                  level: "Beginner",
                  url: "https://www.youtube.com/watch?v=NxAn0oglMVw&list=PLMrJAkhIeNNQ2eKXI_EV8Qc-b-6kDaKBz&index=2",
                  thumbnailId: "NxAn0oglMVw"
                },
                {
                  title: "Part 2: Training Data & Disambiguating Models", 
                  description: "Deep dive into the required sampling rate and duration for clean data and how to compute SINDy for noisy data.",
                  duration: "18 min",
                  level: "Intermediate",
                  url: "https://www.youtube.com/watch?v=8-hoWTJwmrE",
                  thumbnailId: "8-hoWTJwmrE"
                },
                {
                  title: "Part 3: Effective Coordinates for Parsimonious Models",
                  description: "Considering how high dimensional and low dimensional measurements of a nonlinear dynamical system",
                  duration: "20 min", 
                  level: "Advanced",
                  url: "https://www.youtube.com/watch?v=1vrsBg92Xzo",
                  thumbnailId: "1vrsBg92Xzo"
                },
                {
                  title: "Part 4: The Library of Candidate Nonlinearities",
                  description: "Discussing how to extend SINDy to include control variables and bifurcation parameters, as well as to include more general rational functions.",
                  duration: "27 min",
                  level: "Advanced",
                  url: "https://www.youtube.com/watch?v=MmMNQe_EtCw", 
                  thumbnailId: "MmMNQe_EtCw"
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
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Part {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">{video.description}</p>
                    <span className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 text-sm group-hover:gap-3 transition-all">
                      Watch Tutorial 
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center">
              <a 
                href="https://www.youtube.com/@Eigensteve"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors group"
              >
                <Youtube className="h-5 w-5" />
                Watch More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
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
                    <code>
                      {highlightCode(codeExamples[selectedLanguage as keyof typeof codeExamples], selectedLanguage)}
                    </code>
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
                  id: 'brunton2016',
                  title: "Discovering governing equations from data",
                  authors: "Brunton, S. L., Proctor, J. L., & Kutz, J. N.",
                  journal: "Proceedings of National Academy of Sciences",
                  year: "2016",
                  citations: "3,000+",
                  description: "The original SINDy paper that introduced sparse identification of nonlinear dynamical systems.",
                  color: "slate",
                  type: "Original Paper",
                  url: "https://www.pnas.org/doi/10.1073/pnas.1517384113",
                  bibtex: `@article{brunton2016discovering,
  title={Discovering governing equations from data by sparse identification of nonlinear dynamical systems},
  author={Brunton, Steven L and Proctor, Joshua L and Kutz, J Nathan},
  journal={Proceedings of the national academy of sciences},
  volume={113},
  number={15},
  pages={3932--3937},
  year={2016},
  publisher={National Acad Sciences}
}`
                },
                {
                  id: 'brunton2016control',
                  title: "Sparse identification with control (SINDYc)",
                  authors: "Brunton, S. L., Proctor, J. L., & Kutz, J. N.",
                  journal: "IFAC-PapersOnLine",
                  year: "2016", 
                  citations: "250+",
                  description: "Extension of SINDy for systems with control inputs and external forcing.",
                  color: "green",
                  type: "Extension",
                  url: "https://www.sciencedirect.com/science/article/pii/S2405896316318298",
                  bibtex: `@article{brunton2016sparse,
  title={Sparse identification of nonlinear dynamics with control (SINDYc)},
  author={Brunton, Steven L and Proctor, Joshua L and Kutz, J Nathan},
  journal={IFAC-PapersOnLine},
  volume={49},
  number={18},
  pages={710--715},
  year={2016},
  publisher={Elsevier}
}`
                },
                {
                  id: 'messenger2021weak',
                  title: "Weak SINDy for partial differential equations",
                  authors: "Messenger, D. A., & Bortz, D. M.",
                  journal: "Journal of Computational Physics",
                  year: "2021",
                  citations: "130+", 
                  description: "Novel approach for discovering PDEs using weak formulations and integration by parts.",
                  color: "purple",
                  type: "PDE Extension",
                  url: "https://www.sciencedirect.com/science/article/pii/S0021999121004204",
                  bibtex: `@article{messenger2021weak,
  title={Weak SINDy: Galerkin-based data-driven model selection},
  author={Messenger, Daniel A and Bortz, David M},
  journal={Journal of Computational Physics},
  volume={443},
  pages={110520},
  year={2021},
  publisher={Elsevier}
}`
                },
                {
                  id: 'champion2019unified',
                  title: "A unified sparse optimization framework",
                  authors: "Champion, K., Zheng, P., Aravkin, A. Y., et al.",
                  journal: "Nature Communications", 
                  year: "2019",
                  citations: "600+",
                  description: "Comprehensive framework combining deep learning with sparse optimization for system discovery.",
                  color: "orange",
                  type: "Deep Learning",
                  url: "https://arxiv.org/abs/1906.10612",
                  bibtex: `@article{champion2019unified,
  title={A unified sparse optimization framework to learn parsimonious physics-informed models from data},
  author={Champion, Kathleen and Zheng, Peng and Aravkin, Aleksandr Y and Brunton, Steven L and Kutz, J Nathan},
  journal={IEEE Access},
  volume={8},
  pages={169259--169271},
  year={2020},
  publisher={IEEE}
}`
                }
              ].map((paper, index) => {
                const copyBibtex = async (paperId: string, bibtex: string) => {
                  try {
                    await navigator.clipboard.writeText(bibtex);
                    setCopiedBibtex(prev => ({ ...prev, [paperId]: true }));
                    setTimeout(() => {
                      setCopiedBibtex(prev => ({ ...prev, [paperId]: false }));
                    }, 2000);
                  } catch (err) {
                    console.error('Failed to copy bibtex:', err);
                  }
                };

                return (
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
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyBibtex(paper.id, paper.bibtex)}
                            className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors flex items-center gap-1"
                          >
                            {copiedBibtex[paper.id] ? (
                              <>
                                <Check className="w-3 h-3" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                BibTeX
                              </>
                            )}
                          </button>
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
                  </div>
                );
              })}
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
                Common questions about SINDy
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
                        <p className="text-slate-500 text-xs">Creator of SINDy</p>
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
                          href="https://github.com/dynamicslab" 
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
                <a href="mailto:sbrunton@uw.edu" className="flex items-center space-x-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group">
                  <Users className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                  <div>
                    <div className="font-medium text-slate-900">Submit Example</div>
                    <div className="text-sm text-slate-600">Share your research</div>
                  </div>
                </a>
                <a href="https://pysindy.readthedocs.io/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group">
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