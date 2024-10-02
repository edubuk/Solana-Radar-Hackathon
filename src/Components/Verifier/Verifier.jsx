import React, {useState } from "react";
import toast from "react-hot-toast";
import Img from '../../assets/img1.gif'
import './verifier.css'
import CryptoJS from "crypto-js";
import HexToDateTime from "./HexToTime";
import SmallLoader from "../SmallLoader/SmallLoader";
import { getProgram } from "../../Utils/connection";
import { useWallet } from "@solana/wallet-adapter-react";
const Verifier = () => {
  const [fileHash, setFileHash] = useState(null);
  const [loader, setLoading] = useState(false);
  const [inputFile, setInputFile] = useState();
  const wallet = useWallet();
const [values, setValues] = useState({
  studentName:"",
  certType:"",
  issuerName:"",
  uri:"",
  timestamp:"",
})
  //generate hash of a file

  const getHash = (file)=>{
    const reader = new FileReader();

    reader.onload = (e)=>{
      const fileData = e.target.result;
      const wordArray = CryptoJS.lib.WordArray.create(fileData);
      const hash = CryptoJS.SHA256(wordArray).toString();
      setFileHash(hash);
      console.log("hash : ",hash);
    };

    reader.readAsArrayBuffer(file);

  }

  const verifyCert = async () => { 
    try {
      setLoading(true);
      const program = getProgram(wallet);
      const Tx = await program?.account?.state?.all();
      console.log("Tx", Tx[0].account.certificates);
      
      if (Tx && Tx.length > 0)
      {
        const cert = Tx[0]?.account?.certificates?.find(c=>
          c.hash===fileHash
        )
        if(cert)
        {
          toast.success("Certifacte is verified")
          setValues({
            studentName:cert.studentName,
            certType:cert.certificateType,
            issuerName:cert.issuerName,
            uri:cert.url,
            timestamp:cert.timestamp,
          })
        }
        else
        {
          toast.error("certificate is not registered");
        }
      } 
    } catch (error) {
      console.error("Error while getting institute details: ", error);
    } finally {
      // Ensure loading state is stopped regardless of success or failure
      setLoading(false);
    }
  };
 

   // function to handle input file
   const handleFileChange = (e)=>{
    e.preventDefault();
    const file  = e.target.files?.[0];
    if(file)
    {
      getHash(file);
      setInputFile(file);
    }
  }

  return (
    <div>
    <div className="verify-container">
      <form>
        <h2>Verify Certificates</h2>
        <div className="upload-section">
          <input
            type="file"
            id="fileInput"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          ></input>
          <label htmlFor="fileInput">
            {
              inputFile?inputFile.name:<span>choose file</span>
            }
          </label>
          {
            loader?<SmallLoader />:
          <button onClick={verifyCert}>Verify Certificate</button>
          }
        </div>
      </form>
    </div>
    {
    values.studentName&&<div class="id-card-wrapper">
        <div class="id-card">
          <div class="profile-row">
            <div class="dp">
              <div class="dp-arc-outer"></div>
              <div class="dp-arc-inner"></div>
              <img src={Img} alt="profile" />
            </div>
            <div class="desc">
            <div className="profile-header">
              <h1>{values.studentName}</h1> 
              <a
              href={`https://${process.env.REACT_APP_PINATAGATWAY}/ipfs/${values?.uri}`}
              target="_blank"
              rel="noreferrer"
            >View Certificate</a>
            </div>
              <p>Certificate Type : <span>{values.certType}</span></p>
              <p>Issued By : <span>{values.issuerName}</span></p>
              <p>Issued On : <HexToDateTime hexValue={values.timestamp} /></p>
            </div>
          </div>
        </div>
      </div>
    }
    </div>
  );
};

export default Verifier;
