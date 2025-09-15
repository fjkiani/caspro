// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';

// // Branding Component
// const Brand = () => (
//   <div className="absolute bottom-8 right-8 z-20 text-lg font-semibold text-slate-400/70">
//     CrisPRO.ai 🧬
//   </div>
// );

// // Digital Synapse Background with full THREE.js animation
// const DigitalSynapseBackground = () => {
//     const mountRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const currentMount = mountRef.current;
//         if (!currentMount) return;

//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
//         camera.position.z = 50;

//         const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//         renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
//         currentMount.appendChild(renderer.domElement);

//         const nodes: Array<THREE.Mesh & { velocity: THREE.Vector3 }> = [];
//         const nodeGeometry = new THREE.SphereGeometry(0.5, 16, 16);
//         const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });

//         for (let i = 0; i < 100; i++) {
//             const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone()) as THREE.Mesh & { velocity: THREE.Vector3 };
//             node.position.x = (Math.random() - 0.5) * 100;
//             node.position.y = (Math.random() - 0.5) * 100;
//             node.position.z = (Math.random() - 0.5) * 100;
//             node.velocity = new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1);
//             nodes.push(node);
//             scene.add(node);
//         }

//         const lines = new THREE.Group();
//         scene.add(lines);

//         let animationFrameId: number;
//         const animate = () => {
//             animationFrameId = requestAnimationFrame(animate);

//             lines.children.forEach(line => {
//                 const lineMaterial = line.material as THREE.LineBasicMaterial;
//                 lineMaterial.opacity -= 0.01;
//                 if (lineMaterial.opacity <= 0) {
//                     lines.remove(line);
//                 }
//             });

//             nodes.forEach(node => {
//                 node.position.add(node.velocity);
//                 if (node.position.x < -50 || node.position.x > 50) node.velocity.x *= -1;
//                 if (node.position.y < -50 || node.position.y > 50) node.velocity.y *= -1;
//                 if (node.position.z < -50 || node.position.z > 50) node.velocity.z *= -1;
//             });

//             if (Math.random() > 0.95 && lines.children.length < 50) {
//                 const node1 = nodes[Math.floor(Math.random() * nodes.length)];
//                 const node2 = nodes[Math.floor(Math.random() * nodes.length)];
//                 if (node1 !== node2) {
//                     const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8 });
//                     const points = [node1.position, node2.position];
//                     const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
//                     const line = new THREE.Line(lineGeometry, lineMaterial);
//                     lines.add(line);
//                 }
//             }

//             renderer.render(scene, camera);
//         };

//         animate();

//         const handleResize = () => {
//              if (currentMount) {
//                 camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
//                 camera.updateProjectionMatrix();
//                 renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
//             }
//         };
        
//         window.addEventListener('resize', handleResize);

//         return () => {
//             window.removeEventListener('resize', handleResize);
//             cancelAnimationFrame(animationFrameId);
//             if (currentMount && renderer.domElement) {
//                 currentMount.removeChild(renderer.domElement);
//             }
//         };
//     }, []);

//     return <div ref={mountRef} className="absolute inset-0 z-0 opacity-20"></div>;
// };

// interface CinematicSlideData {
//   type: 'title' | 'pathway' | 'vus-solution' | 'competitive-grid' | 'approval-tiers' | 'command-center';
//   title: string;
//   subtitle?: string;
//   backgroundGradient: string;
//   titleGradient: string;
//   content?: any;
// }

// interface CinematicSlideContentProps {
//   data: CinematicSlideData;
//   layout: 'full' | 'split' | 'centered' | 'sidebar' | 'grid' | 'timeline';
// }

// const CinematicSlideContent: React.FC<CinematicSlideContentProps> = ({ data, layout }) => {
//   const renderContent = () => {
//     switch (data.type) {
//       case 'title':
//         return (
//           <div className="relative z-10 w-full px-4 space-y-8">
//             <div className="space-y-6">
//               <h1 className={`text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text ${data.titleGradient} mb-8 drop-shadow-2xl leading-none tracking-tight`}>
//                 {data.content.mainTitle}
//                 <br />
//                 <span className={`text-6xl md:text-7xl lg:text-8xl ${data.content.subTitleGradient} bg-clip-text text-transparent`}>
//                   {data.content.subTitle}
//                 </span>
//               </h1>
              
