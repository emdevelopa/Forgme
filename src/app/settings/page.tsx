"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Shield, Bell, Cpu, Lock, Wallet } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-neutral-500">Manage your AI operating system preferences.</p>
        </div>

        <div className="space-y-6">
            <SettingsSection 
                title="AI Preferences" 
                description="Control how agents interact and collaborate."
                icon={<Cpu size={18} />}
            >
                <div className="space-y-4 pt-4">
                    <ToggleItem label="Autonomous Collaboration" description="Allow agents to start sub-tasks without approval." defaultChecked />
                    <ToggleItem label="Real-time Thinking" description="Show agent reasoning process in the workspace." defaultChecked />
                    <ToggleItem label="Voice Synthesis" description="Enable AI narration for pitch mode." />
                </div>
            </SettingsSection>

            <SettingsSection 
                title="Security & Wallet" 
                description="Manage your onchain identity and permissions."
                icon={<Shield size={18} />}
            >
                <div className="space-y-4 pt-4">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Connected Wallet</span>
                            <span className="text-xs text-neutral-500 font-mono">0x71C7...2f4a</span>
                        </div>
                        <Button variant="outline" size="sm">Rotate</Button>
                    </div>
                    <ToggleItem label="Transaction Auto-signing" description="Enable for frequent onchain agent activities." />
                </div>
            </SettingsSection>

            <Button className="w-full" size="lg">Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SettingsSection({ title, description, icon, children }: { title: string, description: string, icon: React.ReactNode, children: React.ReactNode }) {
    return (
        <GlassCard>
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400">
                    {icon}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold tracking-tight">{title}</h3>
                    <p className="text-sm text-neutral-500">{description}</p>
                    {children}
                </div>
            </div>
        </GlassCard>
    );
}

function ToggleItem({ label, description, defaultChecked = false }: { label: string, description: string, defaultChecked?: boolean }) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-xs text-neutral-500">{description}</span>
            </div>
            <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${defaultChecked ? 'bg-white' : 'bg-white/10'}`}>
                <div className={`w-3 h-3 rounded-full bg-black m-1 transition-transform ${defaultChecked ? 'translate-x-5' : ''}`} />
            </div>
        </div>
    );
}
