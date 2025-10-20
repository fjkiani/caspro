// components/CoreUI.js

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { 
    ArrowRight, Target, Dna, Award, FilterX, TrendingDown, ShieldCheck, 
    GitBranch, Zap, Cpu, BrainCircuit, Move, Crosshair, SlidersHorizontal, Box,
    FileText, CheckCircle, Clock, Dices, BarChart, Users, DollarSign, Package,
    FlaskConical, TestTube, Map, Gavel, Shield, Rocket, Microscope, Activity
} from 'lucide-react';

export const iconMap = {
    FilterX, TrendingDown, Award, GitBranch, Target, Dna, ShieldCheck, Zap,
    Cpu, BrainCircuit, Move, Crosshair, SlidersHorizontal, Box, FileText, CheckCircle,
    Clock, Dices, BarChart, Users, DollarSign, Package, FlaskConical, TestTube, Map, 
    Gavel, Shield, Rocket, Microscope, Activity, ArrowRight
};

const ArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
export const Brand = () => <div className="absolute top-8 left-8 z-20 text-xl font-bold text-white">ZETA<span className="text-cyan-400">INTERCEPT</span></div>;

export const Background = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 25;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);
        const particles: THREE.Mesh[] = [];
        const particleGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x67e8f9 });
        for (let i = 0; i < 400; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50);
            (particle as any).velocity = new THREE.Vector3((Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.015);
            particles.push(particle); scene.add(particle);
        }
        let animationFrameId: number;
        const animate = (time: number) => {
            animationFrameId = requestAnimationFrame(animate);
            particles.forEach(p => {
                p.position.add((p as any).velocity);
                if (Math.abs(p.position.x) > 25) (p as any).velocity.x *= -1;
                if (Math.abs(p.position.y) > 25) (p as any).velocity.y *= -1;
                if (Math.abs(p.position.z) > 25) (p as any).velocity.z *= -1;
            });
            camera.position.x = Math.sin(time * 0.0001) * 2;
            camera.position.y = Math.cos(time * 0.0001) * 2;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        };
        animate(0);
        const handleResize = () => {
            if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (currentMount && renderer.domElement) currentMount.removeChild(renderer.domElement);
        };
    }, []);
    return <div ref={mountRef} className="absolute inset-0 z-0 opacity-30"></div>;
};

export const Navigation: React.FC<{ current: number; total: number; onPrev: () => void; onNext: () => void }> = ({ current, total, onPrev, onNext }) => (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/30 backdrop-blur-md p-2 rounded-full border border-slate-700 shadow-lg">
        <button onClick={onPrev} className="p-3 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors"><ArrowLeft /></button>
        <span className="text-slate-300 font-semibold text-sm w-20 text-center">Slide {current + 1} / {total}</span>
        <button onClick={onNext} className="p-3 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors"><ArrowRight /></button>
    </div>
);

export const Slide: React.FC<{ children: React.ReactNode; isVisible: boolean }> = ({ children, isVisible }) => (
    <AnimatePresence>
        {isVisible && (
            <motion.section
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center p-8 overflow-hidden"
            >
                <div className="relative z-10 w-full max-w-7xl space-y-8">
                    {children}
                </div>
            </motion.section>
        )}
    </AnimatePresence>
);

export const Header: React.FC<{ kicker: string; title: string; kickerClass?: string }> = ({ kicker, title, kickerClass = 'from-cyan-400 to-blue-500' }) => (
    <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <h2 className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text ${kickerClass}`}>{kicker}</h2>
        <h1 className="text-5xl md:text-7xl font-black text-slate-100 mt-2 max-w-5xl mx-auto">
            {title}
        </h1>
    </motion.div>
);