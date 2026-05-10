"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, ArrowRight, ArrowLeft, Cpu, Target, Rocket, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForgeme } from '@/hooks/useForgeme';
import { useWallet } from '@solana/wallet-adapter-react';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    id: 'vision',
    title: "Define the Vision",
    description: "What problem are you solving? Be bold and specific.",
    placeholder: "e.g., A decentralized energy grid for rural communities using Solana IoT nodes...",
    icon: <Sparkles />
  },
  {
    id: 'persona',
    title: "Startup Persona",
    description: "Choose the tone and aesthetic for your AI agents.",
    options: [
      { name: 'Silicon Valley Elite', desc: 'Highly polished, VC-ready, professional.' },
      { name: 'Cyberpunk Rebel', desc: 'Edgy, decentralized, anti-establishment.' },
      { name: 'Minimalist', desc: 'Efficient, data-driven, clean logic.' },
      { name: 'Community First', desc: 'Collaborative, open-source, social focus.' }
    ],
    icon: <Cpu />
  },
  {
    id: 'market',
    title: "Target Market",
    description: "Who are your first 1,000 users?",
    placeholder: "e.g., DeFi degens, Sustainable energy investors, Local farmers...",
    icon: <Target />
  }
];

export default function StartupGenerator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({ vision: '', persona: '', market: '' });
  const [isForging, setIsForging] = useState(false);
  const [forgePhase, setForgePhase] = useState(0);
  const router = useRouter();
  const { initializeStartup } = useForgeme();
  const { connected } = useWallet();

  const next = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleForge();
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleForge = async () => {
    setIsForging(true);
    
    // Phase 1: AI Brainstorming (Simulation)
    setForgePhase(1);
    await new Promise(r => setTimeout(r, 2000));
    
    // Phase 2: Onchain Registration (Real or Simulation)
    setForgePhase(2);
    try {
      const startupName = "FORGE_" + Math.random().toString(36).substring(7).toUpperCase();
      
      if (connected && initializeStartup) {
        await initializeStartup(startupName, data.persona || "Tech", "https://arweave.net/metadata");
      } else {
        // Mock delay for simulation
        await new Promise(r => setTimeout(r, 3000));
      }
      
      setForgePhase(3);
      await new Promise(r => setTimeout(r, 1500));
      router.push('/dashboard');
    } catch (err) {
      console.error("Forging failed:", err);
      setIsForging(false);
    }
  };

  if (isForging) {
    return <ForgingOverlay phase={forgePhase} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      <div className="w-full max-w-2xl relative z-10">
        {/* Progress Stepper */}
        <div className="flex justify-between items-center mb-12 px-2">
            {STEPS.map((step, i) => (
                <div key={step.id} className="flex flex-col items-center gap-2">
                    <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500",
                        i === currentStep ? "border-white bg-white text-black shadow-glow-strong" : 
                        i < currentStep ? "border-white/40 bg-white/10 text-white/40" : "border-white/10 bg-white/5 text-white/20"
                    )}>
                        {i < currentStep ? <CheckCircle2 size={18} /> : i + 1}
                    </div>
                </div>
            ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-8 text-center">
                <div className="inline-flex w-16 h-16 rounded-2xl bg-white/5 border border-white/10 items-center justify-center mb-6 text-white shadow-glow">
                    {React.cloneElement(STEPS[currentStep].icon as React.ReactElement, { size: 28 })}
                </div>
                <h1 className="text-5xl font-bold tracking-tighter mb-3 uppercase">{STEPS[currentStep].title}</h1>
                <p className="text-neutral-500 text-lg">{STEPS[currentStep].description}</p>
            </div>

            <GlassCard className="p-8 border-white/10 bg-white/[0.02] shadow-2xl">
                {STEPS[currentStep].placeholder ? (
                    <textarea 
                        className="w-full bg-transparent border-none text-2xl text-white placeholder:text-neutral-800 focus:outline-none min-h-[250px] resize-none font-medium leading-relaxed"
                        placeholder={STEPS[currentStep].placeholder}
                        value={data[STEPS[currentStep].id as keyof typeof data]}
                        onChange={(e) => setData({ ...data, [STEPS[currentStep].id]: e.target.value })}
                        autoFocus
                    />
                ) : (
                    <div className="grid gap-4">
                        {STEPS[currentStep].options?.map((opt: any) => (
                            <button 
                                key={opt.name}
                                onClick={() => setData({ ...data, persona: opt.name })}
                                className={cn(
                                    "p-6 rounded-2xl border transition-all duration-300 text-left group",
                                    data.persona === opt.name 
                                    ? "bg-white border-white text-black" 
                                    : "bg-white/5 border-white/10 hover:border-white/30"
                                )}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <div className="text-lg font-bold uppercase tracking-tight">{opt.name}</div>
                                    {data.persona === opt.name && <CheckCircle2 size={20} />}
                                </div>
                                <p className={cn(
                                    "text-sm leading-snug",
                                    data.persona === opt.name ? "text-black/60" : "text-neutral-500"
                                )}>
                                    {opt.desc}
                                </p>
                            </button>
                        ))}
                    </div>
                )}
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-12">
            <Button 
                variant="ghost" 
                onClick={prev} 
                disabled={currentStep === 0}
                className={cn("px-8 h-14", currentStep === 0 && "opacity-0")}
            >
                <ArrowLeft className="mr-2 w-5 h-5" />
                Back
            </Button>
            <Button 
                size="lg" 
                onClick={next}
                className="px-10 h-14"
                disabled={STEPS[currentStep].placeholder ? !data[STEPS[currentStep].id as keyof typeof data] : !data.persona}
            >
                {currentStep === STEPS.length - 1 ? 'Begin Forge' : 'Continue'}
                <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
        </div>
      </div>
    </div>
  );
}

