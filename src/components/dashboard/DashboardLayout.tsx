"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Settings, 
  Users, 
  MessageSquare, 
  Award, 
  Zap,
  LogOut,
  Search,
  Wallet,
  Menu,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { publicKey, connected } = useWallet();

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col bg-neutral-950/40 backdrop-blur-3xl relative z-30">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        
        <Link href="/" className="p-10 flex items-center gap-4 group">
          <motion.div 
            whileHover={{ rotate: 90 }}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-glow-strong"
          >
            <span className="text-black font-black text-2xl">F</span>
          </motion.div>
          <div>
            <span className="font-black tracking-[0.2em] text-xl block leading-none">FORGEME</span>
            <span className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase mt-1 block">Startup OS</span>
          </div>
        </Link>

        <div className="px-6 mb-8">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", connected ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-neutral-600")} />
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Network Status</div>
                </div>
                <span className="text-[10px] font-mono text-white/40">DEVNET</span>
            </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="Operational Hub" href="/dashboard" active={pathname === '/dashboard'} />
          <NavItem icon={<PlusCircle size={20} />} label="Forge Engine" href="/forge" active={pathname === '/forge'} />
          <NavItem icon={<Users size={20} />} label="Contributor Network" href="/profile" active={pathname === '/profile'} />
          <NavItem icon={<Zap size={20} />} label="AI Presentation" href="/pitch" active={pathname === '/pitch'} />
          <NavItem icon={<Award size={20} />} label="Onchain Assets" href="/assets" active={pathname === '/assets'} />
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4 bg-white/[0.01]">
          <NavItem icon={<Settings size={18} />} label="Config" href="/settings" active={pathname === '/settings'} className="opacity-60" />
          
          <div className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck size={14} className="text-neutral-500" />
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Identity</span>
              </div>
              <div className="auth-wallet-button mini">
                  <WalletMultiButton className="!bg-white !text-black !text-[10px] !h-10 !rounded-xl !w-full !font-bold !justify-center" />
              </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#050505]">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-12 z-20">
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 w-4 h-4 group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Query the OS or find startups..." 
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/20 transition-all font-medium placeholder:text-neutral-700"
            />
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Authenticated As</div>
              <div className="text-sm font-mono tracking-tighter text-white/80">
                {publicKey ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}` : 'GUEST_USER'}
              </div>
            </div>
            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-neutral-700 p-[1px] shadow-glow"
            >
              <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${publicKey?.toBase58() || 'forgeme'}`} alt="Avatar" />
              </div>
            </motion.div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-12 pb-12 relative z-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/[0.03] blur-[150px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-5 -z-20 pointer-events-none" />
      </main>
    </div>
  );
}

function NavItem({ icon, label, href = "#", active = false, className }: { icon: React.ReactNode, label: string, href?: string, active?: boolean, className?: string }) {
  return (
    <Link href={href} className="block w-full px-2">
      <motion.div
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
          active ? "bg-white text-black font-black shadow-glow-strong" : "text-neutral-500 hover:text-white hover:bg-white/[0.03]",
          className
        )}
      >
        <div className="flex items-center gap-4 relative z-10">
            <div className={cn("transition-transform duration-300 group-hover:scale-110", active ? "text-black" : "text-neutral-500 group-hover:text-white")}>
                {icon}
            </div>
            <span className="text-sm tracking-tight uppercase font-bold">{label}</span>
        </div>
        {active && <ChevronRight size={16} className="relative z-10" />}
      </motion.div>
    </Link>
  );
}
