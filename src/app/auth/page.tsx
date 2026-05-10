"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Shield, Lock, ArrowRight, Loader2, Fingerprint } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (connected) {
      // Small delay for cinematic effect before redirecting
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [connected, router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div 
            animate={{ 
                scale: connected ? [1, 1.1, 1] : 1,
                rotate: connected ? [0, 360] : 0
            }}
            className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center mx-auto mb-8 shadow-glow-strong"
          >
            {connected ? (
                <Loader2 className="text-black w-10 h-10 animate-spin" />
            ) : (
                <span className="text-black font-black text-5xl">F</span>
            )}
          </motion.div>
          
          <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase">
            {connected ? 'Identity Verified' : 'Access the OS'}
          </h1>
          <p className="text-neutral-500 text-lg leading-tight font-medium">
            {connected 
              ? `Welcome back, ${publicKey?.toBase58().slice(0, 4)}...${publicKey?.toBase58().slice(-4)}` 
              : 'Secure your neural connection to the Forge.'
            }
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/[0.03] p-8 rounded-[32px] border border-white/10 flex flex-col items-center gap-8 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent pointer-events-none" />
            
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-glow">
              {connected ? <Fingerprint size={32} className="animate-pulse" /> : <Shield size={32} />}
            </div>
            
            {!connected ? (
                <>
                    <div className="text-center space-y-3">
                        <h3 className="text-xl font-bold tracking-tight uppercase">Biometric Handshake</h3>
                        <p className="text-sm text-neutral-500 leading-relaxed max-w-[240px] mx-auto">
                            FORGEME uses Solana cryptographic standards for end-to-end encrypted startup management.
                        </p>
                    </div>

                    <div className="w-full auth-wallet-button">
                        <WalletMultiButton className="!bg-white !text-black !rounded-2xl !w-full !justify-center !h-16 !text-lg !font-black !transition-all hover:!scale-[1.02] active:!scale-[0.98] !shadow-glow" />
                    </div>
                </>
            ) : (
                <div className="text-center space-y-4 py-4">
                    <div className="flex gap-1 justify-center">
                        {[0, 1, 2].map(i => (
                            <motion.div 
                                key={i}
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className="w-2 h-2 bg-white rounded-full"
                            />
                        ))}
                    </div>
                    <p className="text-xs font-mono text-neutral-500 tracking-[0.3em] uppercase">Synchronizing Neural Workspace...</p>
                </div>
            )}
          </div>

          {!connected && (
              <div className="text-center opacity-40 hover:opacity-100 transition-opacity">
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em]">
                  No wallet? <a href="https://phantom.app/" target="_blank" className="text-white underline underline-offset-4">Install Phantom</a>
                </p>
              </div>
          )}
        </div>

        <div className="mt-16 flex justify-center gap-10">
            <div className="flex items-center gap-2 text-[10px] text-neutral-600 font-black tracking-[0.2em] uppercase">
                <Lock size={12} />
                ECC-256
            </div>
            <div className="flex items-center gap-2 text-[10px] text-neutral-600 font-black tracking-[0.2em] uppercase">
                <Shield size={12} />
                Onchain Auth
            </div>
        </div>
      </motion.div>
    </div>
  );
}
