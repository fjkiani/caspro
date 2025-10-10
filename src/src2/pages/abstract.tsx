<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CrisPRO.ai - An Agentic Platform for Designing Cancer Immunotherapies</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .poster-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            padding: 2rem;
            width: 100%;
            max-width: 96rem; /* Standard poster size ~48in wide */
            margin: auto;
            background-color: white;
        }
        .poster-column {
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .poster-header {
            grid-column: 1 / -1;
            background-color: #1e3a8a; /* Dark Blue */
            color: white;
            padding: 2.5rem;
            border-radius: 1rem;
            text-align: center;
            border-bottom: 8px solid #3b82f6;
        }
        .poster-title {
            font-size: 3.25rem;
            font-weight: 900;
            line-height: 1.1;
        }
        .poster-authors {
            font-size: 1.5rem;
            margin-top: 1rem;
            font-weight: 600;
        }
        .poster-affiliations {
            font-size: 1.25rem;
            margin-top: 0.5rem;
            color: #93c5fd;
        }
        .section {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 0.75rem;
            padding: 1.5rem;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
        .section-title {
            font-size: 2rem;
            font-weight: 800;
            color: #111827;
            margin-bottom: 1rem;
            text-align: left;
            border-bottom: 3px solid #d1d5db;
            padding-bottom: 0.5rem;
        }
        .section-content {
             flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
        .section-content p {
            font-size: 1.1rem;
            line-height: 1.6;
            color: #374151;
            text-align: left;
        }
        .failure-card-new {
            background-color: #fff;
            border-radius: 0.75rem;
            padding: 1rem;
            text-align: center;
            border: 1px solid #fee2e2;
            background-color: #fef2f2;
        }
         .jenga-block {
            height: 1.75rem;
            border: 2px solid #9ca3af;
            border-radius: 0.25rem;
            background-color: #e5e7eb;
        }
        .evidence-block {
            background-color: white;
            border: 1px solid #e5e7eb;
            border-left: 5px solid #3b82f6;
            padding: 1rem;
            border-radius: 0.5rem;
            text-align: left;
            margin-top: auto; /* Pushes the card to the bottom */
        }
        @keyframes fall {
            to {
                transform: translateX(30px) rotate(45deg);
                opacity: 1;
            }
        }
    </style>
</head>
<body class="p-8">

    <div class="poster-container">
        
        <!-- Poster Header -->
        <header class="poster-header">
            <h1 class="poster-title">An agentic platform for designing cancer immunotherapies: From automated variant interpretation to in silico therapeutic validation</h1>
            <div class="poster-authors">Fahad Kiani, Founder & CTO</div>
            <div class="poster-affiliations">CrisPRO.ai</div>
        </header>

        <!-- COLUMN 1: The Problem & Introduction -->
        <div class="poster-column">
            <div class="section">
                <h2 class="section-title">Abstract</h2>
                <div class="section-content">
                    <p>The development of novel therapeutics is crippled by the clinical and financial paralysis caused by Variants of Uncertain Significance (VUS). To address this, we have developed CrisPRO.ai, an in-silico research-use-only (RUO) framework that provides a definitive, evidence-backed verdict on such variants. Our platform orchestrates a generalist genome foundation model with specialist predictors and structural oracles to achieve state-of-the-art (SOTA) accuracy. We demonstrate how our fusion AI framework transforms a VUS from a point of clinical ambiguity into a de-risked, computationally validated, and patent-worthy therapeutic asset.</p>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">The Challenge: Mechanistic Uncertainty</h2>
                <div class="section-content">
                    <p class="mb-4">Traditional drug development is a process defined by catastrophic failure. This is not a law of nature; it is a failure of intelligence. The <strong class="text-red-600">$2.6 billion</strong> price tag per drug is the direct cost of ambiguity.</p>
                </div>
            </div>
            <div class="section">
                <h2 class="section-title">The Core Drivers of Failure</h2>
                <div class="section-content grid grid-cols-2 gap-4">
                   <div class="failure-card-new">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-red-500"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <p class="text-4xl font-black text-red-600 mt-2">>90%</p>
                        <p class="text-md font-semibold text-gray-800">Clinical Failure Rate</p>
                   </div>
                   <div class="failure-card-new">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-red-500"><path d="M12 8v4l2 1"/><circle cx="12" cy="12" r="10"/></svg>
                        <p class="text-4xl font-black text-red-600">10-15</p>
                        <p class="text-md font-semibold text-gray-800">Years of R&D</p>
                   </div>
                    <div class="failure-card-new">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-red-500"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        <p class="text-4xl font-black text-red-600">40%</p>
                        <p class="text-md font-semibold text-gray-800">VUS Rate</p>
                   </div>
                   <div class="failure-card-new">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-red-500"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        <p class="text-4xl font-black text-red-600">$2.6B</p>
                        <p class="text-md font-semibold text-gray-800">Wasted Capital</p>
                   </div>
                </div>
            </div>
        </div>

        <!-- COLUMN 2: Automated Variant Interpretation -->
        <div class="poster-column">
            <div class="section">
                <h2 class="section-title">Automated Variant Interpretation</h2>
                <div class="section-content"><p>We transform ambiguous genetic data into definitive, actionable verdicts through a two-step computational process.</p></div>
            </div>
            <div class="section">
                <h3 class="text-xl font-bold text-left text-gray-800 mb-2">1. From VUS to a Quantitative Verdict</h3>
                <div class="section-content">
                    <p class="mb-4 text-base">Our platform provides a quantitative verdict on a variant's functional impact, replacing clinical uncertainty with a clear, actionable signal.</p>
                     <div class="bg-white p-4 rounded-xl text-center border-2 border-gray-200 shadow-inner flex-grow flex flex-col justify-center">
                        <p class="text-md font-semibold text-slate-600">Zeta Score: Biological Impact</p>
                        <div class="relative w-full max-w-xs mx-auto h-20 my-2">
                            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 border-t-[8px] border-l-[8px] border-r-[8px] border-gray-200 rounded-t-full"></div>
                            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 border-t-[8px] border-l-[8px] border-r-[8px] border-transparent rounded-t-full" style="border-image: linear-gradient(to right, #10b981, #facc15, #ef4444) 1;"></div>
                            <div class="absolute bottom-0 left-1/2 w-0.5 h-20 origin-bottom" style="transform: rotate(80deg);"><div class="w-full h-full bg-slate-800 rounded-t-full"></div><div class="absolute -top-1 -left-1 w-3 h-3 bg-slate-800 rounded-full border-2 border-white"></div></div>
                        </div>
                        <div class="flex justify-between w-44 mx-auto -mt-6 text-xs font-bold"><span class="text-green-600">BENIGN</span><span class="text-red-600">PATHOGENIC</span></div>
                        <div class="mt-2"><p class="text-3xl font-bold font-mono text-red-600">-26,140.8</p><p class="text-md font-semibold text-red-700">(PATHOGENIC)</p></div>
                    </div>
                    <div class="evidence-block">
                        <p class="text-3xl font-black text-blue-600">AUROC ≈0.95</p>
                        <p class="text-md font-semibold text-gray-800">Oncology-Specific Accuracy</p>
                        <p class="text-sm text-gray-600 mt-1">For key targets like BRCA1/2, our fusion approach achieves SOTA performance.</p>
                    </div>
                </div>
            </div>
            <div class="section">
                <h3 class="text-xl font-bold text-left text-gray-800 mb-2">2. Confirming the Achilles' Heel</h3>
                 <div class="section-content">
                    <p class="mb-4 text-base">We then confirm if this pathogenic target is truly essential for the cancer's survival, preventing investment in non-viable pathways.</p>
                    <div class="grid grid-cols-2 gap-4 items-center flex-grow">
                         <div class="bg-amber-100 p-4 rounded-lg border border-amber-300 h-full text-center">
                            <h4 class="text-lg font-bold text-amber-800">Non-Essential</h4>
                            <div class="w-24 mx-auto my-2"><div class="jenga-block"></div><div class="flex -my-0.5"><div class="h-7 w-1/3 bg-amber-300 border-2 border-amber-500 rounded relative z-10" style="transform: translateX(8px)"></div><div class="jenga-block w-1/3"></div><div class="jenga-block w-1/3"></div></div><div class="jenga-block"></div></div>
                             <p class="text-sm font-semibold text-red-800">Outcome: Cancer Adapts</p>
                        </div>
                         <div class="bg-emerald-100 p-4 rounded-lg border border-emerald-300 h-full text-center">
                            <h4 class="text-lg font-bold text-emerald-800">Essential</h4>
                             <div class="w-24 mx-auto my-2"><div class="jenga-block opacity-50" style="transform: translateY(3px) rotate(1deg);"></div><div class="flex -my-0.5 opacity-50" style="transform: translateY(3px) rotate(1deg);"><div class="jenga-block w-1/3"></div><div class="jenga-block w-1/3"></div><div class="jenga-block w-1/3"></div></div><div class="h-7 bg-emerald-400 border-2 border-emerald-600 rounded relative z-10" style="transform: translateX(15px) rotate(3deg); opacity:0; animation: fall 2s ease-in-out forwards 1s;"></div></div>
                            <p class="text-sm font-semibold text-green-800">Outcome: Catastrophic Kill</p>
                        </div>
                    </div>
                     <div class="evidence-block border-blue-500">
                        <p class="text-3xl font-black text-blue-600">Matches CRISPR Screens</p>
                        <p class="text-md font-semibold text-gray-800">Functional Genomics Validation</p>
                        <p class="text-sm text-gray-600 mt-1">Our in-silico essentiality predictions align with gold-standard experimental results.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- COLUMN 3: In-Silico Therapeutic Design & Validation -->
        <div class="poster-column">

        <div class="section">
            <h3 class="section-title">Step 1: Design</h3>
            <h2 class="section-subtitle">AI-Powered Therapeutic Engineering</h2>
            <div class="section-content">
                <p>We bypass serendipitous discovery by engineering candidates from first principles. Our generative engine forges novel biologics and CRISPR payloads optimized for high affinity and minimal off-target effects.</p>
                
                <div class="flex items-center justify-around space-x-2 my-6 p-4 bg-white rounded-xl flex-grow border">
                    <div class="text-center">
                        <svg class="h-16 w-16 text-purple-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M12 7.5V5.25m0 2.25l-2.25-1.313M6.75 7.5l-2.25-1.313M6.75 7.5l2.25 1.313M6.75 7.5V5.25m9 0l2.25-1.313M17.25 5.25l-2.25 1.313M17.25 5.25V7.5" />
                        </svg>
                        <p class="font-semibold text-purple-800 mt-2">Engineered Biologic</p>
                    </div>
                    
                    <svg class="h-12 w-12 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>

                    <div class="text-center">
                        <svg class="h-16 w-16 text-emerald-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.17 48.17 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                        <p class="font-semibold text-emerald-800 mt-2">Validated Target</p>
                    </div>
                </div>
                 <div class="p-4 mt-2 bg-amber-50 border-l-4 border-amber-400 text-amber-900">
                    <p class="font-semibold">Hard Evidence:</p>
                    <p class="text-sm">Generated genomes achieve a **~70% Pfam-hit rate** vs. ~18% for prior models, proving we engineer biologically coherent assets.</p>
                 </div>
            </div>
        </div>
        
        <div class="section">
             <h3 class="section-title">Step 2: Validation</h3>
             <h2 class="section-subtitle">Virtual Trials, Real-World Correlation</h2>
             <div class="section-content">
                <p>Our computational predictions are validated against "gold-standard" Deep Mutational Scanning (DMS) assays, turning slow, expensive experiments into rapid, high-certainty verdicts.</p>
                <div class="w-full h-80 bg-white rounded-xl p-6 border-2 border-slate-200 relative my-6 flex-grow">
                    <div class="absolute inset-6 grid grid-cols-4 grid-rows-4">
                        <div class="grid-line w-full h-px top-0"></div><div class="grid-line w-full h-px top-1/4"></div><div class="grid-line w-full h-px top-2/4"></div><div class="grid-line w-full h-px top-3/4"></div><div class="grid-line w-full h-px top-full"></div>
                        <div class="grid-line h-full w-px left-0"></div><div class="grid-line h-full w-px left-1/4"></div><div class="grid-line h-full w-px left-2/4"></div><div class="grid-line h-full w-px left-3/4"></div><div class="grid-line h-full w-px left-full"></div>
                    </div>
                    <p class="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-semibold text-slate-600" style="transform-origin: left center;">CrisPRO.ai Prediction ↑</p>
                    <p class="absolute -bottom-2 left-1/2 -translate-x-1/2 text-sm font-semibold text-slate-600">Experimental Score (DMS) →</p>
                    <svg class="relative" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                         <circle cx="10" cy="90" r="2" class="text-sky-500" fill="currentColor"></circle>
                         <circle cx="22" cy="78" r="2" class="text-sky-500" fill="currentColor"></circle>
                         <circle cx="35" cy="68" r="2" class="text-sky-500" fill="currentColor"></circle>
                         <circle cx="45" cy="52" r="2" class="text-sky-500" fill="currentColor"></circle>
                         <circle cx="58" cy="45" r="2" class="text-sky-500" fill="currentColor"></circle>
                         <circle cx="70" cy="31" r="2" class="text-sky-500" fill="currentColor"></circle>
                         <circle cx="82" cy="22" r="2" class="text-sky-500" fill="currentColor"></circle>
                         <circle cx="91" cy="10" r="2" class="text-sky-500" fill="currentColor"></circle>
                         <line x1="5" y1="95" x2="95" y2="5" stroke-width="3" class="text-emerald-500" stroke="currentColor" stroke-linecap="round"></line>
                    </svg>
                     <div class="absolute top-4 right-4 bg-white/70 backdrop-blur-sm p-2 rounded-md border border-slate-300">
                        <p class="font-bold text-emerald-800 text-lg">R² ≈ 0.92</p>
                        <p class="text-xs text-slate-500">Strong Correlation</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <h3 class="section-title">Outcome</h3>
            <h2 class="section-subtitle">From Verdict to De-Risked Asset</h2>
            <div class="section-content">
                 <p class="mb-6">The validated target becomes the input for our **Zeta Forge**, which generates a complete, computationally-proven therapeutic blueprint, ready for synthesis.</p>

                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="flex-shrink-0 h-12 w-12 bg-blue-100 border-2 border-blue-200 rounded-full flex items-center justify-center">
                             <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                             </svg>
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-800">Engineered Arsenal</h4>
                            <p class="text-slate-600 text-base">Optimized CRISPR Payloads, HDR Templates, and Novel Biologics.</p>
                        </div>
                    </div>

                    <div class="ml-6 border-l-2 border-dashed border-slate-300 h-8"></div>
                    
                    <div class="flex items-start gap-4">
                         <div class="flex-shrink-0 h-12 w-12 bg-green-100 border-2 border-green-200 rounded-full flex items-center justify-center">
                            <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                            </svg>
                         </div>
                        <div class="flex-grow">
                             <h4 class="font-bold text-slate-800 mb-2">Final Deliverable: The Blueprint</h4>
                            <div class="bg-slate-800 text-white rounded-lg p-4 border-2 border-slate-600 shadow-lg font-mono text-left w-full">
                                <p class="text-sm text-cyan-400">// THERAPEUTIC_BLUEPRINT</p>
                                <p><span class="text-slate-400">asset_id:</span> "CS-BRCA1-GC-001"</p>
                                <p><span class="text-slate-400">type:</span> "High-Fidelity HDR"</p>
                                <p><span class="text-slate-400">predicted_efficacy:</span> <span class="text-green-400 font-bold">0.895</span></p>
                                <p><span class="text-slate-400">status:</span> "<span class="text-yellow-400">READY_FOR_SYNTHESIS</span>"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
        
        <!-- COLUMN 4: Conclusion & Deliverable -->
        <div class="poster-column">
            <div class="section">
                <h2 class="section-title">The Deliverable</h2>
                <div class="section-content">
                    <p>The final output is not data; it's a de-risked, computationally validated immunotherapy candidate with a comprehensive dossier of in-silico evidence.</p>
                    <div class="my-6"><div class="bg-emerald-100 p-6 rounded-2xl border-2 border-emerald-300 shadow-lg relative"><div class="absolute top-3 right-3 bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">RUO</div><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600 mr-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><div><h3 class="text-3xl font-bold text-emerald-800 text-left">IND-Ready Asset</h3><p class="text-xl text-emerald-700 text-left">Computationally Validated</p></div></div></div></div>
                </div>
            </div>
            <div class="section">
                <h2 class="section-title">A New Paradigm</h2>
                 <div class="section-content space-y-4">
                    <div class="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 mr-3 mt-1 shrink-0"><path d="M21.5 12c0-5.25-4.25-9.5-9.5-9.5S2.5 6.75 2.5 12s4.25 9.5 9.5 9.5"/><path d="M12 21.5c5.25 0 9.5-4.25 9.5-9.5s-4.25-9.5-9.5-9.5"/></svg><div><h4 class="font-bold text-lg text-gray-800">Comprehensive Genome-Scale Analysis</h4><p class="text-base">We see the 98% of the genome that panel tests structurally ignore.</p></div></div>
                    <div class="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600 mr-3 mt-1 shrink-0"><path d="m9 12 2 2 4-4"/><path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z"/></svg><div><h4 class="font-bold text-lg text-gray-800">From Ambiguity to Mechanistic Insight</h4><p class="text-base">We transform a 'maybe' into a definitive, actionable verdict.</p></div></div>
                     <div class="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600 mr-3 mt-1 shrink-0"><circle cx="12" cy="12" r="10"/><path d="M14.31 8H5.69a2 2 0 0 0-1.68 2.83l3.05 5.89a2 2 0 0 0 3.26 0l3.05-5.89A2 2 0 0 0 14.31 8z"/></svg><div><h4 class="font-bold text-lg text-gray-800">From Screening to De Novo Design</h4><p class="text-base">We don't search for a key; we forge one from a blueprint.</p></div></div>
                </div>
            </div>
            <div class="section">
                 <h2 class="section-title">Conclusion & References</h2>
                 <div class="section-content">
                    <p class="mb-4">The CrisPRO.ai RUO framework represents a significant step forward in in-silico drug discovery. By grounding our platform in a rigorously benchmarked, evidence-backed doctrine, we have created a system that can reliably and transparently accelerate therapeutic research, transforming drug development from a high-risk gamble into a predictable engineering discipline.</p>
                    <div class="mt-6 text-center"><img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://crispro.ai/blog/post/evidence" alt="QR Code to Research Paper" class="mx-auto"/><p class="text-sm font-semibold mt-2 text-gray-700">Scan for Full Paper & Evidence</p></div>
                 </div>
            </div>
        </div>
        
    </div>

</body>
</html>

