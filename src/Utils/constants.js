import { PublicKey } from '@solana/web3.js';
import idl from '../constant/idl.json'; 

// Program ID from Rust code
export const PROGRAM_ID = new PublicKey("AHdAg7KFqnWGoAUrG1DX286bN4NXeYFoTTHNTnxm89Cq");

// idl.json file 
export const IDL = idl;
