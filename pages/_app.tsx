import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "tailwindcss/tailwind.css";
import Web3 from "web3";
import { Footer } from "../lib/components/Footer";
import { FeaturedVideoModal } from "../lib/components/modals/FeaturedVideoModal";
import { VideoDetailModal } from "../lib/components/modals/VideoDetailModal";
import { Navbar } from "../lib/components/Navbar";
import "../styles/App.css";
import "../styles/globals.css";

const endpoint = process.env.NEXT_PUBLIC_RPC_URL!;

function getLibrary(provider: any) {
  return new Web3(provider);
}

const WalletProvider = dynamic(
  () => import("../lib/contexts/ClientWalletProvider"),
  {
    ssr: false
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <WalletProvider>
          <Navbar />
          <ToastContainer
            position="top-right"
            theme="dark"
            limit={2}
            autoClose={1500}
            pauseOnFocusLoss={false}
          />
          <FeaturedVideoModal />
          <VideoDetailModal />
          <Component {...pageProps} />
          <Footer />
        </WalletProvider>
      </Web3ReactProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
