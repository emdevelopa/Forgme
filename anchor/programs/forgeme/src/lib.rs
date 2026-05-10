use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};
use anchor_spl::associated_token::AssociatedToken;

declare_id!("FAqzr1i3GEX2zygQcmqjhjBKPqBY9e7TENnRBrGeNvfx");

#[program]
pub mod forgeme {
    use super::*;

    pub fn initialize_startup(
        ctx: Context<InitializeStartup>,
        name: String,
        category: String,
        metadata_uri: String,
    ) -> Result<()> {
        let startup = &mut ctx.accounts.startup;
        startup.founder = *ctx.accounts.founder.key;
        startup.name = name;
        startup.category = category;
        startup.metadata_uri = metadata_uri;
        startup.timestamp = Clock::get()?.unix_timestamp;
        startup.verified = false;
        startup.bump = ctx.bumps.startup;

        msg!("Startup Forged: {}", startup.name);
        Ok(())
    }

    pub fn register_contributor(
        ctx: Context<RegisterContributor>,
        contributor_wallet: Pubkey,
    ) -> Result<()> {
        let contributor = &mut ctx.accounts.contributor;
        contributor.wallet = contributor_wallet;
        contributor.startup = ctx.accounts.startup.key();
        contributor.reputation = 0;
        contributor.contributions = 0;
        contributor.bump = ctx.bumps.contributor;

        msg!("Contributor Registered for Startup: {}", contributor.startup);
        Ok(())
    }

    pub fn update_reputation(
        ctx: Context<UpdateReputation>,
        points: u64,
    ) -> Result<()> {
        let contributor = &mut ctx.accounts.contributor;
        contributor.reputation += points;
        contributor.contributions += 1;

        msg!("Reputation Updated: {} points added", points);
        Ok(())
    }

    pub fn reward_contributor(
        ctx: Context<RewardContributor>,
        amount: u64,
    ) -> Result<()> {
        let cpi_accounts = Transfer {
            from: ctx.accounts.founder_token_account.to_account_info(),
            to: ctx.accounts.contributor_token_account.to_account_info(),
            authority: ctx.accounts.founder.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        
        token::transfer(cpi_ctx, amount)?;

        msg!("Reward Distributed: {} tokens", amount);
        Ok(())
    }

    pub fn verify_startup(ctx: Context<VerifyStartup>) -> Result<()> {
        let startup = &mut ctx.accounts.startup;
        startup.verified = true;
        msg!("Startup Verified: {}", startup.name);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct InitializeStartup<'info> {
    #[account(
        init,
        payer = founder,
        space = 8 + 32 + 32 + 32 + 200 + 8 + 1 + 1,
        seeds = [b"startup", founder.key().as_ref(), name.as_bytes()],
        bump
    )]
    pub startup: Account<'info, Startup>,
    #[account(mut)]
    pub founder: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)] // <--- ADD THIS BACK
pub struct RegisterContributor<'info> {
    #[account(
        init,
        payer = founder,
        space = 8 + 32 + 32 + 8 + 8 + 1,
        seeds = [b"contributor", startup.key().as_ref(), contributor_wallet.key().as_ref()],
        bump
    )]
    pub contributor: Account<'info, Contributor>,
    pub startup: Account<'info, Startup>,
    #[account(mut, constraint = startup.founder == founder.key())]
    pub founder: Signer<'info>,
    /// CHECK: This is the wallet of the contributor being registered
    pub contributor_wallet: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateReputation<'info> {
    #[account(mut, constraint = contributor.startup == startup.key())]
    pub contributor: Account<'info, Contributor>,
    pub startup: Account<'info, Startup>,
    #[account(constraint = startup.founder == founder.key())]
    pub founder: Signer<'info>,
}

#[derive(Accounts)]
pub struct RewardContributor<'info> {
    #[account(mut, constraint = startup.founder == founder.key())]
    pub founder: Signer<'info>,
    pub startup: Account<'info, Startup>,
    #[account(mut)]
    pub founder_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub contributor_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct VerifyStartup<'info> {
    #[account(mut)]
    pub startup: Account<'info, Startup>,
    pub authority: Signer<'info>, // In a real app, this would be the Forge Admin
}

#[account]
pub struct Startup {
    pub founder: Pubkey,
    pub name: String,
    pub category: String,
    pub metadata_uri: String,
    pub timestamp: i64,
    pub verified: bool,
    pub bump: u8,
}

#[account]
pub struct Contributor {
    pub wallet: Pubkey,
    pub startup: Pubkey,
    pub reputation: u64,
    pub contributions: u64,
    pub bump: u8,
}
