import "./App.css";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css"; 
import NavBar from "./Components/NavBar/Navbar";
import { Route, Routes } from "react-router-dom";
import  {Home, Admin, Institute,Holder}  from "./Components/index";
import { Toaster } from "react-hot-toast";
import Verifier from "./Components/Verifier/Verifier";
import Finder from "./Components/CredentialFinder/Finder";

function App() {

  const network = WalletAdapterNetwork.Devnet; // Devnet or Mainnet
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new SolflareWalletAdapter, //  Solflare wallet
        ],
        [network]
    );

  return (
    <>
  <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
    <div><Toaster position="top-right"/></div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/issuer" element={<Institute />} />
        <Route path="/holder" element={<Holder />} />
        <Route path="/verifier" element={<Verifier />} />
        <Route path="/finder" element={<Finder/>} />
      </Routes>
       </WalletModalProvider>
      </WalletProvider>
  </ConnectionProvider>
    </>
  );
}

export default App;
