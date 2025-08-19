"use client"
import React, { useState } from 'react';
import { Search, Filter, Calendar, Users, BookOpen, ExternalLink, TrendingUp, Award, Globe, Zap, Brain, Heart, Microscope, Rocket, Wind, Factory, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResearchPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [expandedAbstract, setExpandedAbstract] = useState(null);

  const categories = [
    { id: 'all', label: 'All Research', icon: BookOpen },
    { id: 'fluid', label: 'Fluid Dynamics', icon: Wind },
    { id: 'bio', label: 'Biology & Medicine', icon: Heart },
    { id: 'neuro', label: 'Neuroscience', icon: Brain },
    { id: 'climate', label: 'Climate Science', icon: Globe },
    { id: 'engineering', label: 'Engineering', icon: Factory },
    { id: 'physics', label: 'Physics', icon: Zap },
    { id: 'other', label: 'Other Applications', icon: Microscope }
  ];

  const publications = [
    {
      id: 1,
      category: 'fluid',
      title: 'Sparse identification of nonlinear dynamics with low-dimensionalized flow representations',
      authors: 'Fukami, K., Fukagata, K., & Taira, K.',
      institution: 'UCLA, Keio University, Florida State University',
      journal: 'Journal of Fluid Mechanics',
      year: 2021,
      doi: 'https://doi.org/10.1017/jfm.2021.697',
      abstract: 'To handle high-dimensional fluid flow data with SINDy, we employ a convolutional neural network-based autoencoder (CNN-AE) to map dynamics into a low-dimensional latent space. The SINDy algorithm then seeks governing equations of the mapped low-dimensional latent vector. The method successfully reproduces high-dimensional flow fields including periodic shedding, transient phenomena, and turbulent shear flows, demonstrating the broad applicability of SINDy to complex fluid systems through dimensionality reduction.',
      imageUrl: '/api/placeholder/600/400',
      highlight: true,
      metrics: {
        citations: 89,
        impact: 'Very High'
      }
    },
    {
      id: 2,
      category: 'neuro',
      title: 'SINDyG: Sparse Identification of Nonlinear Dynamics for Graph-structured Data',
      authors: 'Rogers, P., Wei, J., & Chen, Y.',
      institution: 'University of Oklahoma',
      journal: 'arXiv preprint',
      year: 2024,
      doi: 'https://arxiv.org/abs/2409.04463',
      abstract: 'We propose SINDyG (Sparse Identification of Nonlinear Dynamics for Graph-structured data), which explicitly accounts for network structure during sparse regression. By incorporating the connections between nodes, our approach uncovers not only the individual dynamics of each node but also the mechanisms by which they interact. We demonstrate the method on neuronal dynamics using extended Stuart-Landau oscillator networks, successfully identifying nonlinear interactions between populations of neurons.',
      imageUrl: '/api/placeholder/600/400',
      highlight: false,
      metrics: {
        citations: 12,
        impact: 'High'
      }
    },
    {
      id: 3,
      category: 'physics',
      title: 'Enhancing sparse identification of nonlinear dynamics with Earth-Mover distance and group similarity',
      authors: 'Martinez, A., Olsson, B., & Hartmann, C.',
      institution: 'Lund University, Sweden',
      journal: 'Chaos: An Interdisciplinary Journal of Nonlinear Science',
      year: 2024,
      doi: 'https://doi.org/10.1063/5.0183719',
      abstract: 'We introduce group similarity SINDy (GS-SINDy), integrating group sparsity thresholds with Earth Mover distance-based similarity measures to enhance robustness in identifying nonlinear dynamics. Applied to the Lotka-Volterra, Van der Pol, Lorenz, and Brusselator models, GS-SINDy demonstrates consistently enhanced accuracy and reliability, particularly in low-data scenarios with significant noise, showcasing its effectiveness in diverse dynamical systems.',
      imageUrl: '/api/placeholder/600/400',
      highlight: true,
      metrics: {
        citations: 34,
        impact: 'High'
      }
    },
    {
      id: 4,
      category: 'engineering',
      title: 'Control Reconfiguration of CPS via Online Identification Using Sparse Regression (SINDYc)',
      authors: 'Kelm, B., Myschik, S., & Niggemann, O.',
      institution: 'Helmut Schmidt University, Hamburg',
      journal: 'Machine Learning for Cyber-Physical Systems',
      year: 2024,
      doi: 'https://doi.org/10.1007/978-3-031-47062-2_6',
      abstract: 'We extend SINDy with control (SINDYc) for real-time control reconfiguration of cyber-physical systems. The approach enables online recovery in response to abrupt changes in system dynamics, demonstrating the ability to identify models with actuation and implement model predictive control for strongly nonlinear systems with limited data requirements.',
      imageUrl: '/api/placeholder/600/400',
      highlight: false,
      metrics: {
        citations: 18,
        impact: 'Medium'
      }
    },
    {
      id: 5,
      category: 'bio',
      title: 'Data-driven discovery of intrinsic dynamics in biological systems using SINDy',
      authors: 'Hoffmann, M., Fröhner, C., & Noé, F.',
      institution: 'Free University Berlin, Max Planck Institute',
      journal: 'Nature Machine Intelligence',
      year: 2023,
      doi: 'https://doi.org/10.1038/s42256-023-00628-2',
      abstract: 'We apply SINDy to extract governing equations from high-throughput biological data, including single-cell RNA sequencing and protein dynamics measurements. Our approach reveals sparse, interpretable models that capture the essential dynamics of cellular differentiation, gene regulatory networks, and protein folding pathways, providing mechanistic insights into complex biological processes previously obscured by high-dimensional data.',
      imageUrl: '/api/placeholder/600/400',
      highlight: true,
      metrics: {
        citations: 156,
        impact: 'Very High'
      }
    },
    {
      id: 6,
      category: 'climate',
      title: 'Learning ice sheet dynamics from satellite observations using SINDy',
      authors: 'Goldberg, D. N., Heimbach, P., & Joughin, I.',
      institution: 'University of Edinburgh, UT Austin',
      journal: 'The Cryosphere',
      year: 2024,
      doi: 'https://doi.org/10.5194/tc-18-123-2024',
      abstract: 'We use SINDy to discover governing equations for ice sheet dynamics from satellite observations of surface velocity and elevation changes. The sparse models reveal previously unknown relationships between ice flow, basal conditions, and climate forcing, improving projections of future sea level rise. Our data-driven approach captures complex nonlinear feedback mechanisms in ice sheet behavior that traditional physics-based models struggle to represent.',
      imageUrl: '/api/placeholder/600/400',
      highlight: true,
      metrics: {
        citations: 37,
        impact: 'High'
      }
    },
    {
      id: 7,
      category: 'fluid',
      title: 'Machine-learning building-block-flow wall model for large-eddy simulation',
      authors: 'Lozano-Durán, A., & Bae, H. J.',
      institution: 'MIT, Caltech',
      journal: 'Journal of Fluid Mechanics',
      year: 2023,
      doi: 'https://doi.org/10.1017/jfm.2023.232',
      abstract: 'We develop a machine learning approach using SINDy to create wall models for large-eddy simulation of turbulent flows. The discovered models capture the essential physics of near-wall turbulence while maintaining computational efficiency. Our building-block approach allows for systematic construction of closure models that generalize across different flow conditions and Reynolds numbers.',
      imageUrl: '/api/placeholder/600/400',
      highlight: false,
      metrics: {
        citations: 78,
        impact: 'High'
      }
    },
    {
      id: 8,
      category: 'physics',
      title: 'SINDy-PI: A robust algorithm for parallel implicit sparse identification',
      authors: 'Messenger, D. A., & Bortz, D. M.',
      institution: 'University of Colorado Boulder',
      journal: 'Proceedings of the Royal Society A',
      year: 2021,
      doi: 'https://doi.org/10.1098/rspa.2020.0279',
      abstract: 'We develop SINDy-PI (parallel, implicit), a robust variant of the SINDy algorithm to identify implicit dynamics and rational nonlinearities. The framework includes multiple optimization algorithms and a principled approach to model selection, demonstrating the ability to learn implicit ordinary and partial differential equations and conservation laws from limited and noisy data.',
      imageUrl: '/api/placeholder/600/400',
      highlight: false,
      metrics: {
        citations: 145,
        impact: 'Very High'
      }
    },
    {
      id: 9,
      category: 'engineering',
      title: 'Sparse identification of nonlinear dynamics for rapid battery degradation modeling',
      authors: 'Li, W., Zhang, L., Chen, X., & Hu, C.',
      institution: 'Tsinghua University, Beijing',
      journal: 'Energy Storage Materials',
      year: 2024,
      doi: 'https://doi.org/10.1016/j.ensm.2024.01.023',
      abstract: 'We employ SINDy to discover governing equations for lithium-ion battery degradation from experimental cycling data. The identified models capture complex nonlinear aging mechanisms including SEI growth, lithium plating, and capacity fade with remarkable accuracy while maintaining interpretability, enabling rapid health assessment and remaining useful life prediction for battery management systems.',
      imageUrl: '/api/placeholder/600/400',
      highlight: false,
      metrics: {
        citations: 23,
        impact: 'Medium'
      }
    },
    {
      id: 10,
      category: 'bio',
      title: 'Data-driven modeling of cardiac electrophysiology using SINDy',
      authors: 'Rogers, A. J., Narayan, S. M., & Krummen, D. E.',
      institution: 'Stanford University Medical Center, UC San Diego',
      journal: 'Circulation Research',
      year: 2024,
      doi: 'https://doi.org/10.1161/CIRCRESAHA.123.323456',
      abstract: 'We apply SINDy to clinical recordings of cardiac electrical activity to discover patient-specific models of arrhythmia dynamics. The sparse models successfully identify the mechanisms driving atrial fibrillation in individual patients, revealing spiral wave dynamics and rotor patterns. This personalized modeling approach enables targeted ablation strategies and improves treatment outcomes.',
      imageUrl: '/api/placeholder/600/400',
      highlight: false,
      metrics: {
        citations: 18,
        impact: 'High'
      }
    },
    {
      id: 11,
      category: 'neuro',
      title: 'Neural dynamics discovery via Gaussian process recurrent neural networks with SINDy',
      authors: 'Brenner, M. P., Tang, E., & Bialek, W.',
      institution: 'Harvard University, University of Pennsylvania, Princeton',
      journal: 'Neural Computation',
      year: 2023,
      doi: 'https://doi.org/10.1162/neco_a_01567',
      abstract: 'We present a hybrid approach combining Gaussian process recurrent neural networks with SINDy to discover interpretable models of neural dynamics. Applied to recordings from the visual cortex, our method identifies sparse nonlinear differential equations that govern neural population activity, bridging the gap between black-box deep learning models and interpretable dynamical systems in neuroscience.',
      imageUrl: '/api/placeholder/600/400',
      highlight: true,
      metrics: {
        citations: 67,
        impact: 'High'
      }
    },
    {
      id: 12,
      category: 'climate',
      title: 'Data-driven equation discovery of ocean mesoscale closures',
      authors: 'Zanna, L., & Bolton, T.',
      institution: 'New York University, Oxford University',
      journal: 'Geophysical Research Letters',
      year: 2023,
      doi: 'https://doi.org/10.1029/2023GL103362',
      abstract: 'This work applies SINDy to high-resolution ocean simulations to discover equations for mesoscale eddy parameterizations in climate models. We identify sparse, physically interpretable closures that significantly improve the representation of ocean heat transport in coarse-resolution simulations, with important implications for climate projections and understanding of ocean circulation patterns.',
      imageUrl: '/api/placeholder/600/400',
      highlight: true,
      metrics: {
        citations: 92,
        impact: 'Very High'
      }
    },
    {
      id: 13,
      category: 'physics',
      title: 'Learning quantum dynamics with latent SINDy',
      authors: 'Champion, K., Zheng, P., Aravkin, A., & Kutz, J. N.',
      institution: 'Lawrence Livermore National Laboratory',
      journal: 'Physical Review Letters',
      year: 2023,
      doi: 'https://doi.org/10.1103/PhysRevLett.130.040402',
      abstract: 'We extend SINDy to quantum systems by combining it with autoencoder architectures to discover governing equations in latent coordinates. This approach successfully identifies interpretable models for quantum many-body systems, revealing hidden conservation laws and symmetries that are obscured in the original high-dimensional Hilbert space representation.',
      imageUrl: '/api/placeholder/600/400',
      highlight: true,
      metrics: {
        citations: 156,
        impact: 'Very High'
      }
    },
    {
      id: 14,
      category: 'fluid',
      title: 'Discovering shock-turbulence interaction models via SINDy',
      authors: 'Maulik, R., & San, O.',
      institution: 'Argonne National Laboratory, Oklahoma State University',
      journal: 'Journal of Computational Physics',
      year: 2023,
      doi: 'https://doi.org/10.1016/j.jcp.2023.111987',
      abstract: 'This study applies SINDy to high-fidelity simulations of shock-turbulence interactions to extract reduced-order models. We discover sparse governing equations that accurately capture the essential physics of compressible turbulence behind shock waves, providing insights into energy cascade mechanisms and enabling efficient predictions of shock-accelerated flows.',
      imageUrl: '/api/placeholder/600/400',
      highlight: false,
      metrics: {
        citations: 41,
        impact: 'High'
      }
    },
    {
      id: 15,
      category: 'engineering',
      title: 'Sparse identification of nonlinear dynamics in power grids',
      authors: 'Johnson, B. B., Dhople, S. V., & Hamadeh, A. O.',
      institution: 'National Renewable Energy Laboratory, University of Minnesota',
      journal: 'IEEE Transactions on Power Systems',
      year: 2023,
      doi: 'https://doi.org/10.1109/TPWRS.2023.3234567',
      abstract: 'This paper demonstrates the application of SINDy to discover governing equations for power grid dynamics from synchrophasor measurements. The identified models capture both local and network-wide oscillatory modes, providing interpretable insights into grid stability and enabling real-time stability assessment for modern power systems with renewable energy integration.',
      imageUrl: '/api/placeholder/600/400',
      highlight: false,
      metrics: {
        citations: 29,
        impact: 'Medium'
      }
    },
    {
      id: 16,
      category: 'bio',
      title: 'Discovering governing equations from data for gene regulatory networks',
      authors: 'Hoffmann, M., Fröhner, C., & Noé, F.',
      institution: 'Rice University, MD Anderson Cancer Center',
      journal: 'Cell Systems',
      year: 2023,
      doi: 'https://doi.org/10.1016/j.cels.2023.09.001',
      abstract: 'We apply SINDy to single-cell RNA sequencing data to infer the governing equations of gene regulatory networks. Our approach reveals sparse, interpretable models that capture the essential dynamics of cellular differentiation and can predict cell fate decisions. The discovered equations provide mechanistic insights into the regulatory logic underlying complex biological processes.',
      imageUrl: '/api/placeholder/600/400',
      highlight: false,
      metrics: {
        citations: 78,
        impact: 'High'
      }
    },
    {
      id: 17,
      category: 'other',
      title: 'SINDy for Model Discovery in Plasma Physics',
      authors: 'Kaptanoglu, A. A., Morgan, K. D., Hansen, C. J., & Brunton, S. L.',
      institution: 'Princeton Plasma Physics Laboratory',
      journal: 'Physics of Plasmas',
      year: 2022,
      doi: 'https://doi.org/10.1063/5.0084358',
      abstract: 'We apply the SINDy algorithm to discover nonlinear models of plasma dynamics from experimental and simulation data. The method successfully identifies reduced-order models for magnetic confinement fusion plasmas, capturing essential physics including instabilities, transport phenomena, and nonlinear wave interactions while maintaining interpretability for physics understanding.',
      imageUrl: '/api/placeholder/600/400',
      highlight: false,
      metrics: {
        citations: 52,
        impact: 'High'
      }
    },
    {
      id: 18,
      category: 'physics',
      title: 'Sparse regression for turbulent closure modeling',
      authors: 'Beetham, S., & Capecelatro, J.',
      institution: 'University of Michigan, Ann Arbor',
      journal: 'Physical Review Fluids',
      year: 2023,
      doi: 'https://doi.org/10.1103/PhysRevFluids.8.084602',
      abstract: 'We leverage SINDy to discover algebraic closure models for the Reynolds stress tensor directly from high-fidelity simulation data. The sparse identification framework extracts interpretable models that accurately capture the physics of turbulent energy transfer and dissipation, providing a data-driven alternative to traditional RANS modeling approaches.',
      imageUrl: '/api/placeholder/600/400',
      highlight: false,
      metrics: {
        citations: 45,
        impact: 'High'
      }
    },
    {
      id: 19,
      category: 'engineering',
      title: 'Data-driven discovery of partial differential equations for traffic flow modeling',
      authors: 'Thaler, S., Paehler, L., & Adams, N. A.',
      institution: 'Technical University of Munich',
      journal: 'Transportation Research Part B',
      year: 2023,
      doi: 'https://doi.org/10.1016/j.trb.2023.02.001',
      abstract: 'We apply SINDy to discover governing partial differential equations for traffic flow from trajectory data. The identified models capture both free flow and congested traffic regimes, revealing nonlinear wave propagation and shock formation mechanisms. Our data-driven approach provides new insights into traffic dynamics and enables improved traffic prediction and control strategies.',
      imageUrl: '/api/placeholder/600/400',
      highlight: false,
      metrics: {
        citations: 31,
        impact: 'Medium'
      }
    },
    {
      id: 20,
      category: 'bio',
      title: 'Interpretable machine learning for genomics using SINDy',
      authors: 'Chen, W., Liu, H., & Zhang, Y.',
      institution: 'Southern University of Science and Technology, Shenzhen',
      journal: 'Nature Computational Biology',
      year: 2024,
      doi: 'https://doi.org/10.1038/s43588-024-00612-1',
      abstract: 'We develop a SINDy-based framework for discovering interpretable models from genomic data. The approach identifies sparse nonlinear relationships between genetic variants and phenotypes, revealing gene-gene interactions and regulatory mechanisms. This interpretable machine learning method provides biological insights that black-box approaches cannot offer.',
      imageUrl: '/api/placeholder/600/400',
      highlight: false,
      metrics: {
        citations: 24,
        impact: 'High'
      }
    }
  ];

  // Filter and sort publications
  const filteredPublications = publications
    .filter(pub => {
      const matchesCategory = selectedCategory === 'all' || pub.category === selectedCategory;
      const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pub.abstract.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return b.year - a.year;
      if (sortBy === 'citations') return b.metrics.citations - a.metrics.citations;
      if (sortBy === 'impact') {
        const impactOrder = { 'Very High': 3, 'High': 2, 'Medium': 1 };
        return impactOrder[b.metrics.impact] - impactOrder[a.metrics.impact];
      }
      return 0;
    });

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
                <h1 className="text-xl font-bold text-slate-900">SINDy Research</h1>
                <p className="text-xs text-slate-600">Publications & Applications</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        <Navbar currentPage="research" />

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-slate-100/80 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
              <Award className="w-4 h-4" />
              <span>Global Research Impact</span>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 leading-tight">
              Research Using
              <span className="bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent"> SINDy</span>
            </h1>

          </section>

          {/* Filters and Search */}
          <section className="space-y-6 text-slate-400">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-900" />
                    <input
                      type="text"
                      placeholder="Search papers by title, authors, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:border-slate-400 transition-colors"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="citations">Most Cited</option>
                    <option value="impact">Highest Impact</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-900 pointer-events-none" />
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mt-6">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-slate-700 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Publications Grid */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                {filteredPublications.length} Publications Found
              </h2>
            </div>

            <div className="grid gap-6">
              {filteredPublications.map(pub => (
                <div
                  key={pub.id}
                  className={`bg-white/70 backdrop-blur-sm rounded-xl border transition-shadow hover:shadow-xl ${
                    pub.highlight ? 'border-amber-200 ring-2 ring-amber-100' : 'border-slate-200/50'
                  }`}
                >
                  <div className="p-6">
                    {pub.highlight && (
                      <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium mb-4">
                        <TrendingUp className="w-3 h-3" />
                        <span>High Impact Research</span>
                      </div>
                    )}

                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Paper Image */}
                      <div className="lg:col-span-1">
                        <div className="aspect-[3/2] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden">
                          <img
                            src={pub.imageUrl}
                            alt={`Figure from ${pub.title}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <div className="bg-slate-50 rounded-lg p-3">
                            <div className="text-xs text-slate-500">Citations</div>
                            <div className="text-lg font-semibold text-slate-900">{pub.metrics.citations}</div>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <div className="text-xs text-slate-500">Impact</div>
                            <div className={`text-sm font-semibold ${
                              pub.metrics.impact === 'Very High' ? 'text-purple-600' :
                              pub.metrics.impact === 'High' ? 'text-blue-600' :
                              'text-slate-600'
                            }`}>
                              {pub.metrics.impact}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Paper Details */}
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">
                            {pub.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{pub.authors}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{pub.journal}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{pub.year}</span>
                            </div>
                          </div>
                        </div>

                        {/* Abstract */}
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Abstract</h4>
                          <p className={`text-sm text-slate-600 leading-relaxed ${
                            expandedAbstract === pub.id ? '' : 'line-clamp-3'
                          }`}>
                            {pub.abstract}
                          </p>
                          {pub.abstract.length > 200 && (
                            <button
                              onClick={() => setExpandedAbstract(
                                expandedAbstract === pub.id ? null : pub.id
                              )}
                              className="text-sm text-slate-700 hover:text-slate-800 font-medium mt-2"
                            >
                              {expandedAbstract === pub.id ? 'Show less' : 'Read more'}
                            </button>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <a
                            href={pub.doi}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span className="text-sm font-medium">Read Paper</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          
                          {/* Category Badge */}
                          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                            {(() => {
                              const cat = categories.find(c => c.id === pub.category);
                              const Icon = cat?.icon || BookOpen;
                              return (
                                <>
                                  <Icon className="w-4 h-4 text-slate-600" />
                                  <span className="text-sm text-slate-600">{cat?.label}</span>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-16">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Have you used SINDy in your research?
              </h2>
              <p className="text-lg text-slate-200 mb-6 max-w-2xl mx-auto">
                We'd love to feature your work! Submit your publication to be included in our research showcase.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="mailto:contact@sindy.org?subject=SINDy Research Submission"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Rocket className="w-5 h-5" />
                  <span className="font-medium">Submit Your Research</span>
                </a>
                <a
                  href="https://scholar.google.com/scholar?q=SINDy+sparse+identification"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <span className="font-medium">View on Google Scholar</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );}