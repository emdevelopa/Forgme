"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { 
  Send, 
  Terminal as TerminalIcon, 
  Code, 
  Palette, 
  TrendingUp, 
  ShieldCheck, 
  Briefcase,
  Bot,
  Activity,
  Cpu,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Agent = {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
};

const AGENTS: Agent[] = [
  { id: 'ceo', name: 'FORGE CEO', role: 'Strategy & Direction', icon: <Briefcase />, color: 'white' },
  { id: 'dev', name: 'CODE AGENT', role: 'Smart Contracts & Frontend', icon: <Code />, color: 'neutral-400' },
  { id: 'designer', name: 'PIXEL AGENT', role: 'UI/UX & Branding', icon: <Palette />, color: 'neutral-500' },
  { id: 'marketing', name: 'GROWTH AGENT', role: 'GTM & Community', icon: <TrendingUp />, color: 'neutral-300' },
  { id: 'tokenomics', name: 'ECON AGENT', role: 'SPL Utility & Economy', icon: <ShieldCheck />, color: 'neutral-200' },
];

type Message = {
  id: string;
  agentId: string;
  text: string;
  timestamp: Date;
  metadata?: any;
};

export default function AIWorkspace() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'terminal' | 'branding' | 'token'>('chat');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const simulateAgents = async (input: string) => {
    setMessages([{ id: '1', agentId: 'user', text: input, timestamp: new Date() }]);
    
    // CEO Responds first
    await respondAs('ceo', "Startup concept acknowledged. Initiating neural coordination for the next-gen startup lifecycle.");
    
    // Designer starts branding
    setActiveTab('branding');
    await respondAs('designer', "Generating visual identity system. Focusing on monochrome elegance with cinematic high-contrast elements.");
    
    // Dev starts terminal
    setActiveTab('terminal');
    await respondAs('dev', "Building Anchor program architecture. Defining Startup state and contributor reputation systems.");
    
    // Tokenomics
    setActiveTab('token');
    await respondAs('tokenomics', "Designing SPL token utility. Implementing deflationary burn mechanisms for platform fees.");
    
    // Return to chat
    setActiveTab('chat');
    await respondAs('ceo', "Forge readiness at 94%. We are ready for onchain deployment.");
  };

  const respondAs = async (agentId: string, text: string) => {
    setIsThinking(true);
    setActiveAgent(agentId);
    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));
    setIsThinking(false);
    setMessages(prev => [...prev, {
      id: Math.random().toString(),
      agentId,
      text,
      timestamp: new Date()
    }]);
    setActiveAgent(null);
  };

  return (
    <div className="flex flex-col h-[650px] gap-6">
      {/* Agents Bar */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {AGENTS.map((agent) => (
          <div
            key={agent.id}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all duration-500",
              activeAgent === agent.id ? "bg-white text-black border-white shadow-glow-strong scale-105" : "bg-white/5 text-white/40 border-white/10"
            )}
          >
            {React.cloneElement(agent.icon as React.ReactElement, { size: 16 })}
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-widest leading-none mb-1 opacity-60">{agent.role}</span>
              <span className="text-xs font-black tracking-tight">{agent.name}</span>
            </div>
            {activeAgent === agent.id && (
              <div className="flex gap-1 ml-2">
                <span className="w-1 h-1 bg-black rounded-full animate-bounce" />
                <span className="w-1 h-1 bg-black rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Chat Area */}
        <GlassCard className="flex-1 flex flex-col p-0 border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-4">
               <button 
                  onClick={() => setActiveTab('chat')}
                  className={cn("text-xs font-bold uppercase tracking-widest transition-colors", activeTab === 'chat' ? "text-white underline underline-offset-8" : "text-neutral-500 hover:text-neutral-300")}
               >
                  Collaborative Workspace
               </button>
               <button 
                  onClick={() => setActiveTab('terminal')}
                  className={cn("text-xs font-bold uppercase tracking-widest transition-colors", activeTab === 'terminal' ? "text-white underline underline-offset-8" : "text-neutral-500 hover:text-neutral-300")}
               >
                  Live Logs
               </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">Encryption Active</span>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'chat' ? (
                <motion.div 
                    key="chat"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    ref={scrollRef} 
                    className="absolute inset-0 overflow-y-auto p-6 space-y-8 scrollbar-hide"
                >
                    {messages.map((msg) => {
                        const agent = AGENTS.find(a => a.id === msg.agentId);
                        const isUser = msg.agentId === 'user';
                        
                        return (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: isUser ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={cn("flex flex-col", isUser ? "items-end text-right" : "items-start text-left")}
                        >
                            {!isUser && agent && (
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-glow">
                                {React.cloneElement(agent.icon as React.ReactElement, { size: 12 })}
                                </div>
                                <span className="text-[10px] font-black text-neutral-400 tracking-wider uppercase">{agent.name}</span>
                            </div>
                            )}
                            <div className={cn(
                            "max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed tracking-tight",
                            isUser ? "bg-white text-black font-medium shadow-glow-strong" : "bg-white/[0.03] border border-white/5 text-white/90"
                            )}>
                            {msg.text}
                            </div>
                        </motion.div>
                        );
                    })}
                    {isThinking && (
                        <div className="flex gap-1.5 p-2">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                    )}
                </motion.div>
              ) : activeTab === 'terminal' ? (
                <motion.div 
                    key="terminal"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 p-6 font-mono text-[11px] leading-relaxed overflow-y-auto scrollbar-hide"
                >
                    <div className="text-green-500 mb-2">FORGEME OS v1.0.4 - SYSTEM DEPLOYMENT LOGS</div>
                    <div className="text-neutral-500">[SYSTEM] Initializing Agent Node CEO-01...</div>
                    <div className="text-neutral-500">[SYSTEM] Initializing Agent Node DEV-01...</div>
                    <div className="text-white mt-4 tracking-tighter">
                        {messages.filter(m => m.agentId === 'dev' || m.agentId === 'tokenomics').map((m, i) => (
                            <div key={i} className="mb-2">
                                <span className="text-neutral-600">[{m.timestamp.toLocaleTimeString()}]</span> <span className="text-blue-400">{m.agentId.toUpperCase()}:</span> {m.text}
                            </div>
                        ))}
                    </div>
                    <motion.div animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2 h-4 bg-white inline-block align-middle" />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="p-6 border-t border-white/5 bg-white/[0.01]">
            <div className="relative">
              <input 
                type="text"
                placeholder="Give your agents a directive..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-6 pr-20 text-sm focus:outline-none focus:border-white/20 transition-all font-medium"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    simulateAgents((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button size="sm" className="rounded-xl h-10 w-10 p-0">
                    <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Dynamic Sidebar Output Area */}
        <div className="w-80 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
          <GlassCard className="p-5 overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Live Output</h4>
                <Layers size={14} className="text-neutral-500" />
            </div>
            
            <AnimatePresence mode="wait">
                {activeTab === 'branding' ? (
                    <motion.div key="branding" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                        <div className="aspect-video w-full rounded-2xl bg-white flex flex-col items-center justify-center p-4 shadow-glow">
                             <div className="text-black font-black text-3xl tracking-tighter mb-1">AZIMA</div>
                             <div className="text-black/40 text-[8px] font-bold tracking-[0.4em] uppercase">Forging Future</div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            <div className="aspect-square rounded-lg bg-black border border-white/10" />
                            <div className="aspect-square rounded-lg bg-neutral-800" />
                            <div className="aspect-square rounded-lg bg-neutral-400" />
                            <div className="aspect-square rounded-lg bg-white" />
                        </div>
                        <div className="text-[10px] text-neutral-500 leading-relaxed italic">"Minimalist African aesthetic with brutalist typography." - Pixel Agent</div>
                    </motion.div>
                ) : activeTab === 'token' ? (
                    <motion.div key="token" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="flex justify-between items-end h-24 gap-1">
                            {[40, 20, 60, 30, 80, 45, 95].map((h, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    className="flex-1 bg-white/20 rounded-t-sm"
                                />
                            ))}
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-[11px]">
                                <span className="text-neutral-500 font-medium">Inflation Rate</span>
                                <span className="font-bold">2.4%</span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                                <span className="text-neutral-500 font-medium">Fee Distribution</span>
                                <span className="font-bold">60/40 Split</span>
                            </div>
                            <div className="h-px bg-white/5" />
                            <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">AZM Governance Model: DAO v2</div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <Cpu size={16} />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-neutral-400">AGENCY SYNC</div>
                                <div className="text-xs font-bold text-white uppercase tracking-tighter">Neural Network Active</div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-dashed border-white/10 text-center">
                            <Activity size={24} className="mx-auto mb-2 text-neutral-600 animate-pulse" />
                            <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Waiting for Directive</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </GlassCard>

          <GlassCard className="p-5 flex-1 bg-gradient-to-br from-white/5 to-transparent border-white/5">
                <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-6">Strategic Roadmap</h4>
                <div className="space-y-8">
                    {[
                        { title: 'Neural Baseline', status: 'COMPLETED', date: 'PHASE 01' },
                        { title: 'Solana Forge', status: 'IN PROGRESS', date: 'PHASE 02' },
                        { title: 'Economy Launch', status: 'SCHEDULED', date: 'PHASE 03' }
                    ].map((step, i) => (
                        <div key={i} className="flex gap-4 relative">
                            <div className="flex flex-col items-center">
                                <div className={cn("w-2.5 h-2.5 rounded-full border border-white shadow-glow", step.status === 'COMPLETED' ? "bg-white" : "bg-transparent")} />
                                {i < 2 && <div className="w-[1px] h-full bg-white/10 my-2" />}
                            </div>
                            <div>
                                <div className="text-[9px] font-bold text-neutral-600 mb-1">{step.date}</div>
                                <div className="text-xs font-bold tracking-tight mb-1">{step.title}</div>
                                <div className={cn("text-[8px] font-bold tracking-widest", step.status === 'COMPLETED' ? "text-green-500" : "text-neutral-500")}>{step.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
