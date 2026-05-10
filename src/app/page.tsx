"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ChevronRight, Sparkles, Cpu, Rocket, BarChart3, Users, Globe, Shield, Zap, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const { connected } = useWallet();
  const router = useRouter();

  const steps = [
    "Analyzing market trends...",
    "Defining startup persona...",
    "Generating brand identity...",
    "Drafting investor roadmap...",
    "Forging startup NFT..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-white selection:text-black">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-[0.15] z-0" />
      <div className="absolute inset-0 noise-bg z-0 pointer-events-none" />
      
      {/* Dynamic Glows */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white/[0.03] blur-[150px] rounded-full z-0" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[120px] rounded-full z-0" 
      />

      {/* Nav */}
      <nav className="relative z-50 flex justify-between items-center px-10 py-8 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 group cursor-pointer">
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-glow-strong transition-all duration-500"
          >
            <span className="text-black font-black text-2xl">F</span>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-[0.2em] leading-none text-white">FORGEME</span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-500 uppercase mt-1">Beta OS v1.0</span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-12 bg-white/[0.03] px-8 py-3 rounded-full border border-white/5 backdrop-blur-md">
          <Link href="/dashboard" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">OS Platform</Link>
          <Link href="/pitch" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Neural Agents</Link>
          <Link href="/profile" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Economy</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href={connected ? "/dashboard" : "/auth"}>
            <Button variant={connected ? "primary" : "outline"} size="md" className="rounded-full px-8 h-12 font-bold uppercase tracking-widest text-[10px]">
              {connected ? (
                <>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Enter Dashboard
                </>
              ) : "Connect Wallet"}
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-[1600px] mx-auto px-10 pt-20 pb-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 mb-10 shadow-glow">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase">Decentralized Intelligence</span>
            </div>
            <h1 className="text-[100px] lg:text-[140px] font-black tracking-[-0.04em] leading-[0.85] mb-12">
                FORGE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-800">LEGACY.</span>
            </h1>
            <p className="text-2xl text-neutral-400 max-w-xl mb-14 leading-tight font-medium tracking-tight">
              The world's first autonomous operating system for startup creation. Built on Solana, powered by high-fidelity AI multi-agent systems.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/forge">
                <Button size="lg" className="group h-16 px-10 rounded-2xl text-lg font-bold shadow-glow-strong">
                  Start Forging
                  <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={connected ? "/dashboard" : "/auth"}>
                <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl text-lg font-bold hover:bg-white/[0.02]">
                    {connected ? "Explore Dashboard" : "Connect Identity"}
                </Button>
              </Link>
            </div>
            
            <div className="mt-20 flex gap-12 items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Network</span>
                    <span className="font-mono text-sm tracking-tighter text-white">Solana Devnet</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Latency</span>
                    <span className="font-mono text-sm tracking-tighter text-white">&lt; 400ms</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Security</span>
                    <span className="font-mono text-sm tracking-tighter text-white">Audited v2.1</span>
                </div>
            </div>
          </motion.div>

          {/* Cinematic Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative perspective-1000"
          >
            <GlassCard className="aspect-square relative flex flex-col justify-center items-center overflow-hidden border-white/20 bg-white/[0.02] shadow-[0_0_100px_rgba(255,255,255,0.05)] rounded-[40px]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
              
              {/* Central Core */}
              <div className="relative w-72 h-72 mb-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-6 border border-white/20 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-40 h-40 bg-white/[0.03] rounded-full blur-3xl" />
                  <Cpu className="w-20 h-20 text-white relative z-10" />
                </motion.div>
              </div>

              {/* Steps Indicator */}
              <div className="text-center px-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="mb-4"
                  >
                    <span className="text-neutral-600 text-xs font-black uppercase tracking-[0.4em] mb-2 block">Neural Phase 0{activeStep + 1}</span>
                    <h3 className="text-3xl font-bold tracking-tight text-white">{steps[activeStep]}</h3>
                  </motion.div>
                </AnimatePresence>
                <div className="flex gap-2 justify-center mt-6">
                  {steps.map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-1.5 transition-all duration-700 rounded-full",
                        i === activeStep ? "w-16 bg-white shadow-glow" : "w-3 bg-white/10"
                      )} 
                    />
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Floating Assets */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass p-6 rounded-3xl shadow-glow border-white/20 backdrop-blur-2xl bg-black/40"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-glow">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-black mb-1">Growth Index</div>
                  <div className="text-2xl font-black text-white">+142.4%</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-glow border-white/20 backdrop-blur-2xl bg-black/40"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-glow">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-black mb-1">Collaborators</div>
                  <div className="text-2xl font-black text-white">2.4k+</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="relative z-10 border-y border-white/5 py-12 bg-white/[0.01]">
        <div className="max-w-[1600px] mx-auto px-10 flex flex-wrap justify-between items-center gap-12 opacity-40">
            <TrustIcon icon={<Globe />} text="Global Scalability" />
            <TrustIcon icon={<Shield />} text="Onchain Security" />
            <TrustIcon icon={<Zap />} text="High Fidelity Execution" />
            <TrustIcon icon={<Cpu />} text="Neural Architecture" />
        </div>
      </section>
    </div>
  );
}

function TrustIcon({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="flex items-center gap-3">
            {React.cloneElement(icon as React.ReactElement, { size: 20 })}
            <span className="text-sm font-bold uppercase tracking-widest text-white/80">{text}</span>
        </div>
    );
}
