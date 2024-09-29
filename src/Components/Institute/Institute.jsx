import React, { useContext, useEffect, useState } from 'react'
import PostCert from './PostCert'
import BulkUpload from './BulkUpload'
import { EdubukContexts } from './../../Context/EdubukContext';
import AddWitness from './AddWitness';
import NotAuthorized from '../Error/NotAuthorized';
import SmallLoader from '../SmallLoader/SmallLoader';
import { PublicKey } from '@solana/web3.js';
import { getProgram } from '../../Utils/connection';
import { useWallet } from '@solana/wallet-adapter-react';

const Institute = () => {
    const [openPage, setOpenPage] = useState(true);
    const [instName, setInstName] = useState(null);
    const {connectingWithContract,account} = useContext(EdubukContexts);
    const [regInst, setRegInst] = useState(false);
    const [openAddWitness, setOpenAddWitness] = useState(false);
    const [loading , setLoading] = useState(false);
    const wallet = useWallet();
    const adminAcc = process.env.REACT_APP_ADMIN?.toLowerCase();
    const currAccount = account?.toLowerCase();

    const verifyInst = async()=>{
      try {
        setLoading(true);
        const stateKey = new PublicKey("B1273he1boBD2PpS9ouvFE2nquZHHk8SyRMTeRJiDxZK");
        const program = getProgram(wallet);
        const Tx = await program.methods.getInstituteDetails()
        console.log(Tx);
      } catch (error) {
        console.error("Error in certificate Registration: ", error);
        setLoading(false);
      }
    }

    useEffect(()=>{
      verifyInst();
    },[wallet.publicKey])



  return (
    <div className='container'>
    {
      ( adminAcc!==currAccount)?
    <div className='container'>
    <h3>{instName}</h3>
      <div className='btn'>
        <button className ={openPage && !openAddWitness?"btn-1":''} onClick={()=>{setOpenPage(true);setOpenAddWitness(false)}}>Single Upload</button>
        <button className ={!openPage && !openAddWitness?"btn-2":''} onClick={()=>{setOpenPage(false);setOpenAddWitness(false)}}>Multiple Upload</button>
        <button className ={openAddWitness?"btn-3":''}  onClick={()=>setOpenAddWitness(true)}>Add Witness</button>
      </div>
      <div>
      {!openAddWitness?
      <>
      <div className={`page ${openPage ? 'slide-in-left' : 'slide-out-left'}`}>
          {openPage && <PostCert />}
        </div>
        <div className={`page ${!openPage ? 'slide-in-left' : 'slide-out-left'}`}>
          {!openPage && <BulkUpload />}
        </div>
        </>:
        <div className={`page ${openAddWitness ? 'slide-in-left' : 'slide-out-left'}`}>
          {openAddWitness && <AddWitness />}
        </div>
      }
      </div>      
    </div>:loading?<SmallLoader />:<NotAuthorized />
    }
    </div>
  )
}

export default Institute
