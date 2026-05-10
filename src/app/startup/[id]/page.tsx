"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { 
  BarChart3, 
  Globe, 
  Coins, 
  ShieldCheck, 
  Zap, 
  Users,
  ExternalLink,
  Github
} from 'lucide-react';

export default function StartupDetails() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Banner */}
        <div className="relative h-64 rounded-3xl overflow-hidden border border-white/10 flex items-end p-12">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-white text-black flex items-center justify-center text-4xl font-black">
                        A
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold tracking-tighter">AZIMA FINTECH</h1>
                        <p className="text-neutral-400 font-mono text-sm tracking-widest mt-1">SERIES FORGE • STAGE: BETA</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" size="sm">
                        <Github className="mr-2 w-4 h-4" />
                        View Source
                    </Button>
                    <Button variant="primary" size="sm">
                        <Zap className="mr-2 w-4 h-4 fill-current" />
                        Live Demo
                    </Button>
                </div>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Analysis & Summary */}
            <div className="lg:col-span-2 space-y-8">
                <GlassCard>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <BarChart3 className="text-neutral-500" />
                        Investor Summary
                    </h2>
                    <p className="text-neutral-400 leading-relaxed mb-6">
                        Azima is building the first instant-settlement financial layer for African freelancers. 
                        By utilizing Solana's speed and AI-driven compliance, we reduce transaction times from 5 days to 2 seconds 
                        and fees from 10% to less than 0.1%. The platform is designed to scale across 54 countries, starting with Kenya, Nigeria, and Egypt.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Target Valuation</div>
                            <div className="text-lg font-bold">$12.5M</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Burn Rate</div>
                            <div className="text-lg font-bold">0.5 SOL/day</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Growth Index</div>
                            <div className="text-lg font-bold text-green-500">+142%</div>
                        </div>
                    </div>
                </GlassCard>

                <div className="grid md:grid-cols-2 gap-8">
                    <GlassCard>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Globe className="text-neutral-500" />
                            Market Analysis
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">TAM (Total Market)</span>
                                <span className="text-white font-bold">$40B</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Market Saturation</span>
                                <span className="text-white font-bold">12%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Competitor Score</span>
                                <span className="text-white font-bold">Low</span>
                            </div>
                            <div className="pt-2 h-20 w-full bg-white/5 rounded-lg flex items-end gap-1 p-2">
                                {[30, 45, 60, 40, 80, 95, 85].map((h, i) => (
                                    <div key={i} className="flex-1 bg-white/20 rounded-t-sm" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Coins className="text-neutral-500" />
                            Token Utility (AZM)
                        </h3>
                        <ul className="space-y-3">
                            {['Fee Reductions', 'Staking Rewards', 'Governance Voting', 'Agent Access'].map((u) => (
                                <li key={u} className="flex items-center gap-3 text-sm text-neutral-400">
                                    <ShieldCheck size={14} className="text-white" />
                                    {u}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 p-4 rounded-xl bg-white text-black font-bold text-center text-sm">
                            MINT AZM TOKEN
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* Right Column: Infrastructure */}
            <div className="space-y-8">
                <GlassCard>
                    <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-6">Autonomous Infrastructure</h3>
                    <div className="space-y-6">
                        <AgentStatus name="CEO Agent" status="STRATEGIZING" active />
                        <AgentStatus name="Dev Agent" status="READY" />
                        <AgentStatus name="Growth Agent" status="IDLE" />
                    </div>
                </GlassCard>

                <GlassCard className="bg-white/5 border-dashed border-white/20">
                    <div className="text-center p-4">
                        <Users className="mx-auto mb-4 text-neutral-500" />
                        <h4 className="font-bold mb-2">Contributors Wanted</h4>
                        <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                            This project is looking for Rust developers and Technical Writers.
                        </p>
                        <Button variant="outline" size="sm" className="w-full">Apply Now</Button>
                    </div>
                </GlassCard>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AgentStatus({ name, status, active = false }: { name: string, status: string, active?: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-neutral-600'}`} />
                <span className="text-sm font-medium">{name}</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">{status}</span>
        </div>
    );
}
