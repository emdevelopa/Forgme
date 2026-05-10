"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PitchMode from '@/components/dashboard/PitchMode';

export default function PitchPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Pitch Presentation</h1>
          <p className="text-neutral-500">Autonomous investor deck for <span className="text-white">AZIMA FinTech</span></p>
        </div>
        
        <PitchMode />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="glass p-8 rounded-3xl border-white/5">
                <h3 className="text-xl font-bold mb-4">Investor Summary</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    Azima has been scored 94/100 for investor readiness by the FORGE CEO Agent. 
                    The platform automates tax compliance across 12 African jurisdictions and 
                    integrates directly with local mobile money networks via Solana gateways.
                </p>
                <div className="flex gap-4">
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">PDF EXPORT READY</div>
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">AI AUDITED</div>
                </div>
            </div>
            <div className="glass p-8 rounded-3xl border-white/5">
                <h3 className="text-xl font-bold mb-4">Next Steps</h3>
                <ul className="space-y-3">
                    {['Finalize Tokenomics Audit', 'Deploy Beta to Solana Mainnet', 'Initialize Contributor Economy'].map((step, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-neutral-300">
                            <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-[10px]">{i+1}</div>
                            {step}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
