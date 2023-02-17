import type { WalletProviderProps } from "@solana/wallet-adapter-react";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import {
  BackpackWalletAdapter,
  CoinbaseWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";

import("@solana/wallet-adapter-react-ui/styles.css" as any);

export function ClientWalletProvider(
  props: Omit<WalletProviderProps, "wallets">
): JSX.Element {
  const wallets = useMemo(
    () => [
      new BackpackWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new LedgerWalletAdapter(),
      new MathWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter()
    ],
    []
  );

  return (
    <WalletProvider wallets={wallets} {...props}>
      <WalletModalProvider {...props}>{props.children}</WalletModalProvider>
    </WalletProvider>
  );
}

export default ClientWalletProvider;
