import React, { useContext, useState } from "react";
import "../admin.css";
import toast from "react-hot-toast";
import SmallLoader from "../../SmallLoader/SmallLoader";
import { useWallet } from "@solana/wallet-adapter-react";
import { web3 } from "@project-serum/anchor";
import { getProgram } from "../../../Utils/connection";
import { Buffer } from 'buffer';
import { PublicKey} from "@solana/web3.js";
import { Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';

window.Buffer = window.Buffer || Buffer;


const InstRegValue = {
  instName: "",
  instAcronym: "",
  witness: "",
};

const InsReg = () => {
  const [values, setValues] = useState(InstRegValue);
  const [loading, setLoading] = useState(false);
  const [isTransaction, setTransaction] = useState(false);
  const wallet = useWallet();
  const changeHandler = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const currAccount = wallet?.publicKey?.toBase58();
  const adminAcc = process.env.REACT_APP_ADMIN;


  const instRegistration = async (e) => {
    e.preventDefault();
    if (!wallet?.publicKey) {
      toast.error("Wallet is not connected...");
      return;
    }
  
    try {
      if (adminAcc !== currAccount) {
        return toast.error("You are not Admin");
      }
  
      setLoading(true);
  
      const statekey = new PublicKey(process.env.REACT_APP_StateKey);
      const program = getProgram(wallet);
  
      // Get the connection from the program or use your connection
      const connection = program.provider.connection;
  
      // Fetch a recent blockhash
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  
      // Build the transaction
      const transaction = await program.methods.registerInstitute(
        values.instName,
        values.instAcronym,
        new web3.PublicKey(values.witness)
      )
        .accounts({
          state: statekey,
          admin: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .transaction(); // Generate the transaction
  
      // Add the recent blockhash
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;
  
      // Send the transaction
      const signature = await wallet.sendTransaction(transaction, connection, {
        skipPreflight: false, // Optionally skip the preflight simulation
        preflightCommitment: "finalized", // Use the commitment level
      });
  
      // Confirm the transaction
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });
  
      setLoading(false);
      toast.success("Institute Registered Successfully");
      setTransaction(true);
      console.log("Transaction successful: ", signature);
    } catch (error) {
      setLoading(false);
      toast.error("Please try with any other wallet address", error);
      console.error("Error in Institute registration: ", error);
    }
  };
  
  return (
    <div className="form-container">
      <form onSubmit={instRegistration}>
        <h2>Institute Registration</h2>
        <div className="input-box">
        <input
          type="text"
          placeholder="Institute Name"
          required
          name="instName"
          value={values.instName}
          onChange={changeHandler}
        ></input>
        <label htmlFor="name">Institute Name</label>
        </div>
        <div className="input-box">
        <input
          type="text"
          placeholder="Institute's Acronym"
          required
          name="instAcronym"
          value={values.instAcronym}
          onChange={changeHandler}
        ></input>
        <label htmlFor="name">Institute's Acronym</label>
        </div>
        <div className="input-box">
        <input
          type="text"
          placeholder="Institute Witness Address"
          required
          name="witness"
          value={values.witness}
          onChange={changeHandler}
        ></input>
         <label htmlFor="name">Institute Witness Address</label>
        </div>
        {loading === true ? <SmallLoader /> :<div className="multi-btn"> <button id="register-btn">Register Institute</button> {isTransaction&&<a href={`https://explorer.solana.com/address/${currAccount}?cluster=devnet`} id="solana-explorer" target="_blank" rel="">View Transaction</a>}</div>}
      </form>
    </div> 
  );
};

export default InsReg;
