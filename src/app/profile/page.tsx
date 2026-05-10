"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { User, Wallet, Shield, Award, Settings as SettingsIcon } from 'lucide-react';

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-white to-neutral-800 p-[2px]">
                <div className="w-full h-full rounded-3xl bg-black flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/shapes/svg?seed=forgeme" alt="Avatar" className="w-24 h-24" />
                </div>
            </div>
            <div>
                <h1 className="text-4xl font-bold tracking-tighter">sol_forger_99.forge</h1>
                <p className="text-neutral-500 font-mono mt-1">0x71C7...2f4a</p>
                <div className="flex gap-3 mt-4">
                    <Button size="sm">Edit Profile</Button>
                    <Button variant="outline" size="sm">Share Profile</Button>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="space-y-4">
                <div className="flex items-center gap-2 text-neutral-500">
                    <Shield size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Onchain Identity</span>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-sm text-neutral-400">Governance Power</span>
                        <span className="text-sm font-bold">1,240 VP</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-sm text-neutral-400">Total Rewards</span>
                        <span className="text-sm font-bold">2,450 AZM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-sm text-neutral-400">Projects Founded</span>
                        <span className="text-sm font-bold">3</span>
                    </div>
                </div>
            </GlassCard>

            <GlassCard className="space-y-4">
                <div className="flex items-center gap-2 text-neutral-500">
                    <Award size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Achievements</span>
                </div>
                <div className="flex flex-wrap gap-3">
                    {['Early Founder', 'Contributor V1', 'Agent Commander', 'Solana Whale'].map((badge) => (
                        <div key={badge} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider">
                            {badge}
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>

        <h2 className="text-2xl font-bold tracking-tight pt-8">Your Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard name="AZIMA" role="Founder" status="Forging" />
            <ProjectCard name="LUMEN" role="Contributor" status="Active" />
            <ProjectCard name="FORGE_DAO" role="Voter" status="Stable" />
        </div>
      </div>
    </DashboardLayout>
  );
}

function ProjectCard({ name, role, status }: { name: string, role: string, status: string }) {
    return (
        <GlassCard className="hover:border-white/20 group">
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-bold">
                    {name[0]}
                </div>
                <div className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-neutral-400">
                    {status}
                </div>
            </div>
            <h3 className="text-lg font-bold group-hover:text-white transition-colors">{name}</h3>
            <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest mt-1">{role}</p>
        </GlassCard>
    );
}
