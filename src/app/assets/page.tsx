"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  Share2,
  Box,
  Cpu,
  Zap,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AssetsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Onchain Assets</h1>
                <p className="text-neutral-500 font-medium">Verified startup equity and IP represented as SPL Metadata.</p>
            </div>
            <Button variant="primary" size="sm">
                <Box size={16} className="mr-2" />
                Mint New Asset
            </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured Asset */}
            <div className="lg:col-span-2">
                <GlassCard className="p-0 overflow-hidden group">
                    <div className="aspect-video relative bg-neutral-900 flex items-center justify-center">
                        <div className="absolute inset-0 grid-bg opacity-30" />
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-64 h-64 border border-dashed border-white/10 rounded-full flex items-center justify-center"
                        >
                            <div className="w-48 h-48 border border-white/20 rounded-full flex items-center justify-center shadow-glow">
                                <span className="text-white font-black text-6xl italic">AZM</span>
                            </div>
                        </motion.div>
                        <div className="absolute bottom-6 left-6 flex items-center gap-3">
                            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold tracking-widest uppercase">
                                Verified Genesis
                            </div>
                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold tracking-widest uppercase">
                                Supply: 1,000,000,000
                            </div>
                        </div>
                    </div>
                    <div className="p-8 flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">AZIMA Governance Token (AZM)</h2>
                            <p className="text-neutral-500 text-sm max-w-md">The primary utility and governance token for the Azima ecosystem. Controls protocol fees and agent allocation.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm">
                                <Share2 size={16} />
                            </Button>
                            <Button variant="outline" size="sm">
                                <ExternalLink size={16} />
                            </Button>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Metadata Stats */}
            <div className="space-y-6">
                <GlassCard className="p-6">
                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Asset Security</h3>
                    <div className="space-y-6">
                        <SecurityItem icon={<ShieldCheck className="text-green-500" />} label="Contract Audit" status="PASSED" />
                        <SecurityItem icon={<Globe className="text-blue-500" />} label="Network" status="SOLANA DEVNET" />
                        <SecurityItem icon={<Zap className="text-yellow-500" />} label="Execution" status="HIGH FIDELITY" />
                        <SecurityItem icon={<Cpu className="text-purple-500" />} label="Agent Validated" status="YES" />
                    </div>
                </GlassCard>

                <GlassCard className="bg-gradient-to-br from-white/5 to-transparent border-white/10">
                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Total Value Locked</h3>
                    <div className="text-4xl font-black tracking-tighter mb-1">0.00 SOL</div>
                    <div className="text-xs font-bold text-neutral-600 uppercase tracking-widest">Awaiting Initial Funding</div>
                    <Button variant="primary" className="w-full mt-6 py-6 font-bold">DEPOSIT ASSETS</Button>
                </GlassCard>
            </div>
        </div>

        {/* Other Assets Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
                { name: 'Founder NFT #001', type: 'Equity', img: 'F' },
                { name: 'IP License v1', type: 'Legal', img: 'L' },
                { name: 'Seed Round Vault', type: 'Treasury', img: 'T' },
                { name: 'Community Badge', type: 'Reputation', img: 'C' }
            ].map((asset, i) => (
                <GlassCard key={i} className="p-4 group hover:border-white/30 transition-all">
                    <div className="aspect-square rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-4 overflow-hidden relative">
                         <span className="text-white/20 font-black text-4xl group-hover:scale-125 transition-transform duration-500">{asset.img}</span>
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">{asset.type}</div>
                    <div className="text-sm font-bold">{asset.name}</div>
                </GlassCard>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function SecurityItem({ icon, label, status }: { icon: React.ReactNode, label: string, status: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-xs font-medium text-neutral-400">{label}</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-white tracking-widest">{status}</span>
        </div>
    );
}
