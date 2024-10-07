import React,{useState} from 'react'
import toast from 'react-hot-toast';
import SmallLoader from '../../SmallLoader/SmallLoader';

const RevokInst = () => {

  const [instWitnessAdd, setInstWitnessAdd] = useState("");
  const [loading,setLoading]=useState()
  

  const revokeInst = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      setLoading(false);
      toast.success("Institute Revoked Successfully");
      setInstWitnessAdd("");
    } catch (error) {
      toast.error("Error in Institute Revoke", error);
      console.error("Error in Institute Revoke: ", error);
      setLoading(false);
    }
  };
  return (
    <div className="form-container">
    <form onSubmit={revokeInst}>
    <h2>Remove Institute Witness</h2>
    <div className='input-box'>
      <input type='text' required placeholder='Institute Witness Address' value={instWitnessAdd} onChange={(e)=>setInstWitnessAdd(e.target.value)}></input>
      <label htmlFor="name">Institute Witness Address</label>
      </div>
      {loading === true ? <SmallLoader /> : <button >Revoke Institute</button>}
    </form>
</div>
  )
}

export default RevokInst
