import React, { useState } from 'react'

import InsReg from './InsRegistration/InsReg';
import {ApproveInst}  from './InsRegistration/ApproveInst';
import RevokInst from './InsRegistration/RevokInst';
import NotAuthorized from '../Error/NotAuthorized';
import { useWallet } from '@solana/wallet-adapter-react';
import InstituteList from './InsRegistration/InstituteList';
import toast from 'react-hot-toast';
import { getProgram } from '../../Utils/connection';

const Admin = () => {
    const [openPage, setOpenPage] = useState(true);
    const [openRevokePage, setOpenRevokePage] = useState(true);
    const {publicKey} = useWallet();
    const [institutes,setInstitutes] = useState([]);
    const adminAcc = process.env.REACT_APP_ADMIN?.toLowerCase();
    const currAccount = publicKey?.toBase58()?.toLowerCase();
    const wallet = useWallet();
   const [isLoading, setLoading] = useState(false);


    const getInstituteList = async()=>{
      if(!wallet?.publicKey)
      {
        return toast.error("please connect you wallet");
      }
      try {
        setLoading(true)
        const program = getProgram(wallet);
        const Tx = await program?.account?.state?.all();
        console.log("Tx", Tx[0].account.institutes);
        if(Tx[0]?.account?.institutes)
        {
          setInstitutes(Tx[0]?.account?.institutes)
          
        }
        
      } catch (error) {
        console.log("error while fetching institute list ", error)
      }
    }

    const instituteListHandler = ()=>{
      setOpenPage(false);
      setOpenRevokePage(true);
      getInstituteList();
    }
   

  return (
    <div className='container'>
    {
      adminAcc!==currAccount?<NotAuthorized />:
      <>
      <div className='btn'>
        <button className ={openPage && openRevokePage?"btn-1":''} onClick={()=>{setOpenPage(true);setOpenRevokePage(true);}}>Register Institute</button>
        {/* <button className ={!openPage && openRevokePage?"btn-2":''} onClick={()=>{setOpenPage(false);setOpenRevokePage(true);}}>Approve Institute</button> */}
        <button className ={!openPage && openRevokePage?"btn-2":''} onClick={instituteListHandler}>Institute List</button>
      </div>
      <div>
      {openRevokePage?
        <>
      <div className={`page ${openPage ? 'slide-in-left' : 'slide-out-left'}`}>
          {openPage && <InsReg />}
        </div>
        <div className={`page ${!openPage ? 'slide-in-left' : 'slide-out-left'}`}>
          {!openPage && <InstituteList initialInstitutes={institutes}/>}
        </div>
        </>:<div className={`page ${!openRevokePage ? 'slide-in-left' : 'slide-out-left'}`}>
          {!openRevokePage && <InstituteList institutes={institutes}/>}
        </div>
      }
      </div>
      </>
    }
    </div>
  )
}

export default Admin
