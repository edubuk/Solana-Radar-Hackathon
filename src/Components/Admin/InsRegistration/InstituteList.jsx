import React, { useState } from 'react';
import './institutelist.css'; // Add your custom styles
import Institute from './../../Institute/Institute';

const InstituteList = ({ initialInstitutes }) => {

  return (
    <div className="institute-list-container">
      <h2 className="title">Registered Institutes</h2>
      {initialInstitutes?.length === 0 ? (
        <p>No institutes registered yet.</p>
      ) : (
        <ul className="institute-list">
          {initialInstitutes?.map((institute, index) => (
            <li key={index} className="institute-item">
              <div className="institute-details">
                <span className="institute-name">{institute?.name}</span>
                <span className="wallet-address">{institute?.instituteAddress.toBase58().substring(0, 6)}...{institute?.instituteAddress.toBase58().substring(institute?.instituteAddress.toBase58().length - 4)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstituteList;
