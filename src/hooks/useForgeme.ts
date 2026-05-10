"use client";

import { useMemo } from 'react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import * as anchor from '@coral-xyz/anchor';
import { Forgeme } from '@/lib/idl/forgeme'; // Path to IDL

export const useForgeme = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const program = useMemo(() => {
    if (!wallet) return null;
    
    try {
      const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: 'processed',
      });
      
      // In Anchor 0.29+, if IDL has the address, we only need idl and provider
      return new anchor.Program(Forgeme as any, provider);
    } catch (err) {
      console.error("Failed to initialize Anchor program:", err);
      return null;
    }
  }, [connection, wallet]);

  const initializeStartup = async (name: string, category: string, metadataUri: string) => {
    if (!program || !wallet) return;

    const [startupPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("startup"), wallet.publicKey.toBuffer(), Buffer.from(name)],
      program.programId
    );

    try {
      const tx = await program.methods
        .initializeStartup(name, category, metadataUri)
        .accounts({
          startup: startupPda,
          founder: wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();
      
      console.log("Startup Forged! Transaction:", tx);
      return tx;
    } catch (err) {
      console.error("Forging failed:", err);
      throw err;
    }
  };

  const registerContributor = async (startupPda: anchor.web3.PublicKey, contributorWallet: anchor.web3.PublicKey) => {
    if (!program || !wallet) return;

    const [contributorPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("contributor"), startupPda.toBuffer(), contributorWallet.toBuffer()],
      program.programId
    );

    try {
      const tx = await program.methods
        .registerContributor(contributorWallet)
        .accounts({
          contributor: contributorPda,
          startup: startupPda,
          founder: wallet.publicKey,
          contributorWallet: contributorWallet,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();
      
      console.log("Contributor Registered! Transaction:", tx);
      return tx;
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    }
  };

  return {
    program,
    initializeStartup,
    registerContributor,
  };
};
