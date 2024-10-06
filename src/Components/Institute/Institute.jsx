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
import toast from 'react-hot-toast';

const Institute = () => {
    const [openPage, setOpenPage] = useState(true);
    const [instName, setInstName] = useState(null);
    const [regInst, setRegInst] = useState(false);
    const [openAddWitness, setOpenAddWitness] = useState(false);
    const [loading , setLoading] = useState(false);
    const wallet = useWallet();

    const verifyIns = async () => {
      const searchAddress = wallet?.publicKey?.toBase58(); // the address to search for
      console.log(searchAddress)
      try {
        setLoading(true);
        const program = getProgram(wallet);
        
        // Fetch all accounts of the 'state' type
        const Tx = await program.account.state.all();
        console.log(Tx[0].account?.institutes[0].instituteAddress.toBase58());
        // Apply filter to search for the specific instituteAddress
        if(Tx)
        {
          const institute = Tx[0].account?.institutes?.find(inst=>
            inst.instituteAddress?.toBase58()===searchAddress
          )

          if(institute)
          {
            setInstName(institute?.name);
          }
        }
        setLoading(false);

      } catch (error) {
        setLoading(false)
        console.error("Error while getting institute details: ", error);
      }
    };

    useEffect(()=>{
      verifyIns();
    },[wallet.publicKey])

  return (
    <div className='container'>
    {
      instName?
    <div className='container'>
    <h3>{instName}</h3>
      <div className='btn'>
        <button className ={openPage && !openAddWitness?"btn-1":''} onClick={()=>{setOpenPage(true);setOpenAddWitness(false)}}>Single Registration</button>
        <button className ={!openPage && !openAddWitness?"btn-2":''} onClick={()=>{setOpenPage(false);setOpenAddWitness(false)}}>Multiple Registration</button>
        {/* <button className ={openAddWitness?"btn-3":''}  onClick={()=>setOpenAddWitness(true)}>Add Witness</button> */}
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