//                              <div className="relative">
//                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-200 mb-8 leading-relaxed max-w-5xl mx-auto">
//                    How Our Agentic Platform Solved a{" "}
//                    <span className="font-bold text-yellow-400">Multi-Year {data.content.description.split('Multi-Year ')[1]?.split(' Grant')[0]} Grant</span>
//                    {" "}<span className="italic font-semibold text-cyan-400">In Silico</span>
//                  </h2>
//                </div>
//             </div>

//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl max-w-5xl mx-auto">
//               <p className="text-2xl md:text-3xl text-emerald-400 font-medium mb-4">
//                 {data.content.callout}
//               </p>
//             </div>

//             <div className="mt-16 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30 max-w-3xl mx-auto">
//               <p className="text-2xl md:text-3xl font-bold text-white mb-2">
//                 Presented by: 
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
//                   {" "}{data.content.presenter}
//                 </span>
//               </p>
//               <p className="text-xl text-slate-300">
//                 {data.content.presenterTitle}
//               </p>
//             </div>
//           </div>
//         );

//       case 'pathway':
//         return (
//           <div className="relative z-10 w-full px-4 space-y-12">
//             <div className="space-y-6">
//               <h1 className={`text-6xl md:text-7xl font-black text-transparent bg-clip-text ${data.titleGradient} mb-6 drop-shadow-2xl leading-tight`}>
//                 {data.title}
//               </h1>
//               <p className="text-3xl md:text-4xl font-light text-slate-200 leading-relaxed">
//                 {data.subtitle}
//               </p>
//             </div>

//             <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-600/50">
//               <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-4">
//                 {data.content.steps.map((step: any, index: number) => (
//                   <React.Fragment key={index}>
//                     <div className="flex flex-col items-center group">
//                       <div className={`relative w-32 h-32 ${step.bgGradient} rounded-full flex items-center justify-center text-white shadow-2xl transform transition-transform group-hover:scale-110`}>
//                         {step.animation && (
//                           <div className={`absolute inset-0 ${step.animationBg} rounded-full ${step.animation} opacity-20`}></div>
//                         )}
//                         {step.badge && (
//                           <div className={`absolute -top-2 -right-2 w-8 h-8 ${step.badge.bg} rounded-full flex items-center justify-center ${step.badge.animation}`}>
//                             <span className="text-xs">{step.badge.icon}</span>
//                           </div>
//                         )}
//                         <span className="text-sm font-bold z-10" dangerouslySetInnerHTML={{ __html: step.title }}></span>
//                       </div>
//                       <div className={`mt-4 ${step.descBg} rounded-lg px-4 py-2 border ${step.descBorder}`}>
//                         <p className={`${step.descColor} text-lg font-semibold`} dangerouslySetInnerHTML={{ __html: step.description }}></p>
//                       </div>
//                     </div>
//                     {index < data.content.steps.length - 1 && (
//                       <div className="text-5xl text-slate-400 animate-pulse">
//                         <span className="inline-block transform hover:scale-125 transition-transform">⚡</span>
//                       </div>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </div>
//             </div>
//             {data.content.explanation && (
//               <p className="text-slate-300 text-xl max-w-4xl mx-auto mt-8">{data.content.explanation}</p>
//             )}
//           </div>
//         );

//       case 'vus-solution':
//         return (
//           <div className="relative z-10 w-full px-4 space-y-12">
//             <div className="space-y-6">
//               <h1 className={`text-6xl md:text-7xl font-black text-transparent bg-clip-text ${data.titleGradient} mb-6 drop-shadow-2xl leading-tight`}>
//                 {data.title}
//               </h1>
//               <p className="text-3xl md:text-4xl font-light text-slate-200 leading-relaxed">
//                 {data.subtitle}
//               </p>
//             </div>

