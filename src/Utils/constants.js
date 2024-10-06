import { PublicKey } from '@solana/web3.js';
import idl from '../constant/idl.json'; 

// Program ID from Rust code
export const PROGRAM_ID = new PublicKey("38ejPywtc7T3jCx5p4xdw858SUyoAZhW3qfw4kig8mxk");

// idl.json file 
export const IDL = idl;