function ForgingOverlay({ phase }: { phase: number }) {
    const phases = [
        "Initializing Neural Fabric",
        "Agents Commencing Brainstorm",
        "Synchronizing with Solana Devnet",
        "Forging Complete"
    ];

    return (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
            
            <div className="relative mb-20">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="w-64 h-64 border-2 border-dashed border-white/10 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 border border-white/20 rounded-full border-t-white"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Rocket className={cn(
                        "w-16 h-16 transition-all duration-1000",
                        phase === 3 ? "text-green-500 scale-125" : "text-white animate-bounce"
                    )} />
                </div>
                
                {/* Orbital Particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ 
                            rotate: 360,
                            scale: [1, 1.5, 1]
                        }}
                        transition={{ 
                            rotate: { duration: 5 + i, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity }
                        }}
                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
                        style={{ 
                            margin: '-4px',
                            transform: `rotate(${i * 60}deg) translateX(120px)`
                        }}
                    />
                ))}
            </div>

            <div className="text-center max-w-md w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={phase}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                    >
                        <h2 className="text-3xl font-black tracking-tighter uppercase mb-2">
                            {phase === 3 ? 'LEGACY FORGED' : 'FORGING STARTUP'}
                        </h2>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-white shadow-glow"
                                initial={{ width: "0%" }}
                                animate={{ width: `${(phase / 3) * 100}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                        <p className="text-neutral-500 font-mono text-sm tracking-widest uppercase">
                            {phases[phase]}
                        </p>
                    </motion.div>
                </AnimatePresence>

                <div className="mt-12 space-y-3 opacity-40">
                    <div className="flex items-center gap-3 text-[10px] font-mono tracking-tighter text-neutral-500">
                        <div className={cn("w-1.5 h-1.5 rounded-full", phase >= 1 ? "bg-green-500" : "bg-white/20")} />
                        NEURAL NODES CONNECTED
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-mono tracking-tighter text-neutral-500">
                        <div className={cn("w-1.5 h-1.5 rounded-full", phase >= 2 ? "bg-green-500" : "bg-white/20")} />
                        SOLANA HANDSHAKE COMPLETE
                    </div>
                </div>
            </div>
        </div>
    );
}
