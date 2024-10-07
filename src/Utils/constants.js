import { PublicKey } from '@solana/web3.js';
import idl from '../constant/idl.json'; 

// Program ID from Rust code
export const PROGRAM_ID = new PublicKey("D4CGgU6uJXFrNbf87TedbMPaXzBEK3jQmMJ5SFu12soe");

// idl.json file 
export const IDL = idl;
