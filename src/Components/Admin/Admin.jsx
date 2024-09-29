import React, { useState } from 'react'

import InsReg from './InsRegistration/InsReg';
import {ApproveInst}  from './InsRegistration/ApproveInst';
import RevokInst from './InsRegistration/RevokInst';
import NotAuthorized from '../Error/NotAuthorized';
import { useWallet } from '@solana/wallet-adapter-react';
const Admin = () => {
    const [openPage, setOpenPage] = useState(true);
    const [openRevokePage, setOpenRevokePage] = useState(true);
    const {publicKey} = useWallet();
    
    const adminAcc = process.env.REACT_APP_ADMIN?.toLowerCase();
    const currAccount = publicKey?.toBase58()?.toLowerCase();
   

  return (
    <div className='container'>
    {
      adminAcc!==currAccount?<NotAuthorized />:
      <>
      <div className='btn'>
        <button className ={openPage && openRevokePage?"btn-1":''} onClick={()=>{setOpenPage(true);setOpenRevokePage(true);}}>Register Institute</button>
        <button className ={!openPage && openRevokePage?"btn-2":''} onClick={()=>{setOpenPage(false);setOpenRevokePage(true);}}>Approve Institute</button>
        <button className ={!openRevokePage?"btn-3":''} onClick={()=>{setOpenRevokePage(false)}}>Remove Institute</button>
      </div>
      <div>
      {openRevokePage?
        <>
      <div className={`page ${openPage ? 'slide-in-left' : 'slide-out-left'}`}>
          {openPage && <InsReg />}
        </div>
        <div className={`page ${!openPage ? 'slide-in-left' : 'slide-out-left'}`}>
          {!openPage && <ApproveInst />}
        </div>
        </>:<div className={`page ${!openRevokePage ? 'slide-in-left' : 'slide-out-left'}`}>
          {!openRevokePage && <RevokInst />}
        </div>
      }
      </div>
      </>
    }
    </div>
  )
}

export default Admin
