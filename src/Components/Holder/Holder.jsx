import React, { useContext, useState } from 'react';
import './holder.css';
import Documents from './Documents';
import { EdubukContexts } from '../../Context/EdubukContext';
import toast from 'react-hot-toast';
import SmallLoader from '../SmallLoader/SmallLoader';
import { getProgram } from '../../Utils/connection';
import { useWallet } from '@solana/wallet-adapter-react';

const Holder = () => {
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedIssuer, setSelectedIssuer] = useState('');

  const { setStudentName } = useContext(EdubukContexts);

  const wallet = useWallet();
  const getStudentData = async () => {
    try {
      setLoading(true);
      const currAcc = wallet?.publicKey?.toBase58();
      const program = getProgram(wallet);
      const Tx = await program?.account?.state?.all();
      console.log("Tx", Tx[0].account.certificates);

      if (Tx && Tx.length > 0) {
        const studentData = Tx[0]?.account?.students?.find(stud =>
          stud.address.toBase58() === currAcc
        )
        console.log("data", studentData)
        if (studentData) {
          setStudentName(studentData?.name);
          setStudentData(studentData);
          setSelectedIssuer(studentData.instituteNames[0]); // Set the first issuer as the default selection
          setLoading(false);
        }
        else {
          setLoading(false);
          toast.error("Not found any record...")
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error('You are not registered !');
      console.log('error in fetching student data', error);
    }
  };

  return (
    <div className='holder-container'>
      <div className='greeting'>
        <h2>Welcome <span>{studentData.name}</span> !</h2>
      </div>
      <div className='getBtn'>
        {loading ? (
          <SmallLoader />
        ) : (
          <button onClick={getStudentData}>Get Your Issued Certificates</button>
        )}
        <h3>
          Your Document Issued By:&nbsp;
          <select
            value={selectedIssuer}
            onChange={(e) => setSelectedIssuer(e.target.value)}
            className="issuer-dropdown"
          >
            {studentData?.instituteNames?.map((issuer, index) => (
              <option key={index} value={issuer}>
                {issuer}
              </option>
            ))}
          </select>
        </h3>
      </div>
      <div className='holder-doc'>
        <Documents studentData={studentData.uris} />
      </div>
    </div>
  );
};

export default Holder;
