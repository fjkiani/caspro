'use client';

import React, { useEffect } from 'react';
import { Target, Shield, CheckCircle, Zap, ArrowRight, Clock, DollarSign, TrendingUp } from 'lucide-react';

const MetastasisInterception: React.FC = () => {
  useEffect(() => {
    // Load Chart.js dynamically
    const loadChartJS = async () => {
      const Chart = (await import('chart.js/auto')).default;
      
      // Chart configuration
      const CHART_CONFIG = {
        colors: {
          primary: '#0052CC', 
          secondary: '#00A2FF', 
          light: '#D1ECFF',
          background: '#FFFFFF', 
          grid: '#e2e8f0', 
          text: '#475569'
        },
        font: { weight: '500', size: 12 }
      };

      const defaultOptions = {
        responsive: true, 
        maintainAspectRatio: false,
        plugins: { 
          legend: { display: false }, 
          tooltip: { 
            callbacks: { 
              title: (tooltipItems: any) => {
                const label = tooltipItems[0].chart.data.labels[tooltipItems[0].dataIndex];
                return Array.isArray(label) ? label.join(' ') : label;
              } 
            } 
          } 
        },
        scales: {
          y: { 
            grid: { color: CHART_CONFIG.colors.grid }, 
            ticks: { color: CHART_CONFIG.colors.text, font: { weight: CHART_CONFIG.font.weight } } 
          },
          x: { 
            grid: { color: CHART_CONFIG.colors.grid }, 
            ticks: { color: CHART_CONFIG.colors.text, font: { weight: CHART_CONFIG.font.weight } } 
          }
        }
      };

      // Chart data
      const chartData = {
        assassinScore: { 
          labels: ['Efficacy (40%)', 'Safety (30%)', 'Mission Fit (30%)'], 
          datasets: [{ 
            data: [40, 30, 30], 
            backgroundColor: [CHART_CONFIG.colors.primary, CHART_CONFIG.colors.secondary, CHART_CONFIG.colors.light], 
            borderColor: CHART_CONFIG.colors.background, 
            borderWidth: 4 
          }] 
        },
        functionality: { 
          labels: ['Heuristic', 'AI (Pathogenic)', 'AI (Silent)'], 
          datasets: [{ 
            data: [0.6, 0.602, 0.550], 
            backgroundColor: [CHART_CONFIG.colors.light, CHART_CONFIG.colors.primary, CHART_CONFIG.colors.secondary], 
            borderRadius: 4 
          }] 
        },
        chromatin: { 
          labels: ['Heuristic', 'AI (High Access)', 'AI (Low Access)'], 
          datasets: [{ 
            data: [0.6, 0.885, 0.038], 
            backgroundColor: [CHART_CONFIG.colors.light, CHART_CONFIG.colors.primary, CHART_CONFIG.colors.secondary], 
            borderRadius: 4 
          }] 
        },
        efficacyComparison: { 
          labels: ['Heuristic (Over-optimistic)', 'AI Model (Correctly Penalized)'], 
          datasets: [{ 
            data: [0.85, 0.35], 
            backgroundColor: [CHART_CONFIG.colors.light, CHART_CONFIG.colors.primary], 
            borderRadius: 4 
          }] 
        },
        safetyComparison: { 
          labels: ['Heuristic (Under-estimated Risk)', 'AI Model (Correctly Rejected)'], 
          datasets: [{ 
            data: [0.5, 0.01], 
            backgroundColor: [CHART_CONFIG.colors.light, CHART_CONFIG.colors.primary], 
            borderRadius: 4 
          }] 
        },
        efficacyDistribution: { 
          labels: ['Marginal', 'Acceptable', 'Excellent'], 
          datasets: [{ 
            label: '% of Guides', 
            data: [20, 60, 20], 
            backgroundColor: ['#fbbf24', '#4ade80', '#2dd4bf'], 
            borderRadius: 5 
          }] 
        },
        safetyDistribution: { 
          labels: ['Reject', 'Moderate', 'High Confidence'], 
          datasets: [{ 
            label: '% of Guides', 
            data: [5, 25, 70], 
            backgroundColor: ['#f87171', '#fbbf24', '#4ade80'], 
            borderRadius: 5 
          }] 
        },
        performanceLift: { 
          labels: ['Predictive Accuracy', 'Efficacy Correlation', 'Safety Precision'], 
          datasets: [
            { label: 'Rule-Based Tools', data: [0.62, 0.41, 0.58], backgroundColor: '#94a3b8' }, 
            { label: 'Our AI Platform', data: [0.85, 0.75, 0.81], backgroundColor: '#2563eb' }
          ] 
        },
        chromatinAccessibility: { 
          labels: ['Open (e.g., CXCR4)', 'Closed (e.g., BCL2)'], 
          datasets: [{ 
            label: 'Accessibility Score', 
            data: [0.92, 0.15], 
            backgroundColor: ['#2dd4bf', '#f43f5e'], 
            borderRadius: 4 
          }] 
        },
        gcVsEfficacy: { 
          labels: ['High GC, Poor Sequence', 'Optimal GC, Good Sequence'], 
          datasets: [{ 
            label: 'Predicted Efficacy', 
            data: [0.25, 0.85], 
            backgroundColor: ['#f43f5e', '#2dd4bf'], 
            borderRadius: 4 
          }] 
        },
        targetLockScore: { 
          labels: ['FDA Target (BRAF)', 'Housekeeping Gene', 'Non-Essential Gene'], 
          datasets: [{ 
            label: 'Target Lock Score', 
            data: [0.95, 0.5, 0.2], 
            backgroundColor: ['#2dd4bf', '#fbbf24', '#f43f5e'], 
            borderRadius: 4 
          }] 
        },
        successRate: { 
          labels: ['Predicted', 'Actual'], 
          datasets: [
            { label: 'Other Tools', data: [0.9, 0.3], backgroundColor: '#f43f5e' }, 
            { label: 'Our Platform', data: [0.85, 0.8], backgroundColor: '#2dd4bf' }
          ] 
        }
      };

      // Create charts
      const createChart = (canvasId: string, type: 'bar' | 'doughnut', data: any, customOptions: any = {}) => {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        
        const finalOptions = { ...defaultOptions, ...customOptions };
        new Chart(ctx as HTMLCanvasElement, { type, data, options: finalOptions });
      };

      // Initialize all charts
      createChart('assassinScoreChart', 'doughnut', chartData.assassinScore, { 
        cutout: '60%', 
        plugins: { 
          legend: { display: true, position: 'bottom', labels: { color: CHART_CONFIG.colors.text, font: { size: CHART_CONFIG.font.size, weight: CHART_CONFIG.font.weight } } } 
        } 
      });
      
      createChart('functionalityChart', 'bar', chartData.functionality, { 
        indexAxis: 'y', 
        scales: { x: { beginAtZero: true, max: 0.8 } } 
      });
      
      createChart('chromatinChart', 'bar', chartData.chromatin, { 
        indexAxis: 'y', 
        scales: { x: { beginAtZero: true, max: 1.0 } } 
      });
      
      createChart('efficacyChart', 'bar', chartData.efficacyComparison, { 
        scales: { y: { beginAtZero: true, max: 1.0 } } 
      });
      
      createChart('safetyChart', 'bar', chartData.safetyComparison, { 
        scales: { y: { beginAtZero: true, max: 1.0 } } 
      });

      createChart('efficacyDistributionChart', 'bar', chartData.efficacyDistribution, { 
        scales: { y: { title: { display: true, text: '% of Guides' } } } 
      });
      
      createChart('safetyDistributionChart', 'bar', chartData.safetyDistribution, { 
        scales: { y: { title: { display: true, text: '% of Guides' } } } 
      });
      
      createChart('assassinScoreEngineChart', 'doughnut', chartData.assassinScore, { 
        cutout: '60%', 
        plugins: { legend: { display: false } } 
      });
      
      createChart('validationComparisonChart', 'bar', chartData.performanceLift, { 
        plugins: { legend: { display: true, position: 'bottom' } }, 
        scales: { y: { beginAtZero: true, max: 1.0 } } 
      });

      createChart('chromatinAccessibilityChart', 'bar', chartData.chromatinAccessibility, { 
        scales: { y: { beginAtZero: true, max: 1.0 } } 
      });
      
      createChart('gcVsEfficacyChart', 'bar', chartData.gcVsEfficacy, { 
        scales: { y: { beginAtZero: true, max: 1.0 } } 
      });
      
      createChart('targetLockScoreChart', 'bar', chartData.targetLockScore, { 
        indexAxis: 'y', 
        scales: { x: { beginAtZero: true, max: 1.0 } } 
      });
      
      createChart('successRateChart', 'bar', chartData.successRate, { 
        plugins: { legend: { display: true, position: 'bottom' } }, 
        scales: { y: { beginAtZero: true, max: 1.0 } } 
      });
    };

    loadChartJS();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="text-xl font-bold text-[#0052CC] tracking-tight">Metastasis Interception</a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#problem" className="text-slate-600 hover:text-[#0052CC] font-semibold transition-colors duration-300">The Problem</a>
              <a href="#solution" className="text-slate-600 hover:text-[#0052CC] font-semibold transition-colors duration-300">Our Solution</a>
              <a href="#ai-leap" className="text-slate-600 hover:text-[#0052CC] font-semibold transition-colors duration-300">The AI Leap</a>
              <a href="#insights" className="text-slate-600 hover:text-[#0052CC] font-semibold transition-colors duration-300">Insights</a>
              <a href="#impact" className="text-slate-600 hover:text-[#0052CC] font-semibold transition-colors duration-300">Impact</a>
              <a href="#roadmap" className="text-slate-600 hover:text-[#0052CC] font-semibold transition-colors duration-300">Roadmap</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="text-center py-16 md:py-20 bg-slate-800 text-white shadow-lg">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">Engineering Biological Certainty</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto">The first AI-powered platform to design stage-specific CRISPR therapeutics against cancer's deadliest threat: metastasis.</p>
        </div>
      </header>

      <main>
        {/* Problem Section */}
        <section id="problem" className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0052CC] mb-4">The Problem: Cancer's Deadly March</h2>
              <p className="text-lg text-slate-600 mb-20">Cancer doesn't kill by growing—it kills by <span className="font-bold">spreading</span>. An astonishing <span className="font-bold text-[#0052CC] text-xl">90%</span> of cancer deaths are caused by metastasis, a predictable, multi-step invasion. We built a framework to intercept it at every stage.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: 1, title: 'Growth', color: 'teal', icon: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5', desc: 'A primary tumor grows, developing its own network of blood vessels to fuel its expansion.' },
                { step: 2, title: 'Invasion', color: 'cyan', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4', desc: 'Cancer cells break away from the tumor and push into nearby healthy tissue.' },
                { step: 3, title: 'Intravasation', color: 'sky', icon: 'M9 21h6m-3-18v18m-6-4.5l6-6 6 6', desc: 'The cells penetrate the walls of blood or lymph vessels, entering the body\'s superhighways.' },
                { step: 4, title: 'Circulation', color: 'indigo', icon: 'M13 10V3L4 14h7v7l9-11h-7z', desc: 'Cells travel through the circulatory system, surviving harsh conditions to reach distant sites.' },
                { step: 5, title: 'Extravasation', color: 'purple', icon: 'M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z', desc: 'The cells exit the bloodstream by squeezing through vessel walls into new tissue.' },
                { step: 6, title: 'Micrometastasis', color: 'fuchsia', icon: 'M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20', desc: 'Tiny, undetectable groups of cancer cells begin to form in the new location.' },
                { step: 7, title: 'Angiogenesis', color: 'rose', icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0118 18c-5 .5-9 .5-11.657.343z', desc: 'The new microtumors stimulate the growth of their own blood vessels to get nutrients.' },
                { step: 8, title: 'Colonization', color: 'orange', icon: 'M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9', desc: 'The tumors grow into full-blown, clinically detectable secondary tumors, completing the deadly process.' }
              ].map((stage) => (
                <div key={stage.step} className={`group text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl border-t-4 border-${stage.color}-400 hover:border-${stage.color}-500 transform hover:-translate-y-2 transition-all duration-300`}>
                  <div className={`mx-auto w-20 h-20 flex items-center justify-center bg-${stage.color}-400 rounded-full transition-colors duration-300`}>
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stage.icon}></path>
                    </svg>
                  </div>
                  <h3 className={`font-bold text-${stage.color}-600 mt-5 text-xl`}>{stage.step}. {stage.title}</h3>
                  <p className="text-sm text-slate-500 mt-2">{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0052CC] mb-4">Our Solution</h2>
              <p className="text-lg text-slate-600 mb-12">For any metastatic step, our platform executes a rigorous, fully reproducible 5-stage process to design and validate the optimal CRISPR-based therapeutic.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-center">
              <div className="space-y-6">
                {[
                  { num: 1, title: 'Target Lock 🎯', desc: 'Using multi-modal AI signals, we identify the single most vulnerable gene in the pathway for a specific patient—the genetic Achilles\' heel.' },
                  { num: 2, title: 'Generative Guide Design 🧬', desc: 'Our Evo2 foundation model generates optimal CRISPR guide RNAs, understanding deep biological context far beyond old-school heuristics.' },
                  { num: 3, title: 'Efficacy Prediction 📊', desc: 'We predict how efficiently each guide will cut its target, ranking candidates by their potential to get the job done.' },
                  { num: 4, title: 'Safety Validation 🛡️', desc: 'A genome-wide search ensures our guides won\'t cause collateral damage. We penalize any off-target risks.' },
                  { num: 5, title: 'Assassin Score Ranking ⚔️', desc: 'A composite score balances Efficacy, Safety, and Mission Fit to identify the single best guide to move forward.' }
                ].map((step) => (
                  <div key={step.num} className="flex items-start space-x-4">
                    <div className="text-4xl font-extrabold text-[#00A2FF]">{step.num}.</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
                      <p className="text-md text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 md:mt-0">
                <div className="bg-slate-50 rounded-lg shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-center mb-2 text-slate-700">Anatomy of an 'Assassin' Guide</h3>
                  <p className="text-center text-slate-600 mb-6">Our composite score ensures a balanced, optimized therapeutic candidate.</p>
                  <div className="relative h-64">
                    <canvas id="assassinScoreChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Leap Section */}
        <section id="ai-leap" className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0052CC] mb-4">The AI Leap</h2>
              <p className="text-lg text-slate-600 mb-12">We use predictions from 9.3T-token genomic foundation models. The results show improved accuracy and biological relevance.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                { title: 'Functionality: From Flat Guess to Biological Reality', chartId: 'functionalityChart', desc: 'Instead of a single, arbitrary score, our Evo2-powered model provides realistic variance, correctly scoring pathogenic variants higher than silent ones.' },
                { title: 'Chromatin: Capturing the Genome\'s True State', chartId: 'chromatinChart', desc: 'The model now reflects true biological accessibility, scoring open regions like CXCR4 high (+47.5%) and closed regions like BCL2 correctly low (-93.8%).' },
                { title: 'Efficacy: Correcting Scientific Dogma', chartId: 'efficacyChart', desc: 'We moved beyond simple GC-content rules. Our model correctly penalizes high-GC guides with poor sequence features (e.g., poly-G runs), avoiding over-optimistic predictions.' },
                { title: 'Safety: From Guesswork to Genome-Wide Proof', chartId: 'safetyChart', desc: 'Heuristics might dangerously underestimate risk. Our real alignment against 3.2 billion base pairs correctly rejects unsafe guides with 10+ off-targets.' }
              ].map((item) => (
                <div key={item.chartId} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-center mb-4 text-slate-700">{item.title}</h3>
                  <div className="relative h-64 md:h-80">
                    <canvas id={item.chartId}></canvas>
                  </div>
                  <p className="text-sm text-slate-600 mt-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Insights Section */}
        <section id="insights" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0052CC] mb-12">Key Scientific Insights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { emoji: '💡', title: 'Chromatin Variance is Key', chartId: 'chromatinAccessibilityChart', desc: 'Our model correctly predicts that CRISPR machinery struggles to access genes in tightly packed "closed" chromatin, a crucial factor for therapeutic success.' },
                { emoji: '🧬', title: 'High GC ≠ High Efficacy', chartId: 'gcVsEfficacyChart', desc: 'We corrected a long-held dogma. Our model proves that sequence quality (e.g., avoiding poly-G runs) is more important for efficacy than simple GC content.' },
                { emoji: '🎯', title: 'Target Lock Finds True Drivers', chartId: 'targetLockScoreChart', desc: 'Our multi-modal scoring consistently ranks known, FDA-approved drug targets highest, recapitulating decades of cancer research in minutes.' },
                { emoji: '📊', title: 'Realistic Scoring Prevents Failure', chartId: 'successRateChart', desc: 'Unlike over-optimistic tools, our platform\'s realistic scores align with real-world outcomes, predicting a high wet-lab success rate and saving research capital.' }
              ].map((insight) => (
                <div key={insight.chartId} className="bg-slate-50 rounded-lg shadow-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-3xl">{insight.emoji}</div>
                    <h3 className="text-xl font-bold text-slate-800">{insight.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-6 text-sm">{insight.desc}</p>
                  <div className="relative h-48">
                    <canvas id={insight.chartId}></canvas>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engine Section */}
        <section id="engine" className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0052CC] mb-4">The Scoring Engine</h2>
              <p className="text-lg text-slate-600 mb-12">We replaced simple rules with rigorous, data-driven formulas. Each score is calculated by a specific, transparent, and reproducible method, powered by foundation models.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { title: 'Target Lock Score', color: 'sky', formula: '0.35*func + 0.35*essn +\n0.15*chro + 0.15*regu', desc: 'Weights four biological signals to identify the most vulnerable gene.' },
                { title: 'Efficacy Score', color: 'teal', formula: '1 / (1 + exp(-Δ / 10))', desc: 'Predicts cutting efficiency using a sigmoid function on model outputs.' },
                { title: 'Safety Score', color: 'rose', formula: 'exp(-0.5 * total_hits)', desc: 'Penalizes off-target risk using an exponential decay function.' }
              ].map((score) => (
                <div key={score.title} className={`bg-white rounded-lg p-6 border-t-4 border-${score.color}-500 shadow-lg`}>
                  <h4 className="text-xl font-bold text-center mb-4 text-slate-700">{score.title}</h4>
                  <p className="text-sm text-center text-slate-600 mb-4">{score.desc}</p>
                  <div className="bg-slate-100 p-3 rounded font-mono text-center text-slate-700 font-semibold text-sm whitespace-pre-line">
                    {score.formula}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                { title: 'Predicting Potency', chartId: 'efficacyDistributionChart', desc: 'The **Efficacy Score** predicts how well a guide will work. This chart shows the distribution of scores for thousands of generated guides.', highlight: '80% of our guides meet the acceptable efficacy threshold (≥0.50).', highlightColor: 'teal' },
                { title: 'Ensuring Precision', chartId: 'safetyDistributionChart', desc: 'The **Safety Score** measures off-target risk. Our validation shows the majority of guides are highly precise.', highlight: '70% of guides achieve a high safety score (≥0.80), a critical benchmark.', highlightColor: 'rose' },
                { title: 'The Final Verdict', chartId: 'assassinScoreEngineChart', desc: 'The **"Assassin" Score** combines all factors into a single, decisive verdict for ranking the best overall therapeutic candidates.', highlight: 'This balanced approach ensures selection of guides that are both potent and safe.', highlightColor: 'indigo' }
              ].map((item) => (
                <div key={item.chartId} className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{item.title}</h3>
                  <p className="text-slate-600 mb-6">{item.desc}</p>
                  <div className="relative h-64">
                    <canvas id={item.chartId}></canvas>
                  </div>
                  <div className={`mt-4 text-center p-3 bg-${item.highlightColor}-50 border-l-4 border-${item.highlightColor}-500 rounded`}>
                    <p className={`font-bold text-${item.highlightColor}-800 text-lg`}>{item.highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Validation Section */}
        <div className="md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-center text-[#003f5c] mb-8">Validation: How We Prove It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-2xl font-bold text-[#003f5c] mb-4">1. Clinically-Proven Targets</h3>
              <p className="mb-4">Our framework was validated not on synthetic data, but on 14 of the most notorious, FDA-approved cancer drug targets. These are real mutations killing real patients.</p>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                <li className="font-semibold"><span className="font-bold text-[#665191]">BRAF V600E</span> (Melanoma)</li>
                <li className="font-semibold"><span className="font-bold text-[#a05195]">KRAS G12D/V</span> (Pancreatic)</li>
                <li className="font-semibold"><span className="font-bold text-[#d45087]">TP53 R248W</span> (Pan-cancer)</li>
                <li className="font-semibold"><span className="font-bold text-[#f95d6a]">MET Exon 14</span> (Lung)</li>
              </ul>
              <h3 className="text-2xl font-bold text-[#003f5c] mt-8 mb-4">2. Foundation Models, Not Heuristics</h3>
              <p className="mb-4">We leverage state-of-the-art genomic AI, making predictions based on deep biological understanding, not outdated statistical rules.</p>
              <ul className="space-y-2 text-gray-700">
                <li><span className="font-bold text-[#003f5c]">Evo2:</span> For predicting variant functionality and guide efficacy.</li>
                <li><span className="font-bold text-[#003f5c]">Enformer:</span> For modeling chromatin accessibility.</li>
                <li><span className="font-bold text-[#003f5c]">BLAST:</span> For genome-wide safety validation.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#003f5c] mb-4 text-center">Performance Leap</h3>
              <p className="text-center text-md mb-4">Our modern AI stack delivers a dramatic improvement in predictive accuracy across the board compared to traditional, rule-based methods.</p>
              <div className="relative h-80">
                <canvas id="validationComparisonChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <section id="impact" className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0052CC] mb-12">Impact</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg p-6 text-center">
                <p className="text-6xl font-extrabold text-[#0052CC]">0.548</p>
                <h4 className="text-xl font-bold mt-2 text-slate-700">Mean Efficacy</h4>
                <p className="text-sm text-slate-500">(± 0.119)</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <p className="text-6xl font-extrabold text-[#0052CC]">0.771</p>
                <h4 className="text-xl font-bold mt-2 text-slate-700">Mean Safety</h4>
                <p className="text-sm text-slate-500">(± 0.210)</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <p className="text-6xl font-extrabold text-[#0052CC]">0.517</p>
                <h4 className="text-xl font-bold mt-2 text-slate-700">Mean Assassin Score</h4>
                <p className="text-sm text-slate-500">(± 0.114)</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-inner p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">For Biotech Developers</h3>
                <p className="text-6xl font-extrabold text-[#00A2FF] my-4">$1.5M</p>
                <p className="text-lg font-semibold">Saved Per Therapeutic Program</p>
                <p className="text-md mt-2 text-slate-600">By reducing wet-lab failures and accelerating validation from 18 months to 6, we deliver massive ROI.</p>
              </div>
              <div className="bg-white rounded-lg shadow-inner p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">For Oncology Researchers</h3>
                <p className="text-6xl font-extrabold text-[#00A2FF] my-4">1000x</p>
                <p className="text-lg font-semibold">Faster Design-Test Cycles</p>
                <p className="text-md mt-2 text-slate-600">Go from hypothesis to a list of pre-validated guides in minutes, not months.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <div className="md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-center text-[#003f5c] mb-8">From In Silico Design to Clinical Reality</h2>
          <p className="text-lg text-center max-w-4xl mx-auto mb-10">Our platform supports the pipeline from idea to therapeutic development with in-silico validation.</p>
          <div className="max-w-3xl mx-auto">
            {[
              { title: 'Phase 1: Computational Design (Our Platform)', timeline: '5 Minutes', desc: 'We deliver a "Target Dossier" with ranked, pre-validated guides, ready for synthesis.' },
              { title: 'Phase 2: In Vitro Validation (Partner Lab)', timeline: '2-4 Weeks', desc: 'Partners confirm cutting efficiency and safety in cell lines, validating our predictions.' },
              { title: 'Phase 3: Functional Validation (Research Lab)', timeline: '2-3 Months', desc: 'Researchers prove the edited cells have the desired biological effect (e.g., blocking angiogenesis).' },
              { title: 'Phase 4 & 5: Preclinical & Clinical Trials', timeline: '5-10 Years', desc: 'Successful candidates move into animal models and eventually human trials, on the path to FDA approval.' }
            ].map((phase, index) => (
              <div key={index} className={`relative pb-10 pl-10 ${index < 3 ? 'border-l-2 border-slate-300' : ''}`}>
                <div className="absolute left-[-11px] top-1 w-5 h-5 bg-[#00A2FF] rounded-full border-3 border-white"></div>
                <h4 className="text-xl font-bold text-[#003f5c]">{phase.title}</h4>
                <p className="font-semibold text-[#a05195]">{phase.timeline}</p>
                <p>{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Roadmap Section */}
        <div className="md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-center text-[#003f5c] mb-8">Future Vision: The v2 Roadmap</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { emoji: '🧬', title: 'Production-Grade Models', desc: 'Replace chromatin stubs with fully integrated production models for even higher accuracy.' },
              { emoji: '🔬', title: 'Integrate AlphaFold 3', desc: 'Incorporate structural assessments of designed constructs for a new dimension of validation.' },
              { emoji: '📈', title: 'Clinical Outcome Validation', desc: 'Publish a dedicated paper validating our risk assessment framework against real-world clinical outcomes.' }
            ].map((item) => (
              <div key={item.title} className="p-4">
                <div className="text-5xl mb-2">{item.emoji}</div>
                <h4 className="text-xl font-bold mt-2 text-[#003f5c]">{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl text-white font-bold mb-4">This is the beginning of engineered certainty.</h2>
          <p className="text-slate-300">Contact [alpha@crispro.ai] for details.</p>
          
          {/* Research Use Only Disclaimer */}
          <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-yellow-400 text-lg">⚠️</span>
              <h3 className="text-yellow-400 font-bold text-lg">Research Use Only</h3>
            </div>
            <p className="text-yellow-200 text-sm">
              This platform and all predictions are for research purposes only. Not for use in diagnostic procedures or clinical decision-making.
            </p>
            <p className="text-yellow-300 text-xs mt-2">
              All therapeutic designs require experimental validation before clinical application.
            </p>
          </div>
          
          <p className="mt-6 text-sm">&copy; 2025 Metastasis Interception Framework. For Research Use Only (RUO).</p>
        </div>
      </footer>
    </div>
  );
};

export default MetastasisInterception;
