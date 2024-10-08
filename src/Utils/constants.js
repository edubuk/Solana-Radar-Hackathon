import { PublicKey } from '@solana/web3.js';
import idl from '../constant/idl.json'; 

// Program ID from Rust code
export const PROGRAM_ID = new PublicKey("HH18xCQFFpoMscFJdTQEoRHqpmnUbb2Jxnr2BWbBqhCD");

// idl.json file 
export const IDL = idl;