//             <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-slate-600/50">
//               <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-8">
//                 {data.content.steps.map((step: any, index: number) => (
//                   <React.Fragment key={index}>
//                     {step.type === 'problem' && (
//                       <div className="flex flex-col items-center space-y-4">
//                         <div className="text-8xl">{step.icon}</div>
//                         <h3 className={`text-3xl font-bold ${step.titleColor}`}>{step.title}</h3>
//                         <p className="text-slate-400 text-lg max-w-xs">{step.description}</p>
//                       </div>
//                     )}
//                     {step.type === 'process' && (
//                       <div className="flex flex-col items-center space-y-4">
//                         <div className="text-8xl">{step.icon}</div>
//                         <h3 className={`text-3xl font-bold ${step.titleColor}`}>{step.title}</h3>
//                         <p className="text-slate-400 text-lg max-w-xs">{step.description}</p>
//                       </div>
//                     )}
//                     {step.type === 'solution' && (
//                       <div className="flex flex-col items-center space-y-4">
//                         <div className="w-48 h-48 bg-slate-800 rounded-full flex flex-col justify-center items-center p-4 border-4 border-red-500">
//                           <p className="text-slate-300 text-lg">Zeta Score</p>
//                           <p className="text-red-400 text-4xl font-bold font-mono">{step.score}</p>
//                           <div className="w-full h-2 bg-slate-700 rounded-full mt-2 overflow-hidden">
//                             <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 w-full"></div>
//                           </div>
//                         </div>
//                         <h3 className={`text-3xl font-bold ${step.titleColor}`}>{step.title}</h3>
//                         <p className="text-slate-400 text-lg max-w-xs">{step.description}</p>
//                       </div>
//                     )}
//                     {index < data.content.steps.length - 1 && (
//                       <div className="text-6xl text-slate-500 animate-pulse">➡️</div>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       case 'competitive-grid':
//         return (
//           <div className="relative z-10 w-full px-4 space-y-12">
//             <div className="space-y-6">
//               <h1 className={`text-6xl md:text-7xl font-black text-transparent bg-clip-text ${data.titleGradient} mb-6 drop-shadow-2xl leading-tight`}>
//                 {data.title}
//               </h1>
//               <p className="text-3xl md:text-4xl font-light text-slate-200 leading-relaxed">
//                 {data.subtitle}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
//               {data.content.pillars.map((pillar: any, index: number) => (
//                 <div key={index} className={`bg-slate-800/50 p-8 rounded-2xl border ${pillar.borderColor} text-center space-y-4`}>
//                   <div className="text-6xl">{pillar.icon}</div>
//                   <h3 className={`text-3xl font-bold ${pillar.titleColor}`}>{pillar.title}</h3>
//                   <p className="text-slate-300 text-xl" dangerouslySetInnerHTML={{ __html: pillar.description }}></p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 'command-center':
//         return (
//           <div className="relative z-10 w-full max-w-7xl px-4 space-y-12">
//             <div className="space-y-4">
//               <h1 className="text-6xl md:text-7xl font-black text-slate-200 drop-shadow-2xl leading-tight">
//                 {data.title}
//               </h1>
//               <p className="text-3xl md:text-4xl font-light text-slate-300">
//                 {data.subtitle}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
//               {/* Inputs */}
//               <div className="flex flex-col space-y-4">
//                 <h3 className="text-3xl font-bold text-yellow-400">Inputs</h3>
//                 {data.content.inputs.map((input: any, index: number) => (
//                   <div key={index} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 w-full">
//                     <div className="text-4xl">{input.icon}</div>
//                     <p className="text-xl font-semibold text-slate-300 mt-2">{input.title}</p>
//                     {input.subtitle && <p className="text-yellow-400 font-bold text-lg">{input.subtitle}</p>}
//                   </div>
//                 ))}
//               </div>

//               {/* AI Core */}
//               <div className="flex flex-col items-center space-y-4">
//                 <div className="text-8xl relative">
//                   🧠
//                   <div className="absolute inset-0 -m-4 border-2 border-sky-400/50 rounded-full animate-ping"></div>
//                 </div>
//                 <h3 className="text-4xl font-bold text-sky-400">AI Core</h3>
//               </div>

//               {/* Outputs */}
//               <div className="flex flex-col space-y-4">
//                 <h3 className="text-3xl font-bold text-green-400">Outputs</h3>
//                 {data.content.outputs.map((output: any, index: number) => (
//                   <div key={index} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 w-full">
//                     <div className="text-4xl">{output.icon}</div>
//                     <p className="text-xl font-semibold text-slate-300 mt-2">{output.title}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-8">
//               {data.content.platforms.map((platform: any, index: number) => (
//                 <div key={index} className={`bg-slate-800/50 p-6 rounded-xl border ${platform.borderColor} text-center`}>
//                   <h4 className={`text-2xl font-bold ${platform.titleColor} mb-3`}>{platform.title}</h4>
//                   <p className="text-slate-300 text-lg">{platform.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       default:
//         return <div>Unsupported cinematic slide type</div>;
//     }
//   };

//   return (
//     <section 
//       className={`${data.backgroundGradient} overflow-hidden`}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         margin: 0,
//         padding: '2rem',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         textAlign: 'center',
//         zIndex: 9999
//       }}
//     >
//       <Brand />
//       <DigitalSynapseBackground />
//       {renderContent()}
      
//       {/* CSS for animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-3000 {
//           animation-delay: 3s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CinematicSlideContent; 