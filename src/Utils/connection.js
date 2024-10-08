import { Connection, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider, Program} from "@project-serum/anchor";
import { PROGRAM_ID, IDL } from './constants';

// Connect to the Solana devnet
export const getProvider = (wallet) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  return provider;
};

// Initialize the Program using Anchor
export const getProgram = (wallet) => {
  const provider = getProvider(wallet);
  const program = new Program(IDL, PROGRAM_ID, provider);
  return program;
};
