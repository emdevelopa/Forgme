"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import StartupNFT from '@/components/dashboard/StartupNFT';
import AIWorkspace from '@/components/ai/AIWorkspace';
import ContributorLeaderboard from '@/components/dashboard/ContributorLeaderboard';
import { 
  Zap, 
  TrendingUp, 
  Users, 
  Activity,
  ArrowUpRight,
  Plus
} from 'lucide-react';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Zap size={20} />} label="Investor Readiness" value="94%" trend="+5%" />
          <StatCard icon={<TrendingUp size={20} />} label="Founder Reputation" value="820" trend="+12" />
          <StatCard icon={<Users size={20} />} label="Active Contributors" value="12" trend="+3" />
          <StatCard icon={<Activity size={20} />} label="AI Activity" value="High" trend="Stable" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Workspace Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Active Forge</h2>
                <p className="text-neutral-500">Currently building: <span className="text-white font-medium">AZIMA FinTech</span></p>
              </div>
              <Button variant="outline" size="sm">
                <Plus size={16} className="mr-2" />
                New Project
              </Button>
            </div>
            
            <AIWorkspace />

            <div className="pt-8">
               <ContributorLeaderboard />
            </div>
          </div>

          {/* Right Sidebar Area */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ownership NFT</h3>
              <StartupNFT name="AZIMA" symbol="AZM" category="FINTECH / AFRICA" />
            </div>

            <GlassCard>
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Onchain Activity</h3>
              <div className="space-y-4">
                <ActivityItem 
                  title="Branding Finalized" 
                  description="Designer Agent minted metadata to Arweave." 
                  time="2m ago" 
                />
                <ActivityItem 
                  title="Smart Contract Scaffolding" 
                  description="Developer Agent committed to Devnet." 
                  time="15m ago" 
                />
                <ActivityItem 
                  title="Investor Deck Generated" 
                  description="CEO Agent exported PDF summary." 
                  time="1h ago" 
                />
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4 text-xs text-neutral-500">
                View All Activity
              </Button>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <GlassCard className="p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
          {icon}
        </div>
        <div className="text-[10px] font-bold text-green-500 flex items-center gap-1">
          <ArrowUpRight size={12} />
          {trend}
        </div>
      </div>
      <div>
        <div className="text-xs text-neutral-500 uppercase tracking-widest">{label}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </GlassCard>
  );
}

function ActivityItem({ title, description, time }: { title: string, description: string, time: string }) {
  return (
    <div className="flex gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5" />
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="text-xs font-bold text-white">{title}</div>
          <div className="text-[10px] text-neutral-600">{time}</div>
        </div>
        <div className="text-[11px] text-neutral-500 leading-tight mt-0.5">{description}</div>
      </div>
    </div>
  );
}
