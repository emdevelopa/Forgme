"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Award, Zap, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const CONTRIBUTORS = [
  { id: 1, name: 'alex_sol.forge', reputation: 2450, rewards: '1,200 AZM', role: 'Smart Contract Dev' },
  { id: 2, name: 'sarah_design.ai', reputation: 1980, rewards: '850 AZM', role: 'UX Research' },
  { id: 3, name: 'mike_growth.eth', reputation: 1720, rewards: '600 AZM', role: 'Market Analysis' },
  { id: 4, name: 'degen_king', reputation: 1540, rewards: '450 AZM', role: 'Community Lead' },
  { id: 5, name: 'sol_forger_99', reputation: 1210, rewards: '300 AZM', role: 'Beta Tester' },
];

export default function ContributorLeaderboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contributor Economy</h2>
          <p className="text-neutral-500 text-sm">Building onchain reputation for <span className="text-white">AZIMA</span></p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold shadow-glow">
          JOIN PROJECT
        </div>
      </div>

      <div className="grid gap-4">
        {CONTRIBUTORS.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="p-4 flex items-center gap-6 hover:border-white/20 transition-all">
              <div className="w-8 text-lg font-black text-neutral-700 italic">
                #0{i + 1}
              </div>
              
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${c.name}`} alt={c.name} className="rounded-lg opacity-80" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white tracking-tight">{c.name}</span>
                  {i === 0 && <Award className="w-4 h-4 text-yellow-500" />}
                </div>
                <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">{c.role}</div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end gap-2 text-white font-bold">
                  <Star size={14} className="text-neutral-400" />
                  {c.reputation}
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">REPUTATION</div>
              </div>

              <div className="text-right min-w-[100px]">
                <div className="flex items-center justify-end gap-2 text-white font-bold">
                  <Zap size={14} className="text-neutral-400" />
                  {c.rewards}
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">PENDING REWARDS</div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
