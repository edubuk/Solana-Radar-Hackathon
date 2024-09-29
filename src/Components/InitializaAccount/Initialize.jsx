import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { getProgram } from '../../Utils/connection';
import { web3 } from '@project-serum/anchor';
const Initialize = () => {
    const [message, setMessage] = useState('');
    const wallet = useWallet();  // Access the wallet context
    const {publicKey} = useWallet();
    const handleInitialize = async () => {
        try {
            if (!wallet.connected || !wallet.publicKey) {
                setMessage('Wallet not connected');
                return;
            }
            const stateKeypair = web3.Keypair.generate();

            const program = getProgram(wallet);
            const tx = await program.methods.initialize().accounts({
                state: stateKeypair.publicKey,  // Generate a keypair for state
                admin: wallet.publicKey,  // Use wallet's public key here
                systemProgram: web3.SystemProgram.programId,
            }).signers([stateKeypair])
            .rpc();
            
            setMessage(`Transaction successful: ${tx}`);
        } catch (error) {
            console.error('Error initializing:', error);
            setMessage('Error initializing contract.');
        }
    };

    return (
        <div>
            <button onClick={handleInitialize}>Initialize Contract</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Initialize;
