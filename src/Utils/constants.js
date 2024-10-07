import { PublicKey } from '@solana/web3.js';
import idl from '../constant/idl.json'; 

// Program ID from Rust code
export const PROGRAM_ID = new PublicKey("CM8Cs7RNC5gEWQQmfSfRArteVsUWZ52FyfqY1jb2eeEU");

// idl.json file 
export const IDL = idl;
