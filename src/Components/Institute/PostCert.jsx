import React, { useState } from "react";
import "./institute.css";
import toast from "react-hot-toast";
import SmallLoader from "../SmallLoader/SmallLoader";
import CryptoJS from "crypto-js";
import { useWallet } from "@solana/wallet-adapter-react";
import { web3 } from "@project-serum/anchor";
import { getProgram } from "../../Utils/connection";
import { Buffer } from 'buffer';
import { PublicKey} from "@solana/web3.js";


window.Buffer = window.Buffer || Buffer;

const RegCertValue = {
  studentName: "",
  studentAdd: "",
  certType: "",
  issuerName: "",
};

const PostCert = () => {
  const [fileHash, setFileHash] = useState(null);
  const [uri, setUri] = useState(null);
  const [loader, setLoading] = useState(false);
  const [values, setValues] = useState(RegCertValue);
  const [inputFile, setInputFile] = useState();
  const [isTransaction, setTransaction] = useState(false);
  const wallet = useWallet();

  const currAccount = wallet?.publicKey;
  //upload docs to IPFS
  const uploadToIpfs = async (e) => {
    e.preventDefault();
    try {
      if (!inputFile) {
        return toast.error("No file selected !");
      }
      const formData = new FormData();
      formData.append("file", inputFile);
      setLoading(true);
      console.log("form data : ", formData);
      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PINATAJWT}`,
          },
          body: formData,
        }
      );

      const upload = await response.json();
      if (upload?.IpfsHash) {
        toast.success("File uploaded successfully");
        setUri(upload.IpfsHash);
        setLoading(false);
      }
      console.log(upload);
    } catch (error) {
      setLoading(false);
      toast.error("Error in uploading file");
      console.error("Error uploading file:", error);
    }
  };

  //generate hash of a file

  const getHash = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileData = e.target.result;
      const wordArray = CryptoJS.lib.WordArray.create(fileData);
      const hash = CryptoJS.SHA256(wordArray).toString();
      setFileHash(hash);
      console.log("hash : ", hash);
    };

    reader.readAsArrayBuffer(file);
  };

  // upload data on blockchain

  const RegCert = async (e) => {
    e.preventDefault();
    if (!wallet.publicKey) {
      toast.error("Wallet not connected.");
      return;
    }
    //const currAccount = account.toLowerCase();
    try {
      setLoading(true)
      const statekey = new PublicKey(process.env.REACT_APP_StateKey)
      const program = getProgram(wallet);
      //if (adminAcc !== currAccount) return toast.error("You are not Admin");
     const Tx = await program.methods.postCertificate(
      values.studentName,
      new web3.PublicKey(values.studentAdd),
      uri,
      fileHash,
      values.certType,
      values.issuerName,
    
     ).accounts({
      state:statekey,
      institute:wallet.publicKey,
      systemProgram:web3.SystemProgram.programId
     }).signers([])
     .rpc()
  
     if(Tx)
     {
      setLoading(false);
      toast.success("Certificate Posted successfully");
      setTransaction(true);
      setValues("");
     }
      
    } catch (error) {
      setLoading(false);
      toast.error("Error in certificate Registration", error);
      console.error("Error in certificate Registration: ", error);
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // function to handle input file
  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      getHash(file);
      setInputFile(file);
    }
  };

  return (
    <div className="form-container">
      <form>
        <h2>Issue Single Certificate</h2>
        <div className="input-box">
          <input
            type="text"
            placeholder="Student Name"
            required
            name="studentName"
            value={values.studentName}
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="name">Student Name</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Student Wallet Address"
            name="studentAdd"
            required
            value={values.studentAdd}
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="name">Student Wallet Address</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            required
            placeholder="Certificate Type"
            name="certType"
            value={values.certType}
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="name">Certificate Type</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            required
            placeholder="Issuer Name"
            name="issuerName"
            value={values.issuerName}
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="name">Issuer Name</label>
        </div>
        <div className="upload-section">
          <input
            type="file"
            id="fileInput"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          ></input>
          <label htmlFor="fileInput">
            {inputFile ? inputFile.name : <span>choose file</span>}
          </label>
          Accepted:Pdf/jpg/jpeg/png
          {loader ? (
            <SmallLoader />
          ) : (
            <button onClick={uploadToIpfs}>Upload</button>
          )}
          {uri && (
            <a
              href={`https://${process.env.REACT_APP_PINATAGATWAY}/ipfs/${uri}`}
              target="_blank"
              rel="noreferrer"
            >
              View Certificate
            </a>
          )}
        </div>
        <div className="multi-btn">
        <button id="register-btn" onClick={RegCert}>Register Certificate</button>
        {isTransaction&&<a href={`https://explorer.solana.com/address/${currAccount}?cluster=devnet`} id="solana-explorer" target="_blank" rel="">View Transaction</a>}
        </div>
      </form>
    </div>
  );
};

export default PostCert;
