import React, {useState } from 'react';
import './holder.css';
import Model from './Model';


const Documents = ({studentData}) => {
    const [openModal, setOpenModal] = useState(false);
    const [currUri, setCurrUri] = useState("");
    const [isShareBtn, setShareBtn] = useState(true);


    const openModelHandler = (uri)=>{
      setOpenModal(true);
      setCurrUri(uri);
      setShareBtn(true)
    }

    const openManageModel = (uri)=>{
      setOpenModal(true);
      setCurrUri(uri);
      setShareBtn(false)
    }

  return (
    <div className="card-grid">
      {studentData?.map((uri,i) => (
        <div className="card" key={i+1}>
        <div className='card-header'>
          <h3>Doc {i+1}</h3>
          <div className='card-header-btn'>
          <button onClick={()=>openModelHandler(uri)}>share</button>
          <button onClick={()=>openManageModel(uri)}>manage access</button>
          </div>
        </div>
          <a
              href={`https://edubuk-solana-radar-server.vercel.app/api/v1/getDocByUri/${uri}`}
              target="_blank"
              rel="noreferrer"
            >
              View Certificate
            </a>
        </div>
        
      ))}
      {
            openModal && <Model 
            setOpenModal={setOpenModal} 
            isShareBtn = {isShareBtn}
            currUri = {currUri}
            />
        }
    </div>
  );
};

export default Documents;
