import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { SolanaProvider } from "@/components/solana/SolanaProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FORGEME | AI Startup OS",
  description: "Generate, launch, and manage startup ideas using autonomous AI agents on Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SolanaProvider>
          {children}
        </SolanaProvider>
      </body>
    </html>
  );
}
