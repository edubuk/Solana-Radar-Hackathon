import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import SmallLoader from '../../SmallLoader/SmallLoader';



export const ApproveInst = () => {
  const [instWitnessAdd, setInstWitnessAdd] = useState("");
  const [loading, setLoading] = useState(false);


  const approveInst = async (e) => {
    e.preventDefault();

    const adminAcc = process.env.REACT_APP_ADMIN.toLowerCase();
    //const currAccount = account.toLowerCase();
    try {
      //if (adminAcc !== currAccount) return toast.error("You are not Admin");
   
      console.log("error idhar hai");
      setLoading(true);
      setLoading(false);
      toast.success("Institute Approved Successfully");
      setInstWitnessAdd("");
    } catch (error) {
      toast.error("Error in Institution Approval", error);
      console.error("Error in Institution Approval: ", error);
    }
  };
  return (
    <div className="form-container">
    <form onSubmit={approveInst}>
    <h2>Approve Institute Witness</h2>
    <div className='input-box'>
      <input type='text' required placeholder='Institute Witness Address' value={instWitnessAdd} onChange={(e)=>setInstWitnessAdd(e.target.value)}></input>
      <label htmlFor="name">Institute Witness Address</label>
      </div>
      {loading === true ? <SmallLoader /> : <button >Approve Institute</button>}
    </form>
</div>
  )
}
