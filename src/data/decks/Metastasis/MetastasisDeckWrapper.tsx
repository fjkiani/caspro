'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Background, Brand, Navigation, Slide } from './UI';
import * as Slides from './Slides';
import { deckContent } from './SlideContent';

// Map string names from data to actual imported components
const slideComponentMap = {
    MetastasisTitleSlide: Slides.MetastasisTitleSlide,
    ProblemSlide: Slides.ProblemSlide,
    MetastasisBattlefieldSlide: Slides.MetastasisBattlefieldSlide,
    IntelligenceVictorySlide: Slides.IntelligenceVictorySlide,
    SolutionSlide: Slides.SolutionSlide,
    AhaMomentSlide: Slides.AhaMomentSlide,
    ValidationSlide: Slides.ValidationSlide,
    OutputSlide: Slides.OutputSlide,
    ImpactSlide: Slides.ImpactSlide,
    VictorySlide: Slides.VictorySlide,
    UnfairAdvantageSlide: Slides.UnfairAdvantageSlide,
    UnfairAdvantageSlide2: Slides.UnfairAdvantageSlide2,
    VisionSlide: Slides.VisionSlide,
    AskSlide: Slides.AskSlide,
};

const MetastasisDeckWrapper: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide(prev => (prev === deckContent.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide(prev => (prev === 0 ? deckContent.length - 1 : prev - 1));
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);
    
    return (
        <main className="relative w-full h-screen bg-slate-900 text-white font-sans overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/40 z-0"></div>
            <Background />
            <Brand />
            
            {deckContent.map((slideData, i) => {
                const SlideComponent = slideComponentMap[slideData.component as keyof typeof slideComponentMap];
                if (!SlideComponent) {
                    console.error(`Slide component "${slideData.component}" not found!`);
                    return null;
                }
                return (
                    <Slide key={i} isVisible={i === currentSlide}>
                        <SlideComponent {...(slideData as any)} />
                    </Slide>
                );
            })}
            
            <Navigation 
                current={currentSlide} 
                total={deckContent.length} 
                onPrev={prevSlide} 
                onNext={nextSlide} 
            />
        </main>
    );
};

export default MetastasisDeckWrapper;
