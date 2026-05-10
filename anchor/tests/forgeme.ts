import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Forgeme } from "../target/types/forgeme";
import { expect } from "chai";
import { 
  TOKEN_PROGRAM_ID, 
  createMint, 
  createAccount, 
  mintTo, 
  getAccount 
} from "@solana/spl-token";

describe("forgeme", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Forgeme as Program<Forgeme>;
  const founder = anchor.web3.Keypair.generate();
  const contributorWallet = anchor.web3.Keypair.generate();
  
  const startupName = "AZIMA";
  const startupCategory = "FinTech";
  const metadataUri = "https://arweave.net/metadata.json";

  before(async () => {
    // Airdrop to founder
    const signature = await provider.connection.requestAirdrop(founder.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL);
    await provider.connection.confirmTransaction(signature);
  });

  it("Initializes a startup", async () => {
    const [startupPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("startup"), founder.publicKey.toBuffer(), Buffer.from(startupName)],
      program.programId
    );

    await program.methods
      .initializeStartup(startupName, startupCategory, metadataUri)
      .accounts({
        startup: startupPda,
        founder: founder.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([founder])
      .rpc();

    const startupAccount = await program.account.startup.fetch(startupPda);
    expect(startupAccount.name).to.equal(startupName);
    expect(startupAccount.founder.toString()).to.equal(founder.publicKey.toString());
  });

  it("Registers a contributor", async () => {
    const [startupPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("startup"), founder.publicKey.toBuffer(), Buffer.from(startupName)],
      program.programId
    );

    const [contributorPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("contributor"), startupPda.toBuffer(), contributorWallet.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .registerContributor(contributorWallet.publicKey)
      .accounts({
        contributor: contributorPda,
        startup: startupPda,
        founder: founder.publicKey,
        contributorWallet: contributorWallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([founder])
      .rpc();

    const contributorAccount = await program.account.contributor.fetch(contributorPda);
    expect(contributorAccount.wallet.toString()).to.equal(contributorWallet.publicKey.toString());
    expect(contributorAccount.reputation.toNumber()).to.equal(0);
  });

  it("Updates contributor reputation", async () => {
    const [startupPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("startup"), founder.publicKey.toBuffer(), Buffer.from(startupName)],
      program.programId
    );

    const [contributorPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("contributor"), startupPda.toBuffer(), contributorWallet.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .updateReputation(new anchor.BN(100))
      .accounts({
        contributor: contributorPda,
        startup: startupPda,
        founder: founder.publicKey,
      })
      .signers([founder])
      .rpc();

    const contributorAccount = await program.account.contributor.fetch(contributorPda);
    expect(contributorAccount.reputation.toNumber()).to.equal(100);
    expect(contributorAccount.contributions.toNumber()).to.equal(1);
  });
});
