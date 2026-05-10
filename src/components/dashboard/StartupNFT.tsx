"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Shield, Share2, ExternalLink, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StartupNFT({ name, symbol, category }: { name: string, symbol: string, category: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative h-96 w-72 rounded-[32px] bg-gradient-to-br from-white/10 to-transparent p-[1px] shadow-glow-strong cursor-pointer"
      >
        <div 
            style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
            className="absolute inset-4 rounded-[24px] bg-neutral-900 overflow-hidden border border-white/10"
        >
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5" />
            
            <div className="absolute top-4 left-4 flex items-center gap-2">
                <Box size={14} className="text-white/40" />
                <span className="text-[8px] font-black tracking-[0.3em] text-white/40 uppercase">Forgeme Asset v1</span>
            </div>

            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <motion.div 
                    style={{ transform: "translateZ(100px)" }}
                    className="w-24 h-24 rounded-3xl bg-white text-black flex items-center justify-center shadow-glow mb-6"
                >
                    <span className="text-5xl font-black tracking-tighter">{symbol[0]}</span>
                </motion.div>
                <h3 style={{ transform: "translateZ(50px)" }} className="text-2xl font-black tracking-tighter text-white uppercase">{name}</h3>
                <p style={{ transform: "translateZ(30px)" }} className="text-neutral-500 text-[10px] font-bold tracking-widest mt-2 uppercase">{category}</p>
            </div>

            <div className="absolute bottom-0 w-full p-5 bg-white/[0.03] backdrop-blur-md border-t border-white/10 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[7px] font-black text-neutral-500 uppercase tracking-widest mb-1">Status</span>
                    <span className="text-[10px] font-bold text-white">GENESIS MINT</span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-[7px] font-black text-neutral-500 uppercase tracking-widest mb-1">Auth</span>
                    <span className="text-[10px] font-bold text-white tracking-tighter">SOLANA_CHAIN</span>
                </div>
            </div>
        </div>
        
        {/* Holographic Overlays */}
        <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
      </motion.div>
    </div>
  );
}
