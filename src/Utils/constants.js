import { PublicKey } from '@solana/web3.js';
import idl from '../constant/idl.json'; 

// Program ID from Rust code
export const PROGRAM_ID = new PublicKey("3TZQ4gJPrXJqtcsL4z27Bt9WFicMv6ddr836FCDwiz2t");

// idl.json file 
export const IDL = idl;
