import React, { useContext, useEffect, useState } from "react";
import "./model.css";
import SmallLoader from "../SmallLoader/SmallLoader";
import { CiCircleRemove } from "react-icons/ci";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { EdubukContexts } from "../../Context/EdubukContext";

const Model = ({ setOpenModal, currUri, isShareBtn }) => {
  const [loading, setLoading] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [address, setAddress] = useState("");
  const [accessList, setAccessList] = useState([]);
  const [userId, setUserId] = useState();
  const { studentName, connectingWithContract } = useContext(EdubukContexts);


  function generateUnique8DigitNumber() {
    const min = 10000000;
    const max = 99999999;
    let randomNumber;
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  const sendEmail = async (
    e,
    receiverName,
    receiverEmail,
    studentName,
    userId
  ) => {
    e.preventDefault();
    const templateParams = {
      receiver_name: receiverName,
      student_name: studentName,
      doc_link: `https://edubuk-server.vercel.app/api/v1/getResponse/${userId}`,
      receiver_email: receiverEmail,
      
    };
    try {
      setLoading(true);
      const res = await emailjs.send(
        process.env.REACT_APP_ServiceId,
        process.env.REACT_APP_TemplateId2,
        templateParams,
        process.env.REACT_APP_PublicKey
      );
      if (res) {
        toast.success("Notification Sent");
        setLoading(false);
      } else {
        toast.error("something went wrong ");
        setLoading(false);
      }
    } catch (error) {
      console.log("error while sending email", error);
      setLoading(false);
    }
  };

  const saveAccessInDB = async (e,email, name, userId, pinataHash) => {
    e.preventDefault();
    try {
      const url = "https://edubuk-server.vercel.app/api/v1/shareAccess";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email, name, userId, pinataHash }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data?.success) {
        toast.success("Share Access Record saved");
        return true
      }
      else 
      {
        return false
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log("error while saving share access recod", error);
    }
  };

  const removeAccessFromDB = async (e,email,newUserId) => {
    e.preventDefault();
    try {
      const url = "https://edubuk-server.vercel.app/api/v1/removeAccess";
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({ email, newUserId}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data?.success) {
        toast.success("Access Removed");
        return true
      }
      else 
      {
        return false
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log("error while saving share access recod", error);
    }
  };


  const shareCredAccess = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const contract = await connectingWithContract();
      const res = await contract.shareAccess(receiverName, address, receiverEmail, currUri);
      res.wait();
      const userid = generateUnique8DigitNumber();
      setUserId(userId);
      const result = await saveAccessInDB(e,receiverEmail,receiverName,userid,currUri);
      await sendEmail(e, receiverName, receiverEmail, studentName,userid);
      if(result)
      {
        setLoading(false);
        toast.success("Access Granted");
      }
    } catch (error) {
      console.log("While sharing access", error);
      toast.error("something went wrong");
      setLoading(false);
    }
  };

  const revokeAccess = async (e,item) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");
    try 
    {
      const contract = await connectingWithContract();
      const res = await contract.removeAccess(currUri, item[1]); // item[1] is the address
        res.wait();
        const newUserId = generateUnique8DigitNumber();
        const result = await removeAccessFromDB(e,item[2],newUserId);
        if(result)
        {
          toast.dismiss(toastId);
          toast.success("Access Removed");
        }
        getAccessList();
    } catch (error) {
      console.log("Error while revoking access", error);
      toast.dismiss(toastId);
      toast.error("Failed to revoke access");
    }
  };

  const removeRecieverFromList = async (item) => {
    try {
      setLoading(true);
      const contract = await connectingWithContract();
      const res = await contract.removeReciever(currUri, item[1]);
      res.wait();
      if (res?.hash) {
        toast.success("Access Removed");
        getAccessList();
        setLoading(false);
      }
    } catch (error) {
      console.log("Error while remove receiver", error);
      toast.error("Failed to remove receiver");
      setLoading(false);
    }
  };

  const handleCheckboxChange = (e,item) => {
    if (item[3]) {
      revokeAccess(e,item);
    }
  };

  const getAccessList = async () => {
    try {
      const contract = await connectingWithContract();
      const res = await contract.getSharedList(currUri);
      if (res) {
        setAccessList(res);
      }
    } catch (error) {
      console.log("Error fetching access list", error);
    }
  };

  useEffect(() => {
    getAccessList();
    // eslint-disable-next-line
  }, [isShareBtn]);

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <button className="close-modal" onClick={() => setOpenModal(false)}>
          CLOSE
        </button>

        <div className="addBox">
          {isShareBtn ? (
            <>
              <form className="addinpput" onSubmit={shareCredAccess}>
                <input
                  type="text"
                  placeholder="Receiver Name"
                  name="receiver_name"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Receiver Wallet Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Receiver Email"
                  name="receiver_email"
                  value={receiverEmail}
                  onChange={(e) => setReceiverEmail(e.target.value)}
                />
                <div>
                  {loading === true ? (
                    <SmallLoader />
                  ) : (
                    <button className="shareBtn">Share</button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <div className="dropdown">
              {accessList?.map((item, index) => (
                <div key={index} className="shared-list">
                  <input
                    type="checkbox"
                    checked={item[3]} // accessFlag at index 3
                    onChange={(e) => handleCheckboxChange(e,item)}
                  />
                  <p>
                    <strong>{item[0]}</strong> --{" "}
                    <strong>{item[1]?.slice(0, 7)}</strong>...
                  </p>
                  {loading ? (
                    <SmallLoader />
                  ) : (
                    <CiCircleRemove
                      id="remove-icon"
                      onClick={() => removeRecieverFromList(item)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
