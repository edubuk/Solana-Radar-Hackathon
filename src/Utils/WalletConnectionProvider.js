import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletModalButton } from '@solana/wallet-adapter-react-ui'; // Button component
import './wallet.css'
const ConnectWalletButton = () => {
    const { publicKey, connected} = useWallet();
    const wallet = useWallet();
    console.log("wallets : ",wallet)
    return (
        <div>
            {connected ? (
                <div className='wallet-add'>
                    <p>Wallet connected: <span>{publicKey?.toBase58()?.slice(0,8)}...</span></p>
                </div>
            ) : (
                <WalletModalButton>Connect Wallet</WalletModalButton>
            )}
        </div>
    );
};

export default ConnectWalletButton;
