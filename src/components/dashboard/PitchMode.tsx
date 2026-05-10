"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, Play, Maximize2, X, Pause, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const SLIDES = [
  {
    title: "The Vision",
    subtitle: "FORGING THE FUTURE OF FREELANCE FINTECH",
    content: "Azima is an AI-powered financial operating system designed specifically for the unique needs of the African freelance economy.",
    metric: "Market Size: $20B+"
  },
  {
    title: "The Problem",
    subtitle: "FRAGMENTED SETTLEMENTS & HIGH FEES",
    content: "Cross-border payments in Africa take up to 7 days and cost 10% in fees. This stifles the growth of the fastest-growing digital workforce.",
    metric: "Avg Fee: 10.5%"
  },
  {
    title: "The Solution",
    subtitle: "SOLANA-POWERED INSTANT SETTLEMENTS",
    content: "By leveraging Solana's high-speed blockchain and AI-automated tax/compliance agents, Azima provides instant, low-cost financial infrastructure.",
    metric: "Settlement: < 2s"
  },
  {
    title: "The Economy",
    subtitle: "AZM TOKEN UTILITY",
    content: "The AZM token powers the platform, providing reduced fees, governance rights, and automated staking rewards for contributors.",
    metric: "Supply: 1B AZM"
  }
];

export default function PitchMode() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const next = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prev = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className={cn(
        "min-h-screen bg-black text-white flex flex-col transition-all duration-700",
        isFullscreen ? 'fixed inset-0 z-[100]' : 'relative rounded-[40px] overflow-hidden border border-white/10 h-[700px]'
    )}>
      {/* Pitch Header */}
      <div className="p-10 flex justify-between items-center bg-gradient-to-b from-black to-transparent z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-glow">
            <span className="text-black font-black text-xl">A</span>
          </div>
          <div>
            <div className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] leading-none mb-1">AZIMA FINTECH</div>
            <div className="text-xl font-black tracking-tighter">AI Pitch Deck</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(!isFullscreen)} className="rounded-full w-12 h-12 p-0">
            {isFullscreen ? <X size={20} /> : <Maximize2 size={20} />}
          </Button>
          <Button 
            variant={isPlaying ? "primary" : "outline"} 
            size="md" 
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-full px-8 h-12 font-bold uppercase tracking-widest text-[10px] shadow-glow"
          >
            {isPlaying ? (
                <>
                    <Pause size={16} className="mr-2 fill-current" />
                    Pause Presentation
                </>
            ) : (
                <>
                    <Play size={16} className="mr-2 fill-current" />
                    Start Presentation
                </>
            )}
          </Button>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute w-[800px] h-[800px] bg-white rounded-full blur-[200px] -z-10 pointer-events-none"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50, filter: 'blur(20px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -50, filter: 'blur(20px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl w-full text-center relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xs font-black text-neutral-500 tracking-[0.5em] uppercase mb-6"
            >
              {SLIDES[currentSlide].subtitle}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-8xl lg:text-[120px] font-black tracking-[-0.05em] mb-12 leading-[0.9]"
            >
              {SLIDES[currentSlide].title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl text-neutral-400 leading-tight mb-16 max-w-3xl mx-auto font-medium tracking-tight"
            >
              {SLIDES[currentSlide].content}
            </motion.p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
              className="inline-flex items-center gap-4 px-10 py-5 rounded-3xl bg-white text-black text-2xl font-black shadow-glow-strong"
            >
              <RefreshCw className={cn("w-6 h-6", isPlaying && "animate-spin")} />
              {SLIDES[currentSlide].metric}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pitch Footer Controls */}
      <div className="p-12 flex justify-between items-center z-10">
        <div className="flex gap-4">
          {SLIDES.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-1.5 transition-all duration-700 rounded-full",
                i === currentSlide ? "w-20 bg-white shadow-glow" : "w-4 bg-white/10 hover:bg-white/20"
              )} 
            />
          ))}
        </div>
        <div className="flex gap-6">
          <Button variant="outline" size="md" className="rounded-2xl w-14 h-14 p-0 bg-white/[0.02] border-white/10 hover:border-white/40" onClick={prev}>
            <ChevronLeft size={28} />
          </Button>
          <Button variant="outline" size="md" className="rounded-2xl w-14 h-14 p-0 bg-white/[0.02] border-white/10 hover:border-white/40" onClick={next}>
            <ChevronRight size={28} />
          </Button>
        </div>
      </div>

      {/* Progress Bar for Autoplay */}
      {isPlaying && (
        <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
            className="absolute bottom-0 h-1 bg-white shadow-glow z-50"
        />
      )}
    </div>
  );
}
